const mongoose = require('mongoose');
const validator = require('validator');

let SportSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    type:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"SportType"
    },
    followers:[{
        type:mongoose.Schema.Types.ObjectId
    }],
    description: {
        type:String
    }
})


let Sport = mongoose.model('Sport', SportSchema);

module.exports = {
    Sport
}