import District from "../model/district.model.js";
import State from "../model/state.model.js";
import tryCatch from "../utils/asyncFunction.js";

export const createState = tryCatch(async (req, res, next) => {
    const { state } = req.body;
    if (!state) {
        return res.status(400).json({ success: false, message: "Please provide state" })
    }
    const isExistingState = await State.findOne({ state });
    if (isExistingState) {
        return res.status(400).json({ success: false, message: "State already exists" })
    }
    const newState = new State({
        state
    })

    await newState.save();

    return res.status(201).json({ success: true, message: "State created successfully" })
})

export const getState = tryCatch(async (req, res, next) => {

})

export const districtCreate = tryCatch(async (req, res, next) => {
    const { state, district } = req.body;
    if (!state || !district) {
        return res.status(400).json({ success: false, message: "Please provide state and district" })
    }
    const isExistingDistrict = await District.findOne({ district });
    if (isExistingDistrict) {
        return res.status(400).json({ success: false, message: "District already exists" })
    }

    const newDistrict = new District({
        district
    })

    newDistrict.save().
        then((data) => {
            State.findOneAndUpdate({ state }, { $push: { districts: data._id } })
                .then(() => {
                    return res.status(201).json({ success: true, message: "District created successfully" })
                })
                .catch(err => {
                    return res.status(500).json({ success: false, message: err.message })
                })
        })
        .catch(err => {
            return res.status(500).json({ success: false, message: err.message })
        })
})