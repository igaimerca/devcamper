const express = require('express')
const dotenv = require('dotenv')
const logger = require('./middleware/logger')
const morgan = require('morgan')
const colors = require('colors')
//Load env variables
dotenv.config({ path: './config/config.env' });

//mongodb
const connectDB = require("./config/db");
connectDB();

//Route files
const bootcamps = require('./routes/bootcamps');


const app = express();
//Body parser
app.use(express.json());
// app.use(logger);

if (process.env.NODE_ENV === "development") {
    app.use(morgan('dev'));
}

// Mount routers
app.use('/api/v1/bootcamps', bootcamps);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`App is running on port ${PORT}`))
