const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');
const app = express();

app.use(express.json());
app.use(cors());

dotenv.config();

// for storage images 

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/images");
    },
    filename: function (req, file, cb) {
        const originalName = file.originalname.replace(/\s+/g, '-'); // Replace spaces with dashes
        const date = new Date();
        const currentDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
        const currentTime = `${date.getHours().toString().padStart(2, '0')}-${date.getMinutes().toString().padStart(2, '0')}-${date.getSeconds().toString().padStart(2, '0')}`;
        const fileName = `${currentDate}_${currentTime}_${originalName}`;
        cb(null, fileName);
    }
});

const upload = multer({ storage });


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));




app.post('/upload', upload.single('file'), async (req, res) => {

    try {
        const imageName = req.file.filename;
        res.status(200).json({ url: `${process.env.URL}/image/${imageName}` })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})



app.get('/', (req, res) => {
    res.send('Welcome to the image upload server!');

});

app.get('/image/:filename', async (req, res) => {
    try {
        const { filename } = req.params;
        // console.log(filename);
        const filePath = path.join(__dirname, 'public/images', filename)
        if (fs.existsSync(filePath)) {
            res.sendFile(filePath);
        }
        else {
            const filePath = path.join(__dirname, 'public/images', "not-found.png")
            if (fs.existsSync(filePath)) {
                res.sendFile(filePath);
            }
        }
    } catch (error) {
        console.log(error)
    }

})

app.listen(8000, () => {
    console.log('Server is running on port 8000');
});