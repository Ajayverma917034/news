import News from "../model/news.models.js";
import ScheduleNews from "../model/scheduleNews.model.js";
import tryCatch from "../utils/asyncFunction.js";
import ErrorHandler from "../utils/errorHandler.js";
import translate from "translate-google";
import cron from 'node-cron'
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

export const createScheduleNews = tryCatch(async (req, res, next) => {
    try {

        let authorId = req.user._id;
        let { id, title, description, content, state, district, location, news_section_type, banner, tags, draft, post_time } = req.body;


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

            // Check if tags is provided and not empty
            if (!tags || tags.length === 0) {
                return res.status(403).json({ error: 'You must provide tags for the news' })
            }

            if (!post_time.date || !post_time.time) {
                return res.status(403).json({ error: 'You must provide post time and date for the news' })
            }

            location = location.trim().toLowerCase();
            if (state.length) {
                for (let i = 0; i < state.length; i++) {
                    state[i] = state[i].trim().toLowerCase();
                }
            }
            if (district)
                for (let i = 0; i < district.length; i++) {
                    district[i] = district[i].trim().toLowerCase();
                }
            for (let i = 0; i < news_section_type.length; i++) {
                news_section_type[i] = news_section_type[i].trim().toLowerCase();
            }
        }

        if (id) {
            ScheduleNews.findOneAndUpdate({ news_id: id }, {
                title, description, content, state, district, location, banner, tags, news_section_type, post_time,
            }).then(news => {
                return res.status(200).json({ id: news.news_id, message: 'update Successfully' })
            })
        }
        else {

            let newUrlTitle = ""
            await translate(title, { from: 'hi', to: 'en' }).then(res => {

                newUrlTitle = res;
            }).catch(err => {
                console.log(err)
                return res.status(500).json({ success: false, error: err.message })
            });

            let news_id = id || newUrlTitle
                .trim()
                .toLocaleLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/-+/g, '-')
                .replace(/^-|-$/g, ''); // Remove leading or trailing hyphens

            news_id += '-' + getCurrentDate() + '-' + generateNanoId();

            let news = new ScheduleNews({
                title, description, content, state, district, location, tags, banner, news_section_type, post_time, draft: Boolean(draft), news_id, author: authorId
            })

            news.save().then(news => {
                return res.status(200).json({ message: 'News Schedule successfully' })
            }).catch(err => {
                console.log(err)
                return next(new ErrorHandler(500, err.message))

            })
        }
    } catch (error) {
        console.log(error)
        return next(new ErrorHandler(500, error.message))
    }
})

export const getScheduleNews = tryCatch(async (req, res, next) => {
    let { news_id, draft = false, mode, incrementVal: val } = req.body;

    ScheduleNews.findOne({ news_id })
        .select('news_id title description content tags state district banner location news_section_type post_time tags createdAt -_id')
        .then(article => {
            return res.status(200).json({ news: article })
        }
        ).catch(err => {
            console.log(err)
            return next(new ErrorHandler(500, err.message))
        })
})


export const publishScheduleNews = tryCatch(async (req, res, next) => {

    let { news_id } = req.body;


    // Find the scheduled news by news_id
    const scheduledNews = await ScheduleNews.findOne({ news_id });

    if (!scheduledNews) {
        return res.status(404).json({ message: 'Scheduled news not found' });
    }

    let newUrlTitle = ""
    await translate(scheduledNews.title, { from: 'hi', to: 'en' }).then(res => {

        newUrlTitle = res;
    }).catch(err => {
        console.log(err)
        return res.status(500).json({ success: false, error: err.message })
    });

    let new_news_id = newUrlTitle
        .trim()
        .toLocaleLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, ''); // Remove leading or trailing hyphens

    news_id += '-' + getCurrentDate() + '-' + generateNanoId();

    // Create a new News document from the scheduled news data
    const publishedNews = new News({
        news_id: new_news_id,
        title: scheduledNews.title,
        banner: scheduledNews.banner,
        description: scheduledNews.description,
        content: scheduledNews.content,
        state: scheduledNews.state,
        district: scheduledNews.district,
        location: scheduledNews.location,
        tags: scheduledNews.tags,
        news_section_type: scheduledNews.news_section_type,
        author: scheduledNews.author,
        post_time: new Date(), // Set the current date and time as the post time
        activity: {
            total_reads: 0,
            total_today_count: 0,
        },
        draft: false, // Ensure it's not marked as a draft
    });

    // Save the published news
    await publishedNews.save();

    // Remove the scheduled news from the ScheduleNews collection
    await ScheduleNews.deleteOne({ news_id });

    // Return a success response
    res.status(200).json({ message: 'News published successfully', news: publishedNews });
})

export const getMyScheduleNews = tryCatch(async (req, res, next) => {
    let { limit, page, tags, state, district, location, draft } = req.body;
    let query = {};
    if (draft) {
        query.draft = draft
    }
    const authorId = req.user._id;
    limit = limit ? parseInt(limit) : 10;
    page = page ? parseInt(page) : 1;
    // console.log(query)
    const news = await ScheduleNews.find({ author: authorId, ...query }).sort({ createdAt: -1 }).skip(limit * (page - 1)).limit(limit).select('news_id title createdAt banner post_time -_id').exec();
    return res.status(200).json({ success: true, news })
})


export const getMyScheduleNewsCount = tryCatch(async (req, res, next) => {
    const { tags, state, district, location, draft } = req.body;
    const authorId = req.user._id;
    let query = {}
    if (tags) query.tags = tags;
    if (state) query.state = state;
    if (district) query.district = district;
    if (location) query.location = location;
    if (draft) query.draft = draft;
    const count = await ScheduleNews.countDocuments({ author: authorId, ...query }).exec();
    return res.status(200).json({ totalDocs: count })
})


export const deleteScheduleNews = tryCatch(async (req, res, next) => {
    const authorId = req.user._id;
    let { id } = req.params;

    ScheduleNews.findOneAndDelete({ news_id: id }, { author: authorId })
        .then(news => {
            return res.status(200).json({ message: "News deleted successfully" })
        })
        .catch(err => {
            return next(new ErrorHandler(500, err.message))
        })
})

console.log("Hello")
cron.schedule('* * * * *', async () => {
    try {
        console.log("Cron running every minute");

        // Get the current date and time in India timezone
        const now = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
        const nowDate = new Date(now);

        const currentDate = nowDate.toISOString().split('T')[0]; // Format: YYYY-MM-DD
        const currentTime = nowDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }); // Format: HH:MM AM/PM

        console.log(currentDate, " ", currentTime);

        // Find all scheduled news where the scheduled date and time are less than the current date and time
        const overdueNews = await ScheduleNews.find({
            $or: [
                { 'post_time.date': { $lte: currentDate } }, // Date is before today
                {
                    'post_time.date': currentDate,
                    'post_time.time': { $lte: currentTime }
                } // Same date, but time is before now
            ]
        });

        console.log(overdueNews);

        if (overdueNews.length > 0) {
            for (let scheduledNews of overdueNews) {
                let newUrlTitle = "";
                await translate(scheduledNews.title, { from: 'hi', to: 'en' }).then(res => {
                    newUrlTitle = res;
                }).catch(err => {
                    console.log(err);
                    return res.status(500).json({ success: false, error: err.message });
                });

                let news_id = newUrlTitle
                    .trim()
                    .toLocaleLowerCase()
                    .replace(/[^a-z0-9]+/g, '-')
                    .replace(/-+/g, '-')
                    .replace(/^-|-$/g, ''); // Remove leading or trailing hyphens

                news_id += '-' + getCurrentDate() + '-' + generateNanoId();

                // Publish the news by copying it to the News collection
                const newNews = new News({
                    news_id,
                    title: scheduledNews.title,
                    banner: scheduledNews.banner,
                    description: scheduledNews.description,
                    content: scheduledNews.content,
                    state: scheduledNews.state,
                    district: scheduledNews.district,
                    location: scheduledNews.location,
                    tags: scheduledNews.tags,
                    news_section_type: scheduledNews.news_section_type,
                    author: scheduledNews.author,
                    post_time: nowDate // Set the publish time to now
                });

                await newNews.save();

                // Remove the scheduled news after publishing
                await ScheduleNews.deleteOne({ _id: scheduledNews._id });

                console.log(`Published overdue news with ID: ${scheduledNews.news_id} at ${nowDate}`);
            }
        } else {
            console.log(`No overdue scheduled news found to publish at ${nowDate}`);
        }
    } catch (error) {
        console.error('Error publishing scheduled news:', error);
    }
}, {
    timezone: "Asia/Kolkata" // Set the timezone to India
});
