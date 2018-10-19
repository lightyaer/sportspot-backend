const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const _ = require('lodash');


const UserSchema = new mongoose.Schema({
    tokens: [{
        access: {
            type: String,
            required: true
            //expires:3600
        },
        token: {
            type: String,
            required: true
            //expires:3600
        }

    }],
    otpauth: {
        type: Boolean
        // expires:999999
    },
    email: {
        type: String,
        minlength: 6,
        required: [true, 'Please enter you Email'],
        trim: true,
        unique: [true, 'Email already Exists, Please Login'],
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }
    },
    password: {
        type: String,
        required: [true, 'Please enter your Password'],
        minlength: 6
    },
    profilePic: {
        type: Buffer,
        contentType: String
    },
    userName: {
        type: String,
        required: true,
        minlength: 2,
        trim: true
    },
    mobileNo: {
        type: String,
        minlength: 10,
        required: [true, 'Please enter your Mobile No.'],
        trim: true
    },
    bio: {
        type: String
    },
    dob: {
        type: String,
        required: true
    },
    genderID: {
        type: mongoose.Schema.Types.ObjectId,
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
    interestedSports: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sport'
    }],
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    teams: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team'
    }],
    imgGallery: [{
        data: Buffer,
        contentType: String,
        ref: 'Gallery'
    }]


});

UserSchema.methods.toJSON = function () {
    var user = this;
    var userObject = user.toObject();
    return _.pick(userObject, ['_id', 'email', 'userName', 'mobileNo', 'mobileNo', 'bio']);
};

UserSchema.methods.generateAuthToken = function () {
    var user = this;
    var access = 'auth';
    var token = jwt.sign({ _id: user._id.toHexString(), access }, process.env.JWT_SECRET).toString();
    user.tokens.push({ access, token });
    return user.save().then(() => {
        return token;
    });
};

UserSchema.statics.findByToken = function (token) {
    var User = this;
    var decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
        return User.findOne({
            '_id': decoded._id,
            'tokens.token': token,
            'tokens.access': 'auth'
        });
    }
    catch (e) {
        return Promise.reject();
    }
};

UserSchema.pre('save', function (next) {
    var user = this;
    if (user.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});

UserSchema.statics.findByCredentials = function (email, password) {
    var User = this;
    return User.findOne({ email }).then(user => {
        if (user.otpAuth && !user) {
            return Promise.reject();
        }

        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, hash) => {
                if (hash) {
                    resolve(user);
                } else {
                    reject();
                }
            });
        });
    });
};

UserSchema.methods.removeToken = function (token) {
    var user = this;
    return user.update({
        $pull: {
            tokens: { token }
        }
    });
};

let User = mongoose.model('User', UserSchema);

module.exports = {
    User
};