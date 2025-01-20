require('dotenv').config();
const express = require('express');
const logger = require('./config/logger');
const  cors  = require('cors');
const connectDB = require('./config/database');
const appointmentRoutes = require('./routes/appointments');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/appointments', appointmentRoutes);

app.use(errorHandler);

app.listen(PORT, function(){
    console.log(`Server running on port ${PORT}`);
});
