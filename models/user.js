const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    login: {
        type: String,
        unique: true
    },
    password: String
});


userSchema.plugin(passportLocalMongoose, { usernameField: 'login' });

module.exports = mongoose.model('User', userSchema);
