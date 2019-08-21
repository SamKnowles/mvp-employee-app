const express = require('express');
const bodyParser = require('body-parser');
const employeeRoute = require('./routes/employee');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://localhost:27017/employees', (err) => {
    if (err) throw err;
    console.log('Congratulations! You are connected to the backend!');
})

//port
const config = require('./config')

//middlewre
app.use(bodyParser.json());
app.use(cors());

//routes
app.use('/employee', employeeRoute);

//runapp
app.listen(config.port, () => {
    console.log('Listening on port ' + config.port)
})