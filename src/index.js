require('dotenv').config();
const express = require('express');
const logger = require('./config/logger');
const  cors  = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, function(){
    console.log(`Server running on port ${PORT}`);
});
