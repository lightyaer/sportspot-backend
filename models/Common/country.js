const mongoose = require('mongoose');
const validator = require('validator');

let CountrySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    }
})


let Country = mongoose.model('Country', CountrySchema);

module.exports = {
    Country
}