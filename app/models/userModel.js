const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please add the user name'],
    },
    email: {
        type: String,
        required: [true, 'Please add user email address'],
        unique: [true, 'Email address already taken'],
    },
    password: {
        type: String,
        required: [true, 'Please add the user password'],
    },
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);
module.exports = User;

//module.exports = mongoose.model('User', userSchema);