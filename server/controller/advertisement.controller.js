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

        let select = 'banner.url link -_id';

        const detailAds = await Advertisement.find({ type: "detail" }).sort({ 'order': 1 }).select(select).exec();

        const sideAds = await Advertisement.find({ type: 'square' }).sort({ 'order': 1 }).select(select).exec();
        const bannerAds = await Advertisement.find({ type: 'rectangle' }).sort({ 'order': 1 }).select(select).exec();
        res.status(200).json({
            success: true,
            bannerAds,
            sideAds,
            detailAds
        })



    }
    catch (err) {
        return res.status(500).json({ success: false, message: err.message })
    }
})
export const getAdminAdvertisement = tryCatch(async (req, res, next) => {
    try {
        const { type } = req.query;
        const data = await Advertisement.find({
            type: 'rectangle'
        }).sort({ "order": 1 }).select('banner link order').exec();

        const data2 = await Advertisement.find({ type: 'square' }).sort({ "order": 1 }).select('banner link order').exec();

        const data3 = await Advertisement.find({ type: 'detail' }).sort({ "order": 1 }).select('banner link order').exec();

        res.status(200).json({
            success: true,
            data: data,
            data2,
            data3
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
export const getSideAdvertisement = tryCatch(async (req, res, next) => {
    try {
        const { type, index } = req.query;
        const docCount = await Advertisement.countDocuments({ type });
        console.log(docCount)

        const data = await Advertisement.find({ type }).select('banner.url link -_id').exec();
        if (index >= docCount) {
            // Return a random advertisement
            const randomIndex = Math.floor(Math.random() * docCount);

            res.status(200).json({
                success: true,
                data: data[randomIndex]
            });
        } else {

            res.status(200).json({
                success: true,
                data: data[index]
            });
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
});


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

export const updateAdvertisementOrder = async (req, res) => {
    const { orderedAds } = req.body;
    // console.log(orderedAds)

    try {
        // Update the order of each ad in the database
        for (const [index, ad] of orderedAds.entries()) {
            const docs = await Advertisement.findByIdAndUpdate(ad._id, { order: index }, { new: true });
        }

        res.status(200).json({ message: 'Order updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update order', error });
    }
};