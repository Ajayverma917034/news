import mongoose from 'mongoose';

const pushNotificationSchema = new mongoose.Schema({
    account_id: {
        type: String,
        required: true,
        unique: true,
        indexedDB: true
    },
    expiration_time: {
        type: String,
        default: null
    },
    keys: {
        p256dh: {
            type: String,
            required: true
        },
        auth: {
            type: String,
            required: true
        }
    },
    endpoint: {
        type: String,
        required: true
    }
}, { timestamps: true })

const PushNotification = mongoose.model('PushNotification', pushNotificationSchema);
export default PushNotification;