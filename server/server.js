require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const app = express();

const cors = require('cors');
app.use(cors());

mongoose.connect(process.env.DATABASE_URL);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('*** Connected to MongoDB ***');
});


app.use(express.json());

const userRouter = require('./routes/user');
app.use('/user', userRouter);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('*** Server is running on port ' + PORT + ' ***');
});