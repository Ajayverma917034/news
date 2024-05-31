import mongoose from "mongoose";

const advertisementSchema = new mongoose.Schema({
    banner: {
        url: {
            type: String,
        }
    },
    link: {
        type: String,
        default: ''
    },
    type: {
        type: String,
        enum: ['top', 'side', 'detail']
    }
}, {
    timestamps: true
});


const Advertisement = mongoose.model('advertisement', advertisementSchema);

export default Advertisement;