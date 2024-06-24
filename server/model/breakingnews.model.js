import mongoose from "mongoose";
const newsSchema = new mongoose.Schema({
    title: {
        type: String,
    },
});
const BreakingNews = mongoose.model("breakingNews", newsSchema);

export default BreakingNews;