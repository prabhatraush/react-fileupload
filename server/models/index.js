const mongoose = require('mongoose');
require('dotenv').config();

const url = process.env.MONGO_URL;
const Options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
};

mongoose.connect(url, Options);

const db = mongoose.connection;

db.once('open',()=>{
    console.log('db connected');
}).on('error',(err)=>{
    console.log('Some error occured', err);
});