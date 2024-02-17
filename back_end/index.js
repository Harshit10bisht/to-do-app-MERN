const express = require('express');
const cors = require('cors');
const userRouter = require('./routes/user.js');
require('./db/mongoose');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(userRouter);

app.listen(port, () => {
    console.log(`server is up on port ${port}`);
})