const { Schema } = require('mongoose');
// import mongoose from 'mongoose';
const mongoose = require('mongoose');

const UserSchema = new Schema({
    name : {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    // date:{
    //     type: date.now
    // },
});

UserValidate =  mongoose.model('user', UserSchema);
// UserValidate.createIndexes();
module.exports = UserValidate