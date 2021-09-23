const express = require('express');
const app = express();
const port = 8800;
const path = require('path');

// library
var morgan = require('morgan');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
var multer = require('multer');
const helmet = require('helmet');

// use library
dotenv.config();
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true }, () => {
    console.log('---connected to mongoDB---');
});

// middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(helmet());

app.use('/images', express.static(path.join(__dirname, 'public/images')));

// router
const userRoute = require('./routers/userRoute');
const authRoute = require('./routers/authRoute');
const postRoute = require('./routers/postRoute');
const commentRoute = require('./routers/commentRoute');
const subCommentRoute = require('./routers/subCommentRoute');

// app
app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/posts', postRoute);
app.use('/api/comments', commentRoute);
app.use('/api/subcomments', subCommentRoute);

// upload file
const storagePost = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/post');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
    // Date.now() + '_' +
});

const upload = multer({ storage: storagePost });
//Uploading multiple files
app.post('/api/uploads', upload.array('imgCollections', 10), (req, res, next) => {
    try {
        return res.status(200).json('File uploaded successfully');
    } catch (error) {
        console.log(error);
    }
});
app.listen(port, () => {
    console.log(`------API START AT: http://localhost:${port}-----`);
});
