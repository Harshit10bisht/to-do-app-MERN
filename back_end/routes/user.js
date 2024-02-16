const express = require('express');
const router = new express.Router();
const User = require('../models/user');

router.get('/users', async (req, res) => {
    try {
        const search = await User.find();
        // console.log("inside /user :", search);
        res.status(200).send(search);
    }
    catch(e) {
        res.status(400).send(e);
    }
});

router.get('/user/:id', async (req, res) => {
    try {
        console.log("PARAMS :", req.params);
        const search = await User.findById(req.params.id);
        // console.log("inside /user :", search);
        res.status(200).send(search);
    }
    catch(e) {
        res.status(400).send(e);
    }
});

router.post('/signup', async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();
        res.send({ msg: "New User Created"});
    }
    catch(e) {
        res.status(400).send(e);
    }
})

module.exports = router;