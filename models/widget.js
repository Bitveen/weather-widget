const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const widgetSchema = new Schema({
    title: String,
    city: String,
    days: Number,
    layout: String,
    userId: ObjectId
});


module.exports = mongoose.model('Widget', widgetSchema);
