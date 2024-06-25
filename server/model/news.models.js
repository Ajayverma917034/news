import mongoose, { Schema } from "mongoose";

const newsSchema = new mongoose.Schema({
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
        type: String,
        // required: true,
    },
    district: {
        type: String,
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


const News = mongoose.model('News', newsSchema);

export default News
