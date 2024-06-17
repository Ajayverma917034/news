import News from "../model/news.models.js";
import tryCatch from "../utils/asyncFunction.js";

export const getNews = tryCatch(async (req, res, next) => {
    let { page, limit, state, district, location, news_section_type } = req.body;
    const query = {}
    if (state) query.state = state;
    if (district) query.district = district;
    if (location) query.location = location;
    if (news_section_type) query.news_section_type = news_section_type;

    limit = parseInt(limit) || 10;
    page = parseInt(page) || 1;

    News.find({ draft })
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ createdAt: -1 })
        .select('news_id title draft createdAt -_id')
        .then((news) => {
            return res.status(200).json(news)
        })
        .catch(err => {
            return next(new ErrorHandler(500, err.message))
        })
})

