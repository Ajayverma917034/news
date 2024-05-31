import mongoose, { Schema } from "mongoose";

const stateSchema = new Schema({
    state: {
        type: String,
        unique: true,
        required: true

    },
    districts: {
        type: [mongoose.Schema.Types.ObjectId],
        required: true,
        ref: 'District'
    },
})

const State = mongoose.model('State', stateSchema)
export default State