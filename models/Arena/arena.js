const mongoose = require('mongoose');


let ArenaSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    followers: [{
        type: mongoose.Schema.Types.ObjectId
    }],
    description: {
        type: String
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    phoneNo: [{
        type: String,
        minlength: 8,
        required: [true, 'Please enter your Mobile No.'],
        trim: true
    }],
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
    imgGallery: [{
        data: Buffer,
        contentType: String,
        ref: 'Gallery'
    }],
    serviceTime: [{
        startTime: {
            type: String,
            required: true
        },
        endTime: {
            type: String,
            required: true
        }
    }],
    tarrif: {
        type: Number,
        required: true
    }
});

let Arena = mongoose.model('Arena', ArenaSchema);

module.exports = {
    Arena
};