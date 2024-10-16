import mongoose, { Schema } from "mongoose";
import moment from 'moment-timezone';

// Set default timezone to IST (Indian Standard Time)
const getISTTime = () => moment.tz('Asia/Kolkata').toDate();

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
    },
    description: {
        type: String,
    },
    content: {
        type: [],
    },
    state: {
        type: [String],
    },
    district: {
        type: [String],
    },
    location: {
        type: String,
    },
    tags: {
        type: [String],
    },
    news_section_type: {
        type: [String],
        default: [],
    },
    imageRef: {
        type: String,
        default: '',
    },
    author: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    post_time: {
        type: Date,
        default: Date.now, // Store in UTC, convert when retrieving
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
    timestamps: true, // Mongoose will automatically create createdAt and updatedAt fields
});

// Convert createdAt and updatedAt to IST when retrieving
newsSchema.methods.toIST = function () {
    const createdAtIST = moment(this.createdAt).tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss');
    const updatedAtIST = moment(this.updatedAt).tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss');
    return { createdAtIST, updatedAtIST };
};

const News = mongoose.model('News', newsSchema);

export default News;
