import mongoose, { Schema } from "mongoose";

export const newsSchema = new mongoose.Schema({
    news_id: {
        type: String,
        required: true,
        unique: true,
    },
    title: {
        type: String,
        required: true,
    },
    banner: {
        type: String,
        // required: true,
    },
    description: {
        type: String,
        // required: true,
    },
    content: {
        type: [],
        // required: true,
    },
    state: {
        type: [String],
        default: [],
        // required: true,
    },
    district: {
        type: [String],
        default: [],
        // required: true,
    },
    location: {
        type: String,
        // required: true,
    },
    tags: {
        type: [String],
        // required: true,
    },
    news_section_type: {
        type: [String],
        // required: true,
        default: []
    },
    author: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    sendNotification: {
        type: Boolean,
        default: false,
    },
    imageRef: {
        type: String,
        default: '',
    },
    post_time:
    {
        date: {
            type: String,
        },
        time: {
            type: String,
        }
    },
}, {
    timestamps: true,
});


const ScheduleNews = mongoose.model('scheduleNews', newsSchema);

export default ScheduleNews
