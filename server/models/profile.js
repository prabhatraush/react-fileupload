const mongoose = require('mongoose');

const profileSchema = mongoose.Schema({
    name:{
        type: String
    },
    email:{
        type: String,
        required: true
    },
    filename: {
        type: String
    }
});

module.exports = mongoose.model('contactcard', profileSchema);