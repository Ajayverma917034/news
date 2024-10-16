import PushNotification from "../model/pushNotification.model.js";
import tryCatch from "../utils/asyncFunction.js";
import webpush from "web-push";
import dotenv from "dotenv";
dotenv.config();

export const subscribeNotification = tryCatch(async (req, res, next) => {
    let { expiration_time, keys, endpoint } = req.body;

    let accountId = endpoint.split('send')[1]?.slice(1).trim();
    let pushNotification = await PushNotification.findOne({ account_id: accountId });

    if (pushNotification) {
        await PushNotification.findOneAndUpdate({ account_id: accountId }, { expiration_time, keys, endpoint });
        return res.status(200).json({ message: 'Push notification updated successfully' });
    }

    await PushNotification.create({ account_id: accountId, expiration_time, keys, endpoint });
    return res.status(201).json({ message: 'Push notification created successfully' });

})

export const sendNotification = tryCatch(async (req, res, next) => {
    let pushNotifications = await PushNotification.find();

    if (pushNotifications.length === 0) {
        return res.status(404).json({ message: 'No push notification found' });
    }
    let payload = JSON.stringify({
        title: "Janpad News Live Update",
        body: "महाराष्ट्र और झारखंड में ",
        icon: "https://img.janpadnewslive.com/image/2024-10-15_18-39-33_android-chrome-192x192.png",
        url: "https://janpadnewslive.com/news/election-commission-announced-the-dates-of-by-elections-with-maharashtra-and-jharkhand-read-the-full-news-20241015-40649"  // The link to be opened on click
    });


    for (let i = 0; i < pushNotifications.length; i++) {
        webpush.sendNotification(pushNotifications[i], payload).then(data => { })
            .catch(err => {
                console.error("Error sending notification:", err);

            })

    }

    return res.status(200).json({ message: 'Message sent to push services' });
})

export const sendNewsNotification = tryCatch(async (news) => {
    let pushNotifications = await PushNotification.find();

    if (pushNotifications.length === 0) {

    }
    else {

        let payload = JSON.stringify({
            title: "Breaking News",
            body: news.title,
            icon: "https://img.janpadnewslive.com/image/2024-10-15_18-39-33_android-chrome-192x192.png",
            url: `https://janpadnewslive.com/news/${news.news_id}` // The link to be opened on click
        });


        for (let i = 0; i < pushNotifications.length; i++) {
            webpush.sendNotification(pushNotifications[i], payload).then(data => { })
                .catch(err => {
                    // console.error("Error sending notification:", err);

                })

        }
    }


    // return res.status(200).json({ message: 'Message sent to push services' });
})

const apiKeys = {
    publicKey: process.env.VAPID_PUBLIC_KEY,
    privateKey: process.env.VAPID_PRIVATE_KEY
}

webpush.setVapidDetails(
    `mailto:${process.env.SMTP_MAIL}`,
    apiKeys.publicKey,
    apiKeys.privateKey

)

