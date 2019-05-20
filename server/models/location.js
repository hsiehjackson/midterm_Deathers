const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LocationSchema = new Schema({
    text:{
        type:String,
        required:[true,"text is required"]
    }
})

Location = mongoose.model('location',LocationSchema);
module.exports = Location;

