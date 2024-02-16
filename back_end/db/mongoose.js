const mongoose = require('mongoose');
const MONGO_URL = 'mongodb+srv://harshitbisht1210:kVWvymoBq2ZiBffp@todoapp.uwzwekw.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(MONGO_URL, {useNewUrlParser: true});

const conn = mongoose.connection;

conn.on('error', () => {
    console.log("MongoDB connection failed");
})
conn.on('connected', () => {
    console.log("MongoDB connection connected successfully");
})

module.exports = conn;