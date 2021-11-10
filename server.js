const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const colors = require('colors');
const vendingMachines = require('./routes/vendingMachines');
const morgan = require('morgan'); // Middleware to log details
const User = require('./config/firebase'); //user collection from db
const errorHandler = require('./middleware/error');

//Load env variables from specified path
dotenv.config({path:"./config/config.env"});

const app = express();
//Application/json parser
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

app.use('/api/vendingMachines',vendingMachines)
app.use(errorHandler);
const PORT = process.env.PORT|| 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} in ${process.env.NODE_ENV} mode`.yellow.bold);
});
