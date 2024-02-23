const express = require('express');
const router = new express.Router();
const User = require('../models/user');
const auth = require('../middleware/auth');

router.get('/users', async (req, res) => {
    try {
        const user = await User.find();
        // console.log("inside /user :", user);
        res.status(200).send(user);
    }
    catch(e) {
        res.status(400).send(e);
    }
});

router.get('/user/:id', async (req, res) => {
    try {
        console.log("PARAMS :", req.params);
        const user = await User.findById(req.params.id);
        // console.log("inside /user :", search);
        const genToken = user.generateAuthToken();
        // console.log("generated token :", genToken);
        res.status(200).send(user);
    }
    catch(e) {
        res.status(400).send(e);
    }
});

router.post('/signup', async (req, res) => {
    const user = new User(req.body);

    try {
        const isPresent = await User.exists({ email: user.email});
        if(!isPresent) {
            await user.save();
            res.status(200).send({ msg: "New User Created"});
        }
        else {
            res.status(409).send({ msg: 'Email ID already exists'});
        }
    }
    catch(e) {
        res.status(400).send(e);
    }
});

router.post('/login', async (req, res) => {
    try {
        console.log("PARAMS :", req.body);
        const user = await User.findByCredentials(req.body);
        console.log("inside /user :", user.toString());
        const token = await user.generateAuthToken();
        // await User.updateOne({email: user.email}, { $set: { tokens: user.tokens }});
        console.log("generated token :", token);
        res.status(200).send({ msg: "Logged in successfully"});
    }
    catch(e) {
        res.status(400).send(e);
    }
});

router.get('/auth', auth, (req, res) => {
    // to check if that token is valid or not
    res.send(req.user);
})

module.exports = router;