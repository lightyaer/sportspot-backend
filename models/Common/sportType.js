const mongoose = require('mongoose');
const validator = require('validator');

let SportTypeSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    followers:[{
        type:mongoose.Schema.Types.ObjectId
    }],
    description: {
        type:String
    }
})


let SportType = mongoose.model('SportType', SportTypeSchema);

module.exports = {
    SportType
}