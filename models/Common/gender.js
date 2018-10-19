const mongoose = require('mongoose');


let GenderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});


let Gender = mongoose.model('Gender', GenderSchema);

module.exports = {
    Gender
};