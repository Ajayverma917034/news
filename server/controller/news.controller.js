import District from "../model/district.model.js";
import News from "../model/news.models.js";
import State from "../model/state.model.js";
import User from "../model/user.model.js";
import tryCatch from "../utils/asyncFunction.js";
import ErrorHandler from "../utils/errorHandler.js";


export const createNews = tryCatch((req, res, next) => {
    try {

        let authorId = req.user._id;
        let { id, title, description, content, state, district, location, news_section_type, banner, tags, breaking_news, draft } = req.body;


        if (!title?.length) {
            return res.status(403).json({ error: `You must provide a title to ${draft === true ? "Publish" : "Save"} a news` })
        }
        if (!draft) {
            if (!description.length) {
                return next(new ErrorHandler(403, 'You must provide some descrtiption for the news'))
            }
            // if (!content) {
            //     return res.status(403).json({ error: 'You must provide some content for the news' })
            // }

            // Check if state is provided and not empty
            if (!state || state.trim() === '') {
                return res.status(403).json({ error: 'You must provide a state for the news' })
            }

            // Check if district is provided and not empty
            if (!district || district.trim() === '') {
                return res.status(403).json({ error: 'You must provide a district for the news' })
            }

            // Check if location is provided and not empty
            if (!location || location.trim() === '') {
                return res.status(403).json({ error: 'You must provide a location for the news' })
            }

            // Check if tags is provided and not empty
            // if (!tags || tags.length === 0) {
            //     return res.status(403).json({ error: 'You must provide tags for the news' })
            // }
            // Check if tags is provided and not empty
            // if (!news_section_type || news_section_type.length === 0) {
            //     return res.status(403).json({ error: 'You must provide news_section_type for the news' })
            // }

            // Check if breaking_news is provided and is boolean
            if (breaking_news === undefined || typeof breaking_news !== 'boolean') {
                return res.status(403).json({ error: 'You must provide breaking news status for the news' })
            }

            location = location.trim().toLowerCase();
            state = state.trim().toLowerCase();
            district = district.trim().toLowerCase();
        }

        // tags = tags.map(tag => tag.trim().toLowerCase());

        let news_id = id || title.replace(/[^a-zA-Z0-9]/g, ' ').replace(/\s+/g, "-")

        // tags = tags.map(tags => tags.trim().toLowerCase());
        if (id) {
            News.findOneAndUpdate({ news_id }, { title, description, content, state, district, location, banner, tags, breaking_news, news_section_type, draft: draft ? draft : false }).then(news => {
                return res.status(200).json({ id: news.news_id, message: 'update Successfully' })
            })
        }
        else {
            let news = new News({
                title, description, content, state, district, location, tags, banner, news_section_type, breaking_news, draft: Boolean(draft), news_id, author: authorId
            })

            news.save().then(news => {

                let incrementVal = draft ? 0 : 1;
                User.findOneAndUpdate({ _id: authorId }, {
                    $inc: { "account_info.total_news": incrementVal }, $push: { "news": news._id }
                }).then(user => {
                    return res.status(200).json({ id: news.news_id })
                }).catch(err => {
                    return next(new ErrorHandler(500, "Failed to update total posts number"))
                })
            }).catch(err => {
                return next(new ErrorHandler(500, err.message))

            })
        }
    } catch (error) {
        return next(new ErrorHandler(500, error.message))
    }
})


export const getHomeNews = tryCatch(async (req, res, next) => {
    try {
        // let { data } = req.body;
        const data = ['big news', 'world news', 'uttar pradesh', 'crime', 'education']

        let promises = [];

        // Loop through each entity in the data array
        for (let entity of data) {
            let query = {};
            query.news_section_type = { $in: entity };

            const news = await News.find(query).limit(5).sort({ createdAt: -1 }).select('news_id title state district location tags createdAt banner -_id').exec();

            let pushData = {
                title: entity,
                data: news
            }
            promises.push(pushData);

        }
        res.status(200).json({ success: true, data: promises });
    } catch (error) {
        console.log(error);
        // Handling errors
        next(error);
    }
});


export const getNewses = tryCatch((req, res, next) => {
    let { page, limit, state, district, location, tags, breaking_news, draft, news_section_type } = req.body;
    let query = {};

    if (state) query.state = state;
    if (district) query.district = district;
    if (location) query.location = location;
    if (tags) query.tags = tags;
    if (breaking_news) query.breaking_news = breaking_news;
    if (draft) query.draft = draft;
    if (news_section_type && news_section_type.length) {
        news_section_type = news_section_type.map(type => type.trim().toLowerCase());
        query.news_section_type = { $in: news_section_type };
    }

    limit = limit ? parseInt(limit) : 5;
    page = page ? parseInt(page) : 1;

    News.find(query)
        // .populate('author', 'name')
        .sort({ "activity.total_reads": -1, "createdAt": -1 })
        .skip(limit * (page - 1))
        .limit(limit)
        .populate("author", "username profile")
        .select('news_id title description content tags state district banner location tags breaking_news draft createdAt -_id')
        .then(news => {
            if (!news.length) {
                News.find().sort({ "activity.total_reads": -1, "createdAt": -1 })
                    .skip(limit * (page - 1))
                    .limit(limit)
                    .populate("author", "username profile")
                    .select('news_id title description content tags state banner district location tags breaking_news draft createdAt -_id')
                    .then(news => {
                        return res.status(200).json(news)
                    }).catch(err => {
                        return next(new ErrorHandler(500, err.message))
                    })
            }
            else {

                return res.status(200).json(news)
            }
        }).catch(err => {
            return next(new ErrorHandler(500, err.message))
        })
})

export const getNews = tryCatch(async (req, res, next) => {
    let { news_id, draft, mode } = req.body;

    let incrementVal = mode !== 'edit' ? 1 : 0;
    News.findOneAndUpdate({ news_id }, { $inc: { "activity.total_reads": incrementVal, "activity.total_today_count": incrementVal } })
        .select('news_id title description content tags state district banner location tags breaking_news draft createdAt -_id')
        .then(news => {
            // console.log(news)
            if (news.draft && !draft) {
                return next(new ErrorHandler(403, "This news is in draft mode"))
            }
            return res.status(200).json({ success: true, news })
        })
        .catch(err => {
            return next(new ErrorHandler(500, err.message))
        })
})

export const getNewsCount = tryCatch(async (req, res, next) => {
    let { state, district, location, tags, breaking_news, draft } = req.body;
    let query = {};

    if (state) query.state = state;
    if (district) query.district = district;
    if (location) query.location = location;
    if (tags) query.tags = tags;
    if (breaking_news) query.breaking_news = breaking_news;
    if (draft) query.draft = draft;

    News.countDocuments(query).then(count => {
        return res.status(200).json({ count })
    }).catch(err => {
        return next(new ErrorHandler(500, err.message))
    })
})

export const deleteNews = tryCatch(async (req, res, next) => {
    const authorId = req.user._id;
    let { news_id } = req.body;
    News.findOneAndDelete({ news_id }, { author: authorId })
        .then(news => {
            User.findOneAndUpdate({ _id: authorId }, { $inc: { "account_info.total_news": -1 }, $pull: { "news": news._id } })
                .then(user => {
                    return res.status(200).json({ message: "News deleted successfully" })

                })
                .catch(err => {
                    return next(new ErrorHandler(500, err.message))

                })
        })
        .catch(err => {
            return next(new ErrorHandler(500, err.message))
        })
})

export const adminNews = tryCatch(async (req, res, next) => {
    let { draft, deletedDocument } = req.body;
    let page = req.body.page || 1;
    let maxLimit = req.body.limit || 6;
    let skipDocs = (page - 1) * maxLimit;

    if (deletedDocument) {
        skipDocs -= deletedDocument;
    }

    News.find({ draft })
        .skip(skipDocs)
        .limit(maxLimit)
        .sort({ createdAt: -1 })
        .select('news_id title description content tags state district location tags breaking_news draft createdAt -_id')
        .then((news) => {
            return res.status(200).json(news)
        })
        .catch(err => {
            return next(new ErrorHandler(500, err.message))
        })
})

export const fetchRelatedNews = tryCatch(async (req, res, next) => {
    let { state, district, location, tags, news_id } = req.body;

    let query = { $or: [] };

    if (state) {
        state = state.trim().toLowerCase();
        query.$or.push({ state: state });
    }
    // console.log(state)
    if (district) {
        district = district.trim().toLowerCase();
        query.$or.push({ district: district });
    }
    if (location) {
        location = location.trim().toLowerCase();
        query.$or.push({ location: location });
    }
    if (tags && tags.length) {
        tags = tags.map(cat => cat.trim().toLowerCase());
        query.tags = { $in: tags }; // Works with $or internally if tags are in an array
    }

    // Check if $or array is empty, if so, remove it from the query
    if (query.$or.length === 0) {
        delete query.$or;
    }

    // Add condition to exclude the given news_id
    if (news_id) {
        query.news_id = { $ne: news_id };
    }

    News.find(query)
        .limit(4)
        .sort({ "activity.total_reads": -1, "createdAt": -1 })
        .select('news_id title tags state district banner location tags draft createdAt -_id')
        .then(news => {
            if (news.length === 0) {
                News.find()
                    .limit(4)
                    .sort({ "activity.total_reads": -1, "createdAt": -1 })
                    .select('news_id title tags state district banner location tags draft createdAt -_id')
                    .then(news => {
                        return res.status(200).json(news)
                    }).catch(err => {
                        return next(new ErrorHandler(500, err.message))
                    })
            }
            else {

                return res.status(200).json(news);
            }
        }).catch(err => {
            return next(new ErrorHandler(500, err.message));
        });

});


export const findNewsSectionTypeNews = tryCatch(async (req, res, next) => {
    let { news_section_type, limit } = req.body;

    // Set the number of items to fetch from the database
    const fetchLimit = limit || 10; // Always fetch 10 items

    let query = {};

    if (news_section_type && news_section_type.length) {
        news_section_type = news_section_type.map(type => type.trim().toLowerCase());
        query.news_section_type = { $in: news_section_type };
    }
    try {
        // Fetch the news items from the database
        const fetchedNews = await News.find(query)
            .limit(fetchLimit)
            .sort({ createdAt: -1 });

        // Randomly pick 5 news items from the fetched news
        const shuffled = fetchedNews.sort(() => 0.5 - Math.random());
        let selectedNews = shuffled.slice(0, 5);

        // Return the randomly selected results
        if (selectedNews.length === 0) {
            News.find().sort({ "activity.total_reads": -1, "createdAt": -1 })
                .limit(limit)
                .populate("author", "username profile")
                .select('news_id title banner -_id')
                .then(news => {
                    return res.status(200).json({ news })
                }).catch(err => {
                    return next(new ErrorHandler(500, err.message))
                })
        }
        else {

            res.status(200).json({ news: selectedNews });
        }
    } catch (err) {
        // Handle potential errors
        next(new ErrorHandler(500, err.message));
    }
});

export const fetchDataStateWise = tryCatch(async (req, res, next) => {
    const { state } = req.body;
    let promises = [];

    const stateNews = await News.find({ state }).limit(5).sort({ "activity.total_reads": -1, createdAt: -1 }).populate("author", "username profile -_id").select('news_id title tags banner state district location createdAt -_id').exec();

    promises.push(stateNews);

    let districts = await State.findOne({ state }).populate("districts", "district -_id").select("districts -_id").exec();
    if (districts === null) {
        return res.status(200).json({ success: true, data: promises, dataSequence: { state: state, districts: [] } });
    }
    for (let district of districts.districts) {
        const districtNews = await News.find({ district: district.district }).limit(5).sort({ createdAt: -1 }).select('news_id title state district location tags createdAt banner -_id').exec();
        promises.push(districtNews);
    }
    const dataSequence = {
        state: state,
        districts: districts.districts
    }
    return res.status(200).json({ success: true, data: promises, dataSequence });

})

export const findStateNews = tryCatch(async (req, res, next) => {
    let promises = [];
    let states = await State.find().select('state -_id').exec();

    if (states === null) {
        return res.status(200).json({ success: true, data: { state: [] } });
    }
    for (let state of states) {
        const stateNews = await News.find({ state: state.state })
            .sort({ createdAt: -1 })
            .limit(5)
            .select('news_id title state district location tags createdAt banner -_id')
            .exec();
        promises.push({ state: state.state, data: stateNews });
    }

    return res.status(200).json({ success: true, data: promises });
})

export const getBreakingNews = tryCatch(async (req, res, next) => {
    const breakingNews = await News.find({ breaking_news: true }).limit(5).sort({ createdAt: -1 }).select('news_id title description state district location tags createdAt banner -_id').exec();

    return res.status(200).json({ success: true, breakingNews })
})



export const getMyNews = tryCatch(async (req, res, next) => {
    let { limit, page, tags, state, district, location, draft } = req.body;
    const authorId = req.user._id;
    limit = limit ? parseInt(limit) : 10;
    page = page ? parseInt(page) : 1;
    const news = await News.find({ author: authorId }).sort({ createdAt: -1 }).skip(limit * (page - 1)).limit(limit).select('news_id title createdAt activity banner -_id').exec();
    return res.status(200).json({ success: true, news })
})

export const getMyNewsCount = tryCatch(async (req, res, next) => {
    const { tags, state, district, location, draft } = req.body;
    const authorId = req.user._id;
    let query = {}
    if (tags) query.tags = tags;
    if (state) query.state = state;
    if (district) query.district = district;
    if (location) query.location = location;
    if (draft) query.draft = draft;
    const count = await News.countDocuments({ author: authorId, ...query }).exec();
    return res.status(200).json({ totalDocs: count })
})
