import mongoose, { Schema } from "mongoose";

const eventNewsSchema = new mongoose.Schema({
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
    event_type: {
        type: String,
        default: '',
        // required: true,
    },
    author: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    post_time: {
        type: Date,
        default: '',
    },
    activity: {
        total_reads: {
            type: Number,
            default: 0,
        },
        total_today_count: {
            type: Number,
            default: 0,
        },
    },
    draft: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true,
});


const EventNews = mongoose.model('EventNews', eventNewsSchema);

export default EventNews
