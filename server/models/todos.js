const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodosSchema = new Schema({
    complete:{
        type:Boolean,
        default:false
    },
    text:{
        type:String,
        required:[true,"text is required"]
    },
    date:{
        type:Date,
        required:[true,"date is required"]
    },
    time:{
        type:String,
        required:[true,"date string is required"]
    }
})

Todos = mongoose.model('todos',TodosSchema);
module.exports = Todos;

