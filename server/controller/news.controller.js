import News from "../model/news.models.js";
import State from "../model/state.model.js";
import User from "../model/user.model.js";
import tryCatch from "../utils/asyncFunction.js";
import ErrorHandler from "../utils/errorHandler.js";
import translate from "translate-google";
import { sendNewsNotification } from "./pushnotification.controller.js";

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

export const createNews = tryCatch(async (req, res, next) => {
    try {
        let authorId = req.user._id;
        let { id, title, description, content, state, district, location, news_section_type, banner, tags, draft, sendNotification, imageRef } = req.body;

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
            if (!state.length && !news_section_type.length && !district.length) {
                return res.status(403).json({ error: 'You must provide either State or News Section tags or districts' })
            }

            if (!location || location.trim() === '') {
                return res.status(403).json({ error: 'You must provide a location for the news' })
            }

            if (!tags || tags.length === 0) {
                return res.status(403).json({ error: 'You must provide tags for the news' })
            }

            location = location.trim().toLowerCase();
            for (let i = 0; i < state.length; i++) {
                state[i] = state[i].trim().toLowerCase();
            }
            for (let i = 0; i < district.length; i++) {
                district[i] = district[i].trim().toLowerCase();
            }
            for (let i = 0; i < news_section_type.length; i++) {
                news_section_type[i] = news_section_type[i].trim().toLowerCase();
            }
        }

        if (id) {
            // Update existing news
            News.findOneAndUpdate({ news_id: id }, { title, description, content, state, district, location, banner, tags, news_section_type, imageRef, draft: draft ? draft : false })
                .then(news => {
                    return res.status(200).json({ id: news.news_id, message: 'update Successfully' })
                })
        } else {
            // Create new news
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
                .replace(/^-|-$/g, '');

            news_id += '-' + getCurrentDate() + '-' + generateNanoId();

            let news = new News({
                title, description, content, state, district, location, tags, banner, news_section_type, draft: Boolean(draft), news_id, author: authorId, imageRef
            });

            news.save().then(async (news) => {

                let incrementVal = draft ? 0 : 1;
                User.findOneAndUpdate({ _id: authorId }, {
                    $inc: { "account_info.total_news": incrementVal }, $push: { "news": news._id }
                }).then(async (user) => {

                    // Return response to frontend first
                    res.status(200).json({ id: news.news_id });

                    // Proceed to send notification in the background
                    if (sendNotification) {
                        try {
                            await sendNewsNotification(news);
                        } catch (err) {
                            console.log("Notification sending failed: ", err);
                        }
                    }

                }).catch(err => {
                    return next(new ErrorHandler(500, "Failed to update total posts number"))
                })

            }).catch(err => {
                return next(new ErrorHandler(500, err.message))
            })
        }
    } catch (error) {
        return next(new ErrorHandler(500, error.message));
    }
});


