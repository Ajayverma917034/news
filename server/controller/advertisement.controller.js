import tryCatch from '../utils/asyncFunction.js'
import Advertisement from "../model/advertisement.mode.js";

export const createAdvertisement = tryCatch(async (req, res, next) => {
    let { title, banner, link, type } = req.body;
    try {
        await Advertisement.create({
            title,
            banner,
            link,
            type
        })
        res.status(201).json({
            success: true,
            message: "Advertisement created successfully"
        })
    }
    catch (err) {
        next(new ErrorHandler(err.message, 400))
    }
})

export const getAdvertisement = tryCatch(async (req, res, next) => {
    try {
        const data = await Advertisement.find();
        res.status(200).json({
            success: true,
            data: data,
            message: 'Advertisement fetched successfully'
        })
    }
    catch (err) {
        next(new ErrorHandler(err.message, 400))
    }
})

export const deleteAdvertisement = tryCatch(async (req, res, next) => {
    try {
        const { id } = req.body;
        await Advertisement.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: 'Advertisement deleted successfully'
        })
    }
    catch (err) {
        next(new ErrorHandler(err.message, 400))
    }


})

export const updateAdvertisement = tryCatch(async (req, res, next) => {
    try {
        const { id, title, banner, link, type } = req.body;
        await Advertisement.findByIdAndUpdate(id, {
            title,
            banner,
            link,
            type
        }, { new: true })
        res.status(200).json({
            success: true,
            message: 'Advertisement updated successfully'
        })

    } catch (err) {
        next(new ErrorHandler(err.message, 400))
    }
})