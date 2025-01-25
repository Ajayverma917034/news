
import translate from "translate-google";
import ErrorHandler from "../utils/errorHandler.js";
import tryCatch from "../utils/asyncFunction.js";
import EventNews from "../model/event.news.model.js";

function generateNanoId(length = 5) {
    let result = '';
    for (let i = 0; i < length; i++) {
        result += Math.floor(Math.random() * 10); // Generates a random digit between 0 and 9
    }
    return result;
}

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
        let { id, title, description, banner, event_type = "", draft } = req.body;



        if (!title?.length) {
            return res.status(403).json({ error: `You must provide a title to ${draft === true ? "Publish" : "Save"} a news` })
        }
        if (!draft) {
            // if (!description.length) {
            //     return next(new ErrorHandler(403, 'You must provide some descrtiption for the news'))
            // }
        }

        if (id) {
            EventNews.findOneAndUpdate({ news_id: id }, { title, description, banner, event_type, draft: draft ? draft : false }).then(news => {
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

            let news = new EventNews({
                title, description, banner, draft: Boolean(draft), news_id, event_type, author: authorId
            })

            news.save().then(news => {

                return res.status(200).json({ id: news.news_id })

            }).catch(err => {
                return next(new ErrorHandler(500, err.message))

            })
        }
    } catch (error) {
        return next(new ErrorHandler(500, error.message))
    }
})


export const getNewses = tryCatch((req, res, next) => {
    let { page, limit, draft, event_type, isAdmin } = req.body;
    let query = {};

    // if (isAdmin) {
    //     isAdmin = Boolean(isAdmin)
    // }
    if (event_type) query.event_type = event_type;
    if (draft) query.draft = draft;

    limit = limit ? parseInt(limit) : 5;
    page = page ? parseInt(page) : 1;

    if (isAdmin) {
        EventNews.find(query)
            .sort({ "createdAt": -1 })
            .skip(limit * (page - 1))
            .limit(limit)
            .populate('author', 'username -_id')
            .select('news_id title banner activity.total_reads createdAt -_id')
            .then(news => {
                return res.status(200).json(news)
            }).catch(err => {
                return next(new ErrorHandler(500, err.message))
            })

    }
    else {

        EventNews.find(query)
            .sort({ "createdAt": -1 })
            .skip(limit * (page - 1))
            .limit(limit)
            .select('news_id title banner activity.total_reads createdAt -_id')
            .then(news => {
                return res.status(200).json(news)
            }).catch(err => {
                return next(new ErrorHandler(500, err.message))
            })
    }
})

export const getNews = tryCatch(async (req, res, next) => {
    let { news_id, draft = false, mode, incrementVal: val } = req.body;

    let incrementVal = mode !== 'edit' ? val : 0;

    EventNews.findOneAndUpdate({ news_id }, { $inc: { "activity.total_reads": incrementVal, "activity.total_today_count": incrementVal } })

        .select('news_id title description banner createdAt -_id')
        .then(article => {

            if (article.draft && !draft) {
                return next(new ErrorHandler(403, "This news is in draft mode"))
            }
            if (mode === 'edit') {
                return res.status(200).json({ news: article });
            }

            return res.status(200).json({ news: article })
        })
        .catch(err => {
            console.log(err)
            return next(new ErrorHandler(500, err.message))
        })
})

export const getNewsCount = tryCatch(async (req, res, next) => {
    let { event_type, draft } = req.body;
    let query = {};

    if (event_type) query.event_type = event_type;
    if (draft) query.draft = draft;

    EventNews.countDocuments(query).then(count => {
        return res.status(200).json({ totalDocs: count })
    }).catch(err => {
        return next(new ErrorHandler(500, err.message))
    })
})


export const deleteNews = tryCatch(async (req, res, next) => {
    let { id } = req.params;
    EventNews.findOneAndDelete({ news_id: id })
        .then(news => {
            return res.status(200).json({ message: "News deleted successfully" })

        })


        .catch(err => {
            return next(new ErrorHandler(500, err.message))
        })
})


export const fetchRandomNews = tryCatch(async (req, res, next) => {
    const news = await EventNews.aggregate([
        {
            $match: {
                event_type: "republic-day"
            }
        },
        {
            $sample: {
                size: 1
            }
        },
        {
            $project: {
                news_id: 1,
                title: 1,
                description: 1,
                banner: 1,
                createdAt: 1,
                _id: 0
            }
        }
    ]);
    let newsData = news[0];

    if (news) {
        return res.status(200).json(newsData)

    }
    else {
        return res.status(200).json(null)
    }

})


export const getMyNews = tryCatch(async (req, res, next) => {
    let { limit, page, event_type = 'republic-day', draft } = req.body;
    let query = {};
    if (draft) {
        query.draft = draft
    }
    if (event_type) {
        query.event_type = 'republic-day'
    }

    const authorId = req.user._id;
    limit = limit ? parseInt(limit) : 10;
    page = page ? parseInt(page) : 1;
    // console.log(query)
    const news = await EventNews.find({ author: authorId, ...query }).sort({ createdAt: -1 }).skip(limit * (page - 1)).limit(limit).select('news_id title createdAt activity banner -_id').exec();
    return res.status(200).json({ success: true, news })
})
export const getMyNewsCount = tryCatch(async (req, res, next) => {
    const { event_type, draft } = req.body;
    const authorId = req.user._id;
    let query = {}
    if (event_type) query.event_type = event_type;
    if (draft) query.draft = draft;

    const count = await EventNews.countDocuments({ author: authorId, ...query }).exec();
    return res.status(200).json({ totalDocs: count })
})

