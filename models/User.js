const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const md5 = require('md5');
const validator = require('validator');
const mongodbErrorHandlers = require('mongoose-mongodb-errors');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema ({
    email:{
        type:String,
        unique:true,
        lowercase: true,
        trim: true,
        validate:[validator.isEmail, 'not a valid email'],
        required: 'You need to enter an email'

    },
    name:{
        type: String,
        trim: true,
        required: 'You need to enter a name'
    },
    hearts:[
        {type: mongoose.Schema.ObjectId, ref:'Writing'}
    ]
})

userSchema.plugin(
    passportLocalMongoose, {usernameField:'email'}
)
userSchema.plugin( mongodbErrorHandlers
)
module.exports = mongoose.model('User', userSchema);