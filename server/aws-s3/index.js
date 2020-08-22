const AWS = require('aws-sdk');
require('dotenv').config();

const S3 = new AWS.S3({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    region: "us-east-2"
})

module.exports = S3;