const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const errorHandler = require('./middleware/error')
const colors = require('colors')

//Load env variables
dotenv.config({ path: './config/config.env' });

//mongodb
const connectDB = require("./config/db");
connectDB();

//Route files
const bootcamps = require('./routes/bootcamps');
const auth = require('./routes/auth')

const app = express();
//Body parser
app.use(express.json());

//cookie parser
app.use(cookieParser())


// app.use(logger);

if (process.env.NODE_ENV === "development") {
    app.use(morgan('dev'));
}

// Mount routers
app.use('/api/v1/bootcamps', bootcamps);
app.use('/api/v1/auth', auth)
//User errorHandler as a middleware
app.use(errorHandler)


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`App is running on port ${PORT}`))
