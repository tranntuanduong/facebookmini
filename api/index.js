const express = require('express');
const { solidityKeccak256 } = require('ethers/lib/utils');

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

app.use(helmet());

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));

app.use('/images', express.static(path.join(__dirname, 'public/images')));

// router
const userRoute = require('./routers/userRoute');
const authRoute = require('./routers/authRoute');
const postRoute = require('./routers/postRoute');
const commentRoute = require('./routers/commentRoute');
const subCommentRoute = require('./routers/subCommentRoute');
const storyRoute = require('./routers/storyRoute');
const conversationRoute = require('./routers/conversationRoute');
const messageRoute = require('./routers/messageRoute');
const ticketRoute = require('./routers/ticketRoute');




// app
app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/posts', postRoute);
app.use('/api/comments', commentRoute);
app.use('/api/subcomments', subCommentRoute);
app.use('/api/stories', storyRoute);
app.use('/api/conversations', conversationRoute);
app.use('/api/messages', messageRoute);
app.use('/api/initNFT', ticketRoute);

var router = express.Router();


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
