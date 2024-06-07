import mongoose from "mongoose";

const ytNewsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    news_id: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true
    },
    activity: {
        total_reads: {
            type: Number,
            default: 0
        }
    },
    tags: {
        type: [String],
        default: []
    },
    draft: {
        type: Boolean,
        default: false
    },
    location: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    district: {
        type: String,
        required: true
    },
    videoLinkId: {
        type: String,
        required: true
    }
}, { timestamps: true });

const YtNews = mongoose.model('yt-news', ytNewsSchema);

export default YtNews;