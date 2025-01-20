const mongoose = require('mongoose');
const logger = require('./logger');


const connectDB = async function(){
    try{
        await mongoose.connect(process.env.MONGODB_URL)
        const db = mongoose.connection;
        logger.info("Connected to MongoDB");

        db.on("error", function(error){
            logger.error("Runtime error occured:", error);
        });
    }catch(error){
        logger.error("Error connecting to MongoDB", error);
        process.exit(1);
    }
}


module.exports = connectDB;
