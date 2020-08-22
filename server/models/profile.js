const mongoose = require('mongoose');

const profileSchema = mongoose.Schema({
    name:{
        type: String
    },
    email:{
        type: String,
        required: true
    },
    file_orgname: {
        type: String
    },
    file_url: {
        type: String
    },
    file_name: {
        type: String
    }

});

module.exports = mongoose.model('contactcard', profileSchema);