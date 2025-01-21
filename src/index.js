require('dotenv').config();
const express = require('express');
const logger = require('./config/logger');
const  cors  = require('cors');
const connectDB = require('./config/database');
const appointmentRoutes = require('./routes/appointments');
const errorHandler = require('./middleware/errorHandler');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const helmet = require('helmet');

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(cors());
app.use(express.json());
app.use(helmet());



app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.use('/api/appointments', appointmentRoutes);

app.use(errorHandler);

app.listen(PORT, function(){
    logger.info(`Server running on port ${PORT}`);
    logger.info(`API Documentation available at http://localhost:${PORT}/api-docs`);
});
