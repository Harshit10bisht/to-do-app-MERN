const mongoose = require('mongoose');
require('dotenv').config();
const MONGO_URL = process.env.MONGO_URL;

mongoose.connect(MONGO_URL, {useNewUrlParser: true});

const conn = mongoose.connection;

conn.on('error', () => {
    console.log("MongoDB connection failed");
}).on('connected', () => {
    console.log("MongoDB connection connected successfully");
});

module.exports = conn;