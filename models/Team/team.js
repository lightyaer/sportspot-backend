const mongoose = require('mongoose');
const validator = require('validator');

let TeamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    teamPic: {
        Data: Buffer,
        contentType: String
    },
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    cityID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    stateID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    countryID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }],
    createdDate: {
        type: String,
        required: true
    },
    interestedSports:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Sport'
    }],
    followers:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }],
    imgGallery:[{
        data: Buffer,
        contentType:String,
        ref:'Gallery'
    }]
})


let Team = mongoose.model('Team', TeamSchema);

module.exports = {
    Team
}