const mongoose = require('mongoose');


let StateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    countryID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Country'
    }
});


let State = mongoose.model('State', StateSchema);

module.exports = {
    State
};