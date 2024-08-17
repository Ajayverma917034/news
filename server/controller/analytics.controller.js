import EventNews from "../model/event.news.model.js";
import News from "../model/news.models.js"
import MonthNewsCount from "../model/news.read.model.js";
import monthNewsCount from "../model/news.read.model.js";
import YtNews from "../model/yt-news.models.js"
import { generateLast12MonthsData, generateLast30DaysData } from "../utils/analytics.generator.js"
import tryCatch from "../utils/asyncFunction.js"
import cron from 'node-cron';

const formatDate = (date) => {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const d = new Date(date);
    const month = monthNames[d.getMonth()];
    const day = d.getDate();
    const year = d.getFullYear();

    return `${month} ${day}, ${year}`;
};

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const formatMonth = (month, year) => {
    return monthNames[month - 1] + " " + year;
};


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

const formateEmptyArray = (year, month) => {
    const date = new Date(year, month, 0);
    const data = []
    for (let i = 0; i <= date.getDate(); i++) {
        data.push({
            count: 0,
            label: `${monthNames[date.getMonth()]} ${i + 1} ${year}`
        })
    }

    return data
}



export const getNewsMonthlyClickAnalytics = tryCatch(async (req, res, next) => {
    try {
        let { year, month } = req.body;
        year = year ? year : new Date().getFullYear();
        month = month ? month : new Date().getMonth() + 1;
        const result = await MonthNewsCount.aggregate([
            { $match: { month, year } },
            { $unwind: '$days' },
            { $project: { _id: 0, date: '$days.date', count: '$days.count' } }
        ]);

        console.log(result)

        if (result.length > 0) {
            // Format the date
            const formattedResult = result.map(day => ({
                label: formatDate(day.date),
                count: day.count,
            }));

            return res.json({ success: true, result: formattedResult });
        } else {
            const data = formateEmptyArray(year, month);
            return res.status(200).json({ success: true, result: data });
        }


    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
})

const formatResultYearly = (result, year) => {
    const data = [];
    const currentDate = new Date();
    const isCurrentYear = currentDate.getFullYear() === year;
    currentDate.setDate(currentDate.getDate() + 1);


    for (let i = 11; i >= 0; i--) {
        const endDate = new Date(
            year,
            currentDate.getMonth() - i,
            1
        );

        const startDate = new Date(
            endDate.getFullYear(),
            endDate.getMonth(),
            1
        );

        // Adjust endDate to the last day of the month
        endDate.setMonth(endDate.getMonth() + 1);
        endDate.setDate(endDate.getDate() - 1);

        const monthYear = endDate.toLocaleString('default', {
            month: "short",
            year: "numeric"
        });

        let countRes = result.find(item => item.month === endDate.getMonth() + 1)
        // const count = await model.countDocuments({
        //     createdAt: {
        //         $gte: startDate,
        //         $lt: endDate
        //     }
        // });

        data.push({ label: monthYear, count: countRes ? countRes.totalCount : 0 });
    }

    return { data };

}
export const getNewsYearlyClickAnalytics = tryCatch(async (req, res, next) => {
    let { year } = req.body;
    year = year ? parseInt(year) : new Date().getFullYear();

    try {
        const result = await MonthNewsCount.aggregate([
            { $match: { year } },
            {
                $group: {
                    _id: { month: "$month" },
                    totalCount: { $sum: { $sum: "$days.count" } }
                }
            },
            {
                $project: {
                    _id: 0,
                    month: "$_id.month",
                    totalCount: 1
                }
            },
            { $sort: { month: 1 } }
        ]);
        const data = formatResultYearly(result, year)


        return res.status(200).json({ success: true, result: data?.data });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'An error occurred while fetching the data.', error });
    }
});

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

cron.schedule('0 2 * * *', async () => {

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const month = yesterday.getMonth() + 1;
    const year = yesterday.getFullYear();
    const date = yesterday.getDate();

    try {
        const totalTodayCount = await News.aggregate([
            {
                $group: {
                    _id: null,
                    total: { $sum: "$activity.total_today_count" }
                }
            }
        ]);

        const totalTodayEventNewsCount = await EventNews.aggregate([
            {
                $group: {
                    _id: null,
                    total: { $sum: "$activity.total_today_count" }
                }
            }
        ])

        const totalTodayYtCount = await YtNews.aggregate([
            {
                $group: {
                    _id: null,
                    total: { $sum: "$activity.total_today_count" }
                }
            }
        ])

        const newsCount = totalTodayCount[0]?.total || 0;
        const eventNewsCount = totalTodayEventNewsCount[0]?.total || 0;
        const ytCount = totalTodayYtCount[0]?.total || 0;

        const count = newsCount + eventNewsCount + ytCount;

        let monthData = await monthNewsCount.findOne({ month, year });

        if (!monthData) {
            monthData = new monthNewsCount({ month, year, days: [] });
        }

        monthData.days.push({ date: yesterday, count });
        await monthData.save();

        await News.updateMany({}, { $set: { "activity.total_today_count": 0 } });
        await EventNews.updateMany({}, { $set: { "activity.total_today_count": 0 } });
        await YtNews.updateMany({}, { $set: { "activity.total_today_count": 0 } });

        // console.log(`Stored count ${count} for date ${startOfDay.toISOString().substring(0, 10)}`);
    } catch (err) {
        console.error(err);
    }
}, {
    timezone: "Asia/Kolkata" // Set the timezone to IST
});