export const getHomeNews = tryCatch(async (req, res, next) => {
    try {
        // let { data } = req.body;
        const data = [
            "Big News",
            "state",
            "apna jila",
            "Crime",
            "Country",
            "Sports",
            // "Entertainment",
            "Astrology",
            "Carrier",
            "Religion",
            // "Politics",
            "World",
            // "Cricket",
            "Bollywood",
            "Health",
            "Technology",
        ]

        let promises = [];

        // Loop through each entity in the data array
        for (let entity of data) {
            let query = {};

            query.news_section_type = { $in: entity.toLocaleLowerCase() };
            query.draft = false;

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
    let { page, limit, state, district, location, tags, breaking_news, draft = false, news_section_type } = req.body;
    let query = {};

    if (state) {
        // state = state.map(type => type.trim().toLowerCase());
        if (state === 'rajya') {
            query.state = { $in: ["uttar pradesh", "uttarakhand", "bihar", "jharkhand", "madhyapradesh", "chhattisgarh"] }
        }
        else {
            query.state = { $in: state };

        }
    }
    if (district) {
        // district = district.map(type => type.trim().toLowerCase());
        if (district === 'zila') {
            query.district = { $in: ["sonbhadra", "chandauli", "mirzapur", "varanasi", "gajipur", "shahjhapur", "prayagraj", "deoria", "bareilly", "pilibhit", 'lakhimpur kheri', "singrauli"] }
        }
        else {
            query.district = { $in: district };

        }
    }


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
        .sort({ "createdAt": -1 })
        .skip(limit * (page - 1))
        .limit(limit)
        .select('news_id title banner location createdAt -_id')
        .then(news => {
            return res.status(200).json(news)
        }).catch(err => {
            return next(new ErrorHandler(500, err.message))
        })
})
export const getNews = tryCatch(async (req, res, next) => {
    let { news_id, draft = false, mode, incrementVal: val } = req.body;
    let incrementVal = mode !== 'edit' ? val : 0;

    News.findOneAndUpdate(
        { news_id },
        { $inc: { "activity.total_reads": incrementVal, "activity.total_today_count": incrementVal } },
        { new: true, timestamps: false } // Disable automatic `updatedAt` update
    )
        .select('news_id title description content tags state district banner location activity.total_reads news_section_type tags createdAt updatedAt imageRef -_id')
        .then(article => {
            if (!article) {
                return next(new ErrorHandler(404, "News not found"));
            }

            if (article.draft && !draft) {
                return next(new ErrorHandler(403, "This news is in draft mode"));
            }

            // Convert createdAt and updatedAt to IST (UTC + 5:30) for display purposes
            const convertToIST = (date) => new Date(new Date(date).getTime() + (5.5 * 60 * 60 * 1000));

            // Assuming article is in UTC, now convert to IST for display
            article = {
                ...article._doc,
                news_post_time: article.createdAt,
                createdAt: convertToIST(article.createdAt),
                updatedAt: convertToIST(article.updatedAt)
            };

            // console.log("Converted to IST createdAt:", article.createdAt);

            if (mode === 'edit') {
                return res.status(200).json({ news: article });
            }

            let query = { $or: [] };
            let { state, district, location, tags, news_section_type, news_id } = article;
            if (tags && tags.length) {
                tags = tags.map(tag => tag.trim().toLowerCase());
                query.$or.push({ tags: { $in: tags } });
            }

            if (news_section_type && news_section_type.length) {
                query.$or.push({ news_section_type: { $in: news_section_type } });
            }

            if (query.$or.length === 0) {
                delete query.$or;
            }

            if (news_id) {
                query.news_id = { $ne: news_id };
            }

            News.find(query)
                .limit(4)
                .sort({ "createdAt": -1 })
                .select('news_id title banner -_id createdAt updatedAt')
                .then(async (news) => {
                    const randomNewsId = await News.aggregate([
                        { $match: { news_id: { $ne: news_id } } },
                        { $sort: { createdAt: -1 } },
                        { $limit: 50 },
                        { $sample: { size: 1 } },
                        { $project: { news_id: 1, _id: 0 } }
                    ]).exec();

                    // Adjust createdAt and updatedAt for related news to IST for display
                    news = news.map(n => ({
                        ...n._doc,
                        createdAt: convertToIST(n.createdAt),
                        updatedAt: convertToIST(n.updatedAt)
                    }));

                    return res.status(200).json({ news: article, relatedNews: news, randomNewsId: randomNewsId });
                })
                .catch(err => {
                    return next(new ErrorHandler(500, err.message));
                });
        })
        .catch(err => {
            console.log(err);
            return next(new ErrorHandler(500, err.message));
        });
});




export const getQueryNewsCount = tryCatch(async (req, res, next) => {
    let { news_section_type, state, district } = req.body;

    let query = {};

    if (news_section_type && news_section_type.length) {
        news_section_type = news_section_type.map(type => type.trim().toLowerCase());
        query.news_section_type = { $in: news_section_type };
    }
    if (state) {
        query.state = { $in: state };
    }
    if (district) {
        query.district = { $in: district };

    }

    News.countDocuments(query).then(count => {
        return res.status(200).json({ DocCount: count })
    }).catch(err => {
        return next(new ErrorHandler(500, err.message))
    })

})


export const getNewsCount = tryCatch(async (req, res, next) => {
    let { state, district, location, tags, breaking_news, draft } = req.body;
    let query = {};

    // if (state) query.state = state;
    // if (district) query.district = district;

    if (state) {
        // state = state.map(type => type.trim().toLowerCase());
        query.state = { $in: state };
    }
    if (district) {
        // district = district.map(type => type.trim().toLowerCase());
        query.district = { $in: district };
    }
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
    let { news_id, incrementVal } = req.query;

    if (!news_id) {
        return next(new ErrorHandler(400, "News ID is required"));
    }
    incrementVal = incrementVal ? 1 : 0;
    const news = await News.findOneAndUpdate({ news_id }, {
        $inc: { "activity.total_reads": incrementVal }
    }, { new: true, timestamps: false }).exec();

    if (!news) {
        return next(new ErrorHandler(404, "News not found"));
    }

    let { state, district, location, tags, news_section_type } = news;

    let query = { $or: [] };

    if (tags && tags.length) {
        tags = tags.map(tag => tag.trim().toLowerCase());
        query.$or.push({ tags: { $in: tags } });
    }

    if (news_section_type && news_section_type.length) {
        query.$or.push({ news_section_type: { $in: news_section_type } });
    }

    if (query.$or.length === 0) {
        delete query.$or;
    }

    if (news_id) {
        query.news_id = { $ne: news_id };
    }

    let relatedNews = await News.find(query)
        .limit(4)
        .sort({ "createdAt": -1 })
        .select('news_id title banner -_id createdAt updatedAt')
        .exec();

    if (relatedNews.length === 0) {
        relatedNews = await News.aggregate([{ $sample: { size: 4 } }]).exec();
    }
    return res.status(200).json(relatedNews);

    // let { state, district, location, tags, news_id, news_section_type } = req.body;
    // let query = { $or: [] };

    // if (tags && tags.length) {
    //     tags = tags.map(tag => tag.trim().toLowerCase());
    //     query.$or.push({ tags: { $in: tags } });
    // }

    // // Handle news_section_type
    // if (news_section_type && news_section_type.length) {
    //     query.$or.push({ news_section_type: { $in: news_section_type } });
    // }
    // // Check if $or array is empty, if so, remove it from the query
    // if (query.$or.length === 0) {
    //     delete query.$or;
    // }

    // // Add condition to exclude the given news_id
    // if (news_id) {
    //     query.news_id = { $ne: news_id };
    // }

    // Fetch related news
    News.find(query)
        .limit(4)
        .sort({ "createdAt": -1 })
        .select('news_id title banner -_id')
        .then(news => {
            if (news.length === 0) {
                News.aggregate([{ $sample: { size: 4 } }])
                    .then(news => {
                        return res.status(200).json(news)
                    }).catch(err => {
                        return next(new ErrorHandler(500, err.message));
                    });
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
            .sort({ "createdAt": -1 })
            .select('news_id title banner -_id')
            .exec()

        // Randomly pick 5 news items from the fetched news
        const shuffled = fetchedNews.sort(() => 0.5 - Math.random());
        let selectedNews = shuffled.slice(0, 5);

        // Return the randomly selected results
        return res.status(200).json({ news: selectedNews })
    } catch (err) {
        // Handle potential errors
        next(new ErrorHandler(500, err.message));
    }
});

export const fetchDataStateWise = tryCatch(async (req, res, next) => {
    const { state } = req.body;
    let promises = [];

    const data = [
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
    ];

    if (state !== 'uttar pradesh') {
        return res.status(404).json({ success: false, message: "State not found" });
    }

    // Query for state-wise news
    const stateNews = News.find({ state: { $in: [state] } })
        .limit(5)
        .sort({ createdAt: -1 })
        .populate("author", "username profile -_id")
        .select('news_id title tags banner state district location createdAt -_id')
        .exec();

    promises.push(stateNews);

    // Query for district-wise news
    for (let district of data) {
        const districtNews = News.find({ district: { $in: [district] } })
            .limit(5)
            .sort({ createdAt: -1 })
            .select('news_id title state district location tags createdAt banner -_id')
            .exec();
        promises.push(districtNews);
    }

    // Await all promises and gather results
    const results = await Promise.all(promises);

    const dataSequence = {
        state: state,
        districts: data
    };

    return res.status(200).json({ success: true, data: results, dataSequence });
});


export const findStateDataWithOutDistrict = tryCatch(async (req, res, next) => {
    let { state, limit, page } = req.body;
    limit = limit ? parseInt(limit) : 5;
    page = page ? parseInt(page) : 1;

    News.find({ state: { $in: [state] } })
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
        'bihar',
        'madhya pradesh',
        'jharkhand',
        'chhattisgarh',
        'uttrakhand',
    ]
    // if (states === null) {
    //     return res.status(200).json({ success: true, data: { state: [] } });
    // }
    for (let state of states) {
        const stateNews = await News.find({ state: { $in: [state] } })
            .sort({ createdAt: -1 })
            .limit(5)
            .select('news_id title location createdAt banner -_id')
            .exec();

        // console.log(stateNews)
        if (stateNews.length > 0)
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
    if (state) {
        // state = state.map(type => type.trim().toLowerCase());
        query.state = { $in: state };
    }
    if (district) {
        // district = district.map(type => type.trim().toLowerCase());
        query.district = { $in: district };
    }
    // if (district) query.district = district;
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

    const news = await News.find(query).sort({ createdAt: -1 }).select('news_id title createdAt banner -_id').exec();

    return res.status(200).json({ success: true, news })
})

export const fetchRandomNews = tryCatch(async (req, res, next) => {
    const { news_id } = req.body;
    const news = await News.find({ news_id: { $ne: news_id } }, { createdAt: -1 }).limit(50).sort({ createdAt: -1 }).select('news_id title description content tags state district banner location activity.total_reads news_section_type tags  createdAt -_id').exec();

    const randomIndex = Math.floor(Math.random() * news.length);
    const randomNews = news[randomIndex];

    // Update the total reads count for the selected news
    await News.findOneAndUpdate(
        { news_id: randomNews.news_id },
        { $inc: { "activity.total_reads": 1, "activity.total_today_count": 1 } }
    );

    res.status(200).json({ success: true, news: randomNews });

    // get 1 random news

})


const convertStateAndDistrictToArray = async () => {
    try {

        const newsDocuments = await News.find({});

        // Iterate over each document and update the fields
        for (let news of newsDocuments) {
            if (!Array.isArray(news.state)) {
                news.state = [news.state].filter(Boolean); // Convert to array if it's a string
            }

            if (!Array.isArray(news.district)) {
                news.district = [news.district].filter(Boolean); // Convert to array if it's a string
            }

            // Save the updated document
            await news.save();
        }

        // console.log("All documents have been updated.");
    } catch (error) {
        console.error("Error updating documents:", error);
    }
};

// convertStateAndDistrictToArray();
