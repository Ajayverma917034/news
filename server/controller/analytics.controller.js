import News from "../model/news.models.js"
import monthNewsCount from "../model/news.read.model.js";
import YtNews from "../model/yt-news.models.js"
import { generateLast12MonthsData, generateLast30DaysData } from "../utils/analytics.generator.js"
import tryCatch from "../utils/asyncFunction.js"
import cron from 'node-cron';


export const getYtVideos12MonthAnalytics = tryCatch(async (req, res, next) => {
    try {
        const { year } = req.body;
        const ytnews = await generateLast12MonthsData(YtNews, year)
        res.status(200).json({ success: true, data: ytnews })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
})
export const getNews12MonthAnalytics = tryCatch(async (req, res, next) => {
    try {
        const { year } = req.body;
        const data = await generateLast12MonthsData(News, year)
        res.status(200).json({ success: true, data })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
})
export const getYtVideos1MonthAnalytics = tryCatch(async (req, res, next) => {
    try {
        const { year, month } = req.body;
        const ytnews = await generateLast30DaysData(YtNews, year, month)
        res.status(200).json({ success: true, data: ytnews })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
})
export const getNews1MonthAnalytics = tryCatch(async (req, res, next) => {
    try {
        const { year, month } = req.body;

        const data = await generateLast30DaysData(News, year, month)
        res.status(200).json({ success: true, data })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
})


export const getNewsViewCountToday = tryCatch(async (req, res, next) => {
    const todayCount = await News.aggregate([
        {
            $group: {
                _id: null,
                total: { $sum: "$activity.total_today_count" }
            }
        }
    ]);

    const todayYtCount = await YtNews.aggregate([
        {
            $group: {
                _id: null,
                total: { $sum: "$activity.total_today_count" }
            }
        }
    ]);

    res.status(200).json({ success: true, Newscount: todayCount[0]?.total || 0, Ytcount: todayYtCount[0]?.total || 0 });
})

// for news reads

cron.schedule('1 0 * * *', async () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const startOfDay = new Date(yesterday);
    startOfDay.setHours(0, 0, 0, 0);
    console.log(startOfDay)

    const month = startOfDay.getMonth() + 1; // Months are 0-indexed
    const year = startOfDay.getFullYear();
    const date = startOfDay.getDate();

    try {
        const totalTodayCount = await News.aggregate([
            {
                $group: {
                    _id: null,
                    total: { $sum: "$activity.total_today_count" }
                }
            }
        ]);

        const count = totalTodayCount[0]?.total || 0;

        let monthData = await monthNewsCount.findOne({ month, year });

        if (!monthData) {
            monthData = new monthNewsCount({ month, year, days: [] });
        }

        monthData.days.push({ date: startOfDay, count });
        await monthData.save();

        await News.updateMany({}, { $set: { "activity.total_today_count": 0 } });

        console.log(`Stored count ${count} for date ${startOfDay.toISOString().substring(0, 10)}`);
    } catch (err) {
        console.error(err);
    }
});
