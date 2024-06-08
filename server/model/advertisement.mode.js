import mongoose from "mongoose";

const advertisementSchema = new mongoose.Schema({
    banner: {
        url: {
            type: String,
            default: ''
        },
        public_id: {
            type: String,
            default: ''
        },
    },
    link: {
        type: String,
        default: ''
    },
    type: {
        type: String,
        enum: ['rectangle', 'square'],
        default: 'rectangle'
    }
}, {
    timestamps: true
});


const Advertisement = mongoose.model('advertisement', advertisementSchema);

export default Advertisement;