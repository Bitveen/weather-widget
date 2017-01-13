const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    login: {
        type: String,
        unique: true
    },
    password: String,
    widgets: [
        {
            title: String,
            city: String,
            days: Number,
            layout: String
        }
    ]
});


userSchema.plugin(passportLocalMongoose, { usernameField: 'login' });

module.exports = mongoose.model('User', userSchema);
