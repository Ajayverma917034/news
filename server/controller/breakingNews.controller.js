import BreakingNews from "../model/breakingnews.model.js";
import cron from 'node-cron';
export const Createnews = async (req, res) => {
    try {
        const user = req.user;
        const { title } = req.body;
        await BreakingNews.create({ title, author: user.username });
        return res
            .status(200)
            .json({ success: true, message: "breaking news created successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

export const Getallnews = async (req, res) => {
    try {
        const allnews = await BreakingNews.find().select("title -_id").exec();
        return res.status(200).json({ success: true, news: allnews });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};
export const GetAdminNews = async (req, res) => {
    try {
        const allnews = await BreakingNews.find().select("title createdAt author").exec();
        return res.status(200).json({ success: true, news: allnews });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};
export const getAdminNewsCount = async (req, res) => {
    try {
        BreakingNews.countDocuments().then(count => {
            return res.status(200).json({ totalDocs: count })
        })
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

export const Getnews = async (req, res) => {
    try {
        const { id } = req.params;
        const news = await BreakingNews.findById(id);
        return res.status(200).json({ success: true, news: news });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

export const Updatenews = async (req, res) => {
    try {
        const { id } = req.params;
        const { title } = req.body;
        const updatednews = await BreakingNews.findByIdAndUpdate(
            id,
            { title: title },
            { new: true }
        );
        return res.status(200).json({
            message: "news updated successfully",
            success: true,
            news: updatednews,
        });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

export const Deletenews = async (req, res) => {
    try {
        const { id } = req.params;
        await BreakingNews.findByIdAndDelete(id);
        return res.status(200).json({
            success: true,
            message: "news deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};



// Set up the cron job
cron.schedule('0 0 * * *', async () => {
    try {
        const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
        await BreakingNews.deleteMany({ createdAt: { $lt: twentyFourHoursAgo } });
    } catch (error) {
        console.error('Error deleting documents:', error);
    }
}, {
    scheduled: true,
    timezone: "Asia/Kolkata"
});