import News from '../model/news.models.js';
import tryCatch from '../utils/asyncFunction.js'
export const getMyNews = tryCatch(async(req, res, next) => {
    const authordId = req.user._id;
    let {limit, page} = req.body;
    News.find({author: authordId})
    .sort({createdAt: -1})
    .skip((page - 1) * limit)
    .limit(10)
    .select('title news_id banner activity.total_reads -_id')
    .then(news => {
        return res.status(200).json({success: true, news})
    })
    .catch(err => {
        return next(new ErrorHandler(500, 'Internal server error'))
    })
})