const express = require('express');
const cors = require('cors');

const routes = require('./routes');
require('./models');

const app = express();

app.use(cors()).use(express.urlencoded({extended: 'false'})).use(express.json()).use(routes);

app.listen(process.env.PORT || 4000,()=>{
    console.log("Server started");
});
