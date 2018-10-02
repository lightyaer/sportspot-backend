const mongoose = require('mongoose');
const validator = require('validator');

let CitySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    stateID: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Country'
    },
})


let City = mongoose.model('City', CitySchema);

module.exports = {
    City
}