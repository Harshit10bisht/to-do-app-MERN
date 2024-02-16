const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRouter = require('./routes/user.js');
require('./db/mongoose');

const app = express();
const port = process.env.port || 3000;

app.use(cors());
app.use(express.json());
app.use(userRouter);

// const User = require('./models/user.js');

// async function insertingOne() {
//     const user = new User({
//         name: "Harshit Bisht",
//         email: "hb1212@gmail.com"
//     });
//     console.log(user);
//     await user.save();
// } ;

// insertingOne();


app.listen(port, () => {
    console.log(`server is up on port ${port}`);
})