const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if(value.toLowerCase().includes('password')) {
                throw new Error('Password cannot be password')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if(value<0) {
                throw new Error('Let age be +ve')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

// creating methods in schema used by mongoose documents
userSchema.methods.generateAuthToken = async function() {
    const user = this;
    console.log("TOKEN : ", user);
    const token = jwt.sign({_id: user._id.toString()}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
    user.tokens = user.tokens.concat({token});
    console.log("TOKEN : ", token);
    await user.save();
    return token;
};

userSchema.statics.findByCredentials = async function(userData) {
    const {email, password} = userData;
    const user = await User.findOne({email: email, password: password});
    if(!user) {
        res.send("Unable to login");
    }
    return user;
}


const User = mongoose.model('User', userSchema)
module.exports = User