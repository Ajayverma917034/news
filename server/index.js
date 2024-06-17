import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { fileURLToPath } from 'url';
import cors from 'cors'
import cookieParser from 'cookie-parser'
import ErrorThrow from './middleware/Errors.js'
import newsRouter from './router/news.routes.js'
import userRoute from './router/user.routes.js'
import districtAndStateRouter from './router/districAndState.routes.js'
import DashboardNewsRoutes from './router/dashboard.news.routes.js'
import path from 'path'
import YtRouter from './router/yt-news.routes.js'
import fileUploader from 'express-fileupload';
import { AdvertisementRoutes } from './router/advertisement.routes.js';
import cloudinary from 'cloudinary'
import adminRoutes from './router/admin.routes.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`)
    console.log(`Shutting down the server due to Uncaught Exception`)
    process.exit(1)
})

// cloudinary connect
dotenv.config()
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
const app = express()
app.use(fileUploader({
    useTempFiles: true,
}))
// cors
app.use(cors({
    origin: [process.env.FRONTEND_URL, process.env.ADMIN_URL, process.env.FRONTEND_URL_PROD],
    credentials: true
}))


const allowedOrigins = [process.env.FRONTEND_URL, process.env.ADMIN_URL, process.env.FRONTEND_URL_PROD];

app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    // res.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_URL)
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization')
    next()
})

// Middlewares
app.use(express.json())
app.use(cookieParser())

app.use(express.static(path.join(__dirname, "./client/dist")))
// console.log(__dirname)
// Routes
app.use('/api/v1', newsRouter)
app.use('/api/v1', userRoute)
app.use('/api/v1', districtAndStateRouter)
app.use('/api/v1', DashboardNewsRoutes)
app.use('/api/v1', YtRouter)
app.use('/api/v1', AdvertisementRoutes)
app.use('/api/v1', adminRoutes)

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./client/dist/index.html"));
});

// Default route
app.get('/', (req, res) => res.json({ message: 'Welcome to our API' }))
app.use((req, res) => res.status(404).json({ success: false, message: 'Not Found' }))


const PORT = process.env.PORT || 5000

// Database connection
const MongoUrl = 'mongodb://localhost:27017/janpad-news'
mongoose.connect(MongoUrl)
    .then(() => {
        console.log('Database connected')
    })
    .catch((err) => {
        console.log(err)
    })


// through error
app.use(ErrorThrow)


const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

// Handle unhandled promise rejections
process.on("unhandledRejection", err => {
    console.log(`Error: ${err.message}`)
    console.log(`Shutting down the server due to Unhandled promise Rejection`);
    server.close(() => {
        server.exit(1);
    })
})