const mongoose = require('mongoose');
const validator = require('validator');

let GenderSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    }
})


let Gender = mongoose.model('Gender', GenderSchema);

module.exports = {
    Gender
}