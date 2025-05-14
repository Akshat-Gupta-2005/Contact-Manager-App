const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    name: {
        type: String,
        required: [true, 'Please add the contact name'],
    },
    email: {
        type: String,
        required: [true, 'Please add contact email address'],
    },
    phone: {
        type: String,
        required: [true, 'Please add the contact phone number'],
    },
}, {
    timestamps: true,
});

/*
1. Defines the Model Name
'Contact' becomes the model name you use throughout your app to interact with the collection.
Contact (the variable) will give you access to Mongoose's methods like .find(), .create(), .updateOne(), etc., for that schema.

2. Determines the Collection Name in MongoDB
Mongoose automatically pluralizes and lowercases the model name to determine the MongoDB collection name.
*/

const Contact = mongoose.model('Contact', contactSchema);
module.exports = Contact;