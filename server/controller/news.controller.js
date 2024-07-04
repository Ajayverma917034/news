import News from "../model/news.models.js";
import State from "../model/state.model.js";
import User from "../model/user.model.js";
import tryCatch from "../utils/asyncFunction.js";
import ErrorHandler from "../utils/errorHandler.js";


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

export const createNews = tryCatch((req, res, next) => {
    try {

        let authorId = req.user._id;
        let { id, title, description, content, state, district, location, news_section_type, banner, tags, draft } = req.body;



        if (!title?.length) {
            return res.status(403).json({ error: `You must provide a title to ${draft === true ? "Publish" : "Save"} a news` })
        }
        if (!draft) {
            if (!description.length) {
                return next(new ErrorHandler(403, 'You must provide some descrtiption for the news'))
            }
            if (!content) {
                return res.status(403).json({ error: 'You must provide some content for the news' })
            }

            if (!state && !news_section_type.length) {
                return res.status(403).json({ error: 'You must provide either State or News Section tags' })
            }
            // Check if state is provided and not empty
            // if (!state || state.trim() === '') {
            //     return res.status(403).json({ error: 'You must provide a state for the news' })
            // }

            // // Check if district is provided and not empty
            // if (!district || district.trim() === '') {
            //     return res.status(403).json({ error: 'You must provide a district for the news' })
            // }

            // Check if location is provided and not empty
            if (!location || location.trim() === '') {
                return res.status(403).json({ error: 'You must provide a location for the news' })
            }

            // Check if tags is provided and not empty
            if (!tags || tags.length === 0) {
                return res.status(403).json({ error: 'You must provide tags for the news' })
            }

            // Check if tags is provided and not empty
            // if (!news_section_type || news_section_type.length === 0) {

            //     return res.status(403).json({ error: 'You must provide news_section_type for the news' })
            // }

            // Check if breaking_news is provided and is boolean
            // if (breaking_news === undefined || typeof breaking_news !== 'boolean') {
            //     return res.status(403).json({ error: 'You must provide breaking news status for the news' })
            // }

            location = location.trim().toLowerCase();
            state = state.trim().toLowerCase();
            district = district.trim().toLowerCase();
            for (let i = 0; i < news_section_type.length; i++) {
                news_section_type[i] = news_section_type[i].trim().toLowerCase();
            }
        }

        // tags = tags.map(tag => tag.trim().toLowerCase());

        let news_id = id || title.trim().replace(/\s+/g, '-');

        news_id += '-' + getCurrentDate() + '-' + generateNanoId();

        // tags = tags.map(tags => tags.trim().toLowerCase());
        if (id) {
            News.findOneAndUpdate({ news_id: id }, { title, description, content, state, district, location, banner, tags, news_section_type, draft: draft ? draft : false }).then(news => {
                return res.status(200).json({ id: news.news_id, message: 'update Successfully' })
            })
        }
        else {
            let news = new News({
                title, description, content, state, district, location, tags, banner, news_section_type, draft: Boolean(draft), news_id, author: authorId
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
        const data = [
            "Big News",
            "state",
            "apna jila",
            "Technology",
            "Crime",
            "Country",
            "Sports",
            "Entertainment",
            "Astrology",
            "Carrier",
            "Religion",
            // "Politics",
            "World",
            "Cricket",
            "Bollywood",
            "Health",
        ]

        let promises = [];

        // Loop through each entity in the data array
        for (let entity of data) {
            let query = {};

            query.news_section_type = { $in: entity.toLocaleLowerCase() };

            const news = await News.find(query).limit(5).sort({ createdAt: -1 }).select('news_id title location createdAt banner -_id').exec();

            let pushData = {
                title: entity,
                data: news
            }
            if (news.length > 0)
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
        .sort({ "createdAt": -1 })
        .skip(limit * (page - 1))
        .limit(limit)
        // .populate("author", "username profile")
        .select('news_id title banner location createdAt -_id')
        .then(news => {
            // if (!news.length) {
            //     News.find().sort({ "activity.total_reads": -1, "createdAt": -1 })
            //         .skip(limit * (page - 1))
            //         .limit(limit)
            //         .populate("author", "username profile")
            //         .select('news_id title description content tags state banner district location tags breaking_news draft createdAt -_id')
            //         .then(news => {
            return res.status(200).json(news)
            //         }).catch(err => {
            //             return next(new ErrorHandler(500, err.message))
            //         })
            // }
            // else {

            //     return res.status(200).json(news)
            // }
        }).catch(err => {
            return next(new ErrorHandler(500, err.message))
        })
})

export const getNews = tryCatch(async (req, res, next) => {
    let { news_id, draft, mode, incrementVal: val } = req.body;

    let incrementVal = mode !== 'edit' ? val : 0;
    News.findOneAndUpdate({ news_id }, { $inc: { "activity.total_reads": incrementVal, "activity.total_today_count": incrementVal } })
        .select('news_id title description content tags state district banner location activity.total_reads news_section_type tags createdAt -_id')
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
    let { state, district, location, tags, news_id, news_section_type } = req.body;
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

    // Handle news_section_type
    if (news_section_type && news_section_type.length) {
        query.$or.push({ news_section_type: { $in: news_section_type } });
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
    News.find(query)
        .limit(4)
        .sort({ "createdAt": -1 })
        .select('news_id title banner -_id')
        .then(news => {
            return res.status(200).json(news)
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
            .sort({ "createdAt": -1 })
            .select('news_id title banner _-id');

        // Randomly pick 5 news items from the fetched news
        const shuffled = fetchedNews.sort(() => 0.5 - Math.random());
        let selectedNews = shuffled.slice(0, 5);

        // Return the randomly selected results
        return res.status(200).json({ news: selectedNews })
        // if (selectedNews.length === 0) {
        //     News.find().sort({ "activity.total_reads": -1, "createdAt": -1 })
        //         .limit(limit)
        //         .populate("author", "username profile")
        //         .select('news_id title banner -_id')
        //         .then(news => {
        //         }).catch(err => {
        //             return next(new ErrorHandler(500, err.message))
        //         })
        // }
        // else {

        //     res.status(200).json({ news: selectedNews });
        // }
    } catch (err) {
        // Handle potential errors
        next(new ErrorHandler(500, err.message));
    }
});

export const fetchDataStateWise = tryCatch(async (req, res, next) => {
    const { state } = req.body;
    let promises = [];
    const data =
        [
            'sonbhadra',
            'chandauli',
            'mirzapur',
            'varanasi',
            'gajipur',
            'shahjhapur',
            'prayagraj',
            'deoria',
            'bareilly',
            'lakhimpur kheri',
            'pilibhit',
        ]



    if (state !== 'uttar pradesh') {
        return res.status(404).json({ success: false, message: "State not found" })
    }
    const stateNews = await News.find({ state }).limit(5).sort({ createdAt: -1 }).populate("author", "username profile -_id").select('news_id title tags banner state district location createdAt -_id').exec();

    promises.push(stateNews);

    // let districts = await State.findOne({ state }).populate("districts", "district -_id").select("districts -_id").exec();
    // if (districts === null) {
    //     return res.status(200).json({ success: true, data: promises, dataSequence: { state: state, districts: [] } });
    // }
    for (let district of data) {
        const districtNews = await News.find({ district: district }).limit(5).sort({ createdAt: -1 }).select('news_id title state district location tags createdAt banner -_id').exec();
        promises.push(districtNews);
    }
    const dataSequence = {
        state: state,
        districts: data
    }
    return res.status(200).json({ success: true, data: promises, dataSequence });

})

export const findStateDataWithOutDistrict = tryCatch(async (req, res, next) => {
    let { state, limit, page } = req.body;
    limit = limit ? parseInt(limit) : 5;
    page = page ? parseInt(page) : 1;

    News.find({ state })
        .sort({ "createdAt": -1 })
        .skip(limit * (page - 1))
        .limit(limit)
        .select('news_id title description location banner createdAt -_id')
        .then(news => {
            return res.status(200).json(news)
        }
        ).catch(err => {
            console.log(err)
            return next(new ErrorHandler(500, err.message))
        })

})
export const findStateNews = tryCatch(async (req, res, next) => {
    let promises = [];
    // let states = await State.find().select('state -_id').exec();

    let states = [
        'uttar pradesh',
        'madhya pradesh',
        'bihar',
        'jharkhand',
        'chhattisgarh',
        'uttrakhand',
    ]
    // if (states === null) {
    //     return res.status(200).json({ success: true, data: { state: [] } });
    // }
    for (let state of states) {
        const stateNews = await News.find({ state: state })
            .sort({ createdAt: -1 })
            .limit(5)
            .select('news_id title location createdAt banner -_id')
            .exec();
        promises.push({ state: state, data: stateNews });
    }

    return res.status(200).json({ success: true, data: promises });
})

export const getBreakingNews = tryCatch(async (req, res, next) => {
    const breakingNews = await News.find({ breaking_news: true }).limit(5).sort({ createdAt: -1 }).select('news_id title description state district location tags createdAt banner -_id').exec();

    return res.status(200).json({ success: true, breakingNews })
})



export const getMyNews = tryCatch(async (req, res, next) => {
    let { limit, page, tags, state, district, location, draft } = req.body;
    let query = {};
    if (draft) {
        query.draft = draft
    }
    const authorId = req.user._id;
    limit = limit ? parseInt(limit) : 10;
    page = page ? parseInt(page) : 1;
    // console.log(query)
    const news = await News.find({ author: authorId, ...query }).sort({ createdAt: -1 }).skip(limit * (page - 1)).limit(limit).select('news_id title createdAt activity banner -_id').exec();
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


export const deleteDraftNews = tryCatch(async (req, res, next) => {
    const { id } = req.params;
    const news = await News.findOne({ news_id: id }).populate('author', 'username');
    if (!news) {
        return next(new ErrorHandler(404, 'News not found'))
    }

    // return res.status(200).json({ message: "News deleted successfully" })

    await News.deleteOne({ news_id: id })

    User.findOneAndUpdate({ username: news.author.username }, { $inc: { "account_info.total_news": -1 }, $pull: { "news": news._id } })
        .then(user => {
            return res.status(200).json({ message: "News deleted successfully" })
        })
        .catch(err => {
            return next(new ErrorHandler(500, err.message))

        })
})

export const searchNews = tryCatch(async (req, res, next) => {
    const { search } = req.body;
    let query = {};
    if (search) {
        query.$or = [
            { title: { $regex: search, $options: 'i' } },  // Case-insensitive search on title
            { location: { $regex: search, $options: 'i' } },  // Case-insensitive search on location
            { state: { $regex: search, $options: 'i' } },  // Case-insensitive search on state
            { district: { $regex: search, $options: 'i' } },  // Case-insensitive search on district
            { tags: { $elemMatch: { $regex: search, $options: 'i' } } }  // Case-insensitive search on tags array
        ];
    }

    const news = await News.find(query).limit(5).sort({ createdAt: -1 }).select('news_id title createdAt banner -_id').exec();

    return res.status(200).json({ success: true, news })
})

