import mongoose, { Schema } from "mongoose"

const districtSchema = new Schema({
    district: {
        type: String,
        unique: true,
        required: true
    },
})

const District = mongoose.model('District', districtSchema)
export default District