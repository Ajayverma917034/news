import tryCatch from '../utils/asyncFunction.js'
import Advertisement from "../model/advertisement.mode.js";
import ErrorHandler from '../utils/errorHandler.js';
import axios from 'axios'
import cloudinary from 'cloudinary'

export const createAdvertisement = tryCatch(async (req, res, next) => {
    try {
        let { link, type } = req.body;
        const banner = req.files.banner; // Ensure req.files is populated correctly

        if (!banner) throw new Error('Please provide all the fields');

        const formData = new FormData();
        // formData.append('file', banner.data, banner.name, banner.tempFilePath); // Append buffer and original name

        // const uploadResponse = await axios.post(`${process.env.IMG_URL}/upload`, formData, {
        //     headers: {
        //         'Content-Type': 'multipart/form-data',
        //         ...formData.getHeaders() // Include form headers
        //     }
        // });

        // if (uploadResponse.status !== 200) {
        //     throw new Error('Image upload failed');
        // }

        const imageData = await cloudinary.uploader.upload(banner.tempFilePath, { folder: 'advertisement' })

        // const imageUrl = uploadResponse.data.url;

        const data = {
            url: imageData.url,
            public_id: imageData.public_id
        }
        await Advertisement.create({
            banner: data,
            link,
            type
        });

        res.status(201).json({
            success: true,
            message: "Advertisement created successfully"
        });
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message })
    }
});



export const getAdvertisement = tryCatch(async (req, res, next) => {
    try {
        const { type } = req.query;
        let select = 'banner.url link -_id';
        if (req.user) {
            select = 'banner link'
        }
        const data = await Advertisement.find({ type }).select(select).exec();
        res.status(200).json({
            success: true,
            data: data,
        })
    }
    catch (err) {
        return res.status(500).json({ success: false, message: err.message })
    }
})

export const getOneAdvertisement = tryCatch(async (req, res, next) => {
    try {
        const { id } = req.params;
        const advertisement = await Advertisement.findById(id);
        res.status(200).json({
            success: true,
            data: advertisement
        })

    } catch (error) {
        return res.status(500).json({ success: false, message: err.message })
    }
})

export const deleteAdvertisement = tryCatch(async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) {
            return next(new ErrorHandler('Please provide all the fields', 400))
        }
        const advertisement = await Advertisement.findById(id);
        if (!advertisement) {
            return next(new ErrorHandler('Advertisement not found', 404))
        }

        const deleteBanner = await cloudinary.uploader.destroy(advertisement.banner.public_id)


        await Advertisement.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: 'Advertisement deleted successfully'
        })
    }
    catch (err) {
        return res.status(500).json({ success: false, message: err.message })
    }


})

export const updateAdvertisement = tryCatch(async (req, res, next) => {
    try {
        const { add_id: id, link, type } = req.body;

        const banner = req.files.banner;

        if (!id) {
            return next(new ErrorHandler('Please provide all the fields', 400))
        }

        if (!banner) {
            return next(new ErrorHandler('Please provide all the fields', 400))
        }

        const advertisement = await Advertisement.findById(id);
        if (!advertisement) {
            return next(new ErrorHandler('Advertisement not found', 404))
        }

        const deleteBanner = await cloudinary.uploader.destroy(advertisement.banner.public_id)

        const imageData = await cloudinary.uploader.upload(banner.tempFilePath, { folder: 'advertisement' })

        await Advertisement.findByIdAndUpdate(id, {
            banner: {
                url: imageData.url,
                public_id: imageData.public_id
            },
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