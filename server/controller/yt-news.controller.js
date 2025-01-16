import YtNews from "../model/yt-news.models.js";
import tryCatch from "../utils/asyncFunction.js";
import ErrorHandler from "../utils/errorHandler.js";
import translate from "translate-google";

function generateNanoId(length = 5) {
    let result = '';
    for (let i = 0; i < length; i++) {
        result += Math.floor(Math.random() * 10); // Generates a random digit between 0 and 9
    }
    return result;
}

// Function to format the current date as YYYYMMDD
function getCurrentDate() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}${month}${day}`;
}
export const createYtNews = tryCatch(async (req, res, next) => {
    let { title, id, description, tags, location, state, district, videoLinkId, draft } = req.body;

    if (!title) {
        return next(new ErrorHandler(400, `You must provide a title to ${draft === true ? "Publish" : "Save"} a news`))
    }
    if (!draft) {
        if (!description || description.trim() === '') {
            return next(new ErrorHandler(400, 'You must provide some description for the news'))
        }
        if (!tags || tags.length === 0) {
            return next(new ErrorHandler(400, 'You must provide a tags for the news'))
        }
        if (!location || location.trim() === '') {
            return next(new ErrorHandler(400, 'You must provide a location for the news'))
        }

        if (!videoLinkId || videoLinkId.trim() === '') {
            return next(new ErrorHandler(400, 'You must provide a video link for the news'))
        }
    }

    if (id) {
        YtNews.findOneAndUpdate({ news_id: id }, { title, description, tags, location, state, district, videoLinkId, draft: draft ? draft : false }).then(news => {
            return res.status(200).json({ id: news.news_id, message: 'update Successfully' })
        })
    }
    else {

        let newUrlTitle = ""
        await translate(title, { from: 'hi', to: 'en' }).then(res => {
            newUrlTitle = res;
        }).catch(err => {
            return res.status(500).json({ success: false, error: err.message })
        });

        let news_id = id || newUrlTitle
            .trim()
            .toLocaleLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, ''); // Remove leading or trailing hyphens

        news_id += '-' + getCurrentDate() + '-' + generateNanoId();

        let news = new YtNews({
            title, description, tags, location, state, district, videoLinkId, draft: Boolean(draft), news_id,
        })

        news.save().then(news => {
            return res.status(200).json({ id: news.news_id })
            // let incrementVal = draft ? 0 : 1;
            // User.findOneAndUpdate({ _id: authorId }, {
            //     $inc: { "account_info.total_news": incrementVal }, $push: { "news": news._id }
            // }).then(user => {
            //     return res.status(200).json({ id: news.news_id })
            // }).catch(err => {
            //     return next(new ErrorHandler(500, "Failed to update total posts number"))
            // })
        }).catch(err => {
            return next(new ErrorHandler(500, err.message))

        })
    }
})

export const getYtNewses = tryCatch(async (req, res, next) => {
    try {

        let { page, limit } = req.body;

        // let query = {};
        // if (state) query.state = state;
        // if (district) query.district = district;
        // if (location) query.location = location;
        // if (tags) query.tags = tags;
        // if (draft !== undefined) query.draft = draft;

        limit = limit ? limit : 4;

        page = page ? page : 1;


        YtNews.find({})
            .sort({ "createdAt": -1 })
            .skip((page - 1) * limit)
            .limit(limit)
            .select('news_id title location videoLinkId createdAt -_id')
            .then(news => {
                return res.status(200).json({ success: true, news })
            })
            .catch(err => {
                return next(new ErrorHandler(500, err.message))
            })
    } catch (error) {
        return next(new ErrorHandler(500, error.message))
    }
})

export const getYtNews = tryCatch(async (req, res, next) => {
    let { video_id, draft, mode, incrementVal } = req.body;
    incrementVal = mode !== 'edit' ? parseInt(incrementVal) : 0;

    YtNews.findOneAndUpdate({ news_id: video_id },
        { $inc: { "activity.total_reads": incrementVal, "activity.total_today_count": incrementVal } },
    )
        .select('news_id title description tags location state district videoLinkId createdAt updatedAt -_id')
        .then((news) => {
            if (news.draft && !draft) {
                return next(new ErrorHandler(400, 'This news is not published yet'))
            }
            let query = { $or: [] };
            let { tags, news_id } = news;
            if (tags && tags.length) {
                tags = tags.map(tag => tag.trim().toLowerCase());
                query.$or.push({ tags: { $in: tags } });
            }

            // Check if $or array is empty, if so, remove it from the query
            if (query.$or.length === 0) {
                delete query.$or;
            }

            // Add condition to exclude the given news_id
            if (news_id) {
                query.news_id = { $ne: news_id };
            }



            // Fetch related news
            YtNews.find(query)
                .limit(4)
                .sort({ "createdAt": -1 })
                .select('news_id title videoLinkId -_id')
                .then(relatedNews => {
                    return res.status(200).json({ news, relatedNews })
                }).catch(err => {
                    return next(new ErrorHandler(500, err.message));
                });
        })
        .catch(err => {
            return next(new ErrorHandler(500, err.message))
        })
})

export const getYtNewsCount = tryCatch(async (req, res, next) => {
    let { state, district, location, tags, draft } = req.body;

    let query = {};
    if (state) query.state = state;
    if (district) query.district = district;
    if (location) query.location = location;
    if (tags) query.tags = tags;
    if (draft !== undefined) query.draft = draft;

    YtNews.find(query).countDocuments()
        .then(count => {
            return res.status(200).json({ success: true, count })
        })
        .catch(err => {
            return next(new ErrorHandler(500, err.message))
        })
})

export const deleteYtNews = tryCatch(async (req, res, next) => {
    let { id } = req.params;


    YtNews.findOneAndDelete({ news_id: id })
        .then((news) => {
            return res.status(200).json({ success: true, message: 'Deleted Successfully' })
        })
        .catch(err => {
            return next(new ErrorHandler(500, err.message))
        })
})

export const adminYtNews = tryCatch(async (req, res, next) => {
    let { draft, deletedDocument } = req.body;
    let page = req.body.page || 1;
    let maxLimit = req.body.limit || 6;
    let skipDocs = (page - 1) * maxLimit;

    if (deletedDocument) {
        skipDocs -= deletedDocument;
    }

    YtNews.find({ draft })
        .skip(skipDocs)
        .limit(maxLimit)
        .sort({ createdAt: -1 })
        .select('news_id title description tags location state district videoLinkId createdAt -_id')
        .then((news) => {
            return res.status(200).json({ success: true, news })
        })
        .catch(err => {
            return next(new ErrorHandler(500, err.message))
        })
})



export const getMyNewsYt = tryCatch(async (req, res, next) => {
    let { limit, page, tags, state, district, location, draft } = req.body;
    const authorId = req.user._id;
    limit = limit ? parseInt(limit) : 10;
    page = page ? parseInt(page) : 1;
    const news = await YtNews.find().sort({ createdAt: -1 }).skip(limit * (page - 1)).limit(limit).select('news_id title createdAt activity videoLinkId -_id').exec();
    return res.status(200).json({ success: true, news })
})

export const getMyNewsCountYt = tryCatch(async (req, res, next) => {
    const { tag, state, tags, district, location, draft } = req.body;
    const authorId = req.user._id;
    let query = {}
    if (tags) query.tags = tags;
    if (state) query.state = state;
    if (district) query.district = district;
    if (location) query.location = location;
    if (draft) query.draft = draft;
    const count = await YtNews.countDocuments(query).exec();
    return res.status(200).json({ totalDocs: count })
})

export const fetchRelatedNews = tryCatch(async (req, res, next) => {
    let { tags, news_id } = req.body;
    let query = { $or: [] };

    // Trim and convert to lowercase if they exist
    // if (state) {
    //     state = state.trim().toLowerCase();
    //     query.$or.push({ state: state });
    // }
    // if (district) {
    //     district = district.trim().toLowerCase();
    //     query.$or.push({ district: district });
    // }
    // if (location) {
    //     location = location.trim().toLowerCase();
    //     query.$or.push({ location: location });
    // }

    // Handle tags
    if (tags && tags.length) {
        tags = tags.map(tag => tag.trim().toLowerCase());
        query.$or.push({ tags: { $in: tags } });
    }

    // Check if $or array is empty, if so, remove it from the query
    if (query.$or.length === 0) {
        delete query.$or;
    }

    // Add condition to exclude the given news_id
    if (news_id) {
        query.news_id = { $ne: news_id };
    }

    // Fetch related news
    YtNews.find(query)
        .limit(4)
        .sort({ "createdAt": -1 })
        .select('news_id title videoLinkId -_id')
        .then(news => {
            return res.status(200).json(news)
        }).catch(err => {
            return next(new ErrorHandler(500, err.message));
        });

});



