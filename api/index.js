const express = require('express');
const app = express();
const port = 8800;
const path = require('path');

// library
var morgan = require('morgan');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// use library
dotenv.config();
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true }, () => {
    console.log('---connected to mongoDB---');
});

// middleware
app.use(morgan('dev'));
app.use(express.json());

app.use('/images', express.static(path.join(__dirname, 'public/images')));

// router
const userRoute = require('./routers/userRoute');
const authRoute = require('./routers/authRoute');
const postRoute = require('./routers/postRoute');
const commentRoute = require('./routers/commentRoute');

// app
app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/posts', postRoute);
app.use('/api/comments', commentRoute);

app.listen(port, () => {
    console.log(`------API START AT: http://localhost:${port}-----`);
});
