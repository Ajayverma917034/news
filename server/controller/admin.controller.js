import News from "../model/news.models.js";
import User from "../model/user.model.js";
import tryCatch from "../utils/asyncFunction.js";
import ErrorHandler from "../utils/errorHandler.js";

export const getNews = tryCatch(async (req, res, next) => {
    let { page, limit, state, district, location, news_section_type, draft } = req.body;
    const query = {}
    if (state) query.state = state;
    if (district) query.district = district;
    if (location) query.location = location;
    if (news_section_type) query.news_section_type = news_section_type;

    limit = parseInt(limit) || 10;
    page = parseInt(page) || 1;

    News.find(query)
        .populate('author', 'username email -_id')
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ createdAt: -1 })
        .select('news_id title draft banner createdAt activity -_id')
        .then((news) => {
            return res.status(200).json(news)
        })
        .catch(err => {
            return next(new ErrorHandler(500, err.message))
        })
})

export const getAdminNewsCount = tryCatch(async (req, res, next) => {
    const { tags, state, district, location, draft } = req.body;
    let query = {}
    if (tags) query.tags = tags;
    if (state) query.state = state;
    if (district) query.district = district;
    if (location) query.location = location;
    if (draft) query.draft = draft;
    const count = await News.countDocuments(query).exec();
    return res.status(200).json({ totalDocs: count })
})


export const deleteNewsAdmin = tryCatch(async (req, res, next) => {
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

