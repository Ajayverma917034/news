import YtNews from "../model/yt-news.models.js";
import tryCatch from "../utils/asyncFunction.js";
import ErrorHandler from "../utils/errorHandler.js";

export const createYtNews = tryCatch(async (req, res, next) => {
    let { title, id, description, category, location, state, district, videoLinkId, draft } = req.body;

    if (!title) {
        return next(new ErrorHandler(400, `You must provide a title to ${draft === true ? "Publish" : "Save"} a news`))
    }
    if (!draft) {
        if (!description || description.trim() === '') {
            return next(new ErrorHandler(400, 'You must provide some description for the news'))
        }
        // if (!category || category.length === 0) {
        //     return next(new ErrorHandler(400, 'You must provide a category for the news'))
        // }
        if (!location || location.trim() === '') {
            return next(new ErrorHandler(400, 'You must provide a location for the news'))
        }
        if (!state || state.trim() === '') {
            return next(new ErrorHandler(400, 'You must provide a state for the news'))
        }
        if (!district || district.trim() === '') {
            return next(new ErrorHandler(400, 'You must provide a district for the news'))
        }
        if (!videoLinkId || videoLinkId.trim() === '') {
            return next(new ErrorHandler(400, 'You must provide a video link for the news'))
        }
    }

    let news_id = id || title.replace(/[^a-zA-Z0-9]/g, ' ').replace(/\s+/g, "-").trim()

    if (id) {
        YtNews.findOneAndUpdate({ news_id }, { title, description, category, location, state, district, videoLinkId, draft: draft ? draft : false }).then(news => {
            return res.status(200).json({ id: news.news_id, message: 'update Successfully' })
        })
            .catch(err => {
                return next(new ErrorHandler(500, 'Internal server error'))
            })
    }
    else {
        let news = new YtNews({ title, news_id, description, category, location, state, district, videoLinkId, draft: Boolean(draft), news_id })
        news.save().then(news => {

            // let incrementVal = draft ? 0 : 1;
            // User.findOneAndUpdate({_id: authorId}, { $inc: { "activity.total_yt_news": incrementVal}, $push: {"yt_news": news._id}})
            // .then(user => {
            //     return res.status(200).json({ id: news.news_id, message: 'created Successfully' })
            // })
            // .catch(err => {
            //     return next(new ErrorHandler(500, 'Failed to update total posts number'))
            // })

            return res.status(200).json({ success: true, id: news.news_id, message: 'created Successfully' })
        })
            .catch(err => {
                return next(new ErrorHandler(500, 'Internal server error'))
            })
    }
})

export const getYtNewses = tryCatch(async (req, res, next) => {
    try {
        let { page, limit, state, district, location, category, draft } = req.body;

        let query = {};
        if (state) query.state = state;
        if (district) query.district = district;
        if (location) query.location = location;
        if (category) query.category = category;
        if (draft !== undefined) query.draft = draft;

        limit = limit ? limit : 4;

        page = page ? page : 1;

        YtNews.find(query)
            .sort({ "activity.total_reads": -1, "createdAt": -1 })
            .skip((page - 1) * limit)
            .limit(limit)
            .select('news_id title description category location state district videoLinkId createdAt -_id')
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
    let { news_id, draft, mode } = req.body;

    let incrementVal = mode !== 'edit' ? 1 : 0;

    YtNews.findOneAndUpdate({ news_id }, { $inc: { "activity.total_reads": incrementVal } })
        .select('news_id title description category location state district videoLinkId createdAt -_id')
        .then((news) => {
            if (news.draft && !draft) {
                return next(new ErrorHandler(400, 'This news is not published yet'))
            }
            return res.status(200).json({ success: true, news })
        })
        .catch(err => {
            return next(new ErrorHandler(500, err.message))
        })
})

export const getYtNewsCount = tryCatch(async (req, res, next) => {
    let { state, district, location, category, draft } = req.body;

    let query = {};
    if (state) query.state = state;
    if (district) query.district = district;
    if (location) query.location = location;
    if (category) query.category = category;
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
    let { news_id } = req.body;

    YtNews.findOneAndDelete({ news_id })
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
        .select('news_id title description category location state district videoLinkId createdAt -_id')
        .then((news) => {
            return res.status(200).json({ success: true, news })
        })
        .catch(err => {
            return next(new ErrorHandler(500, err.message))
        })
})