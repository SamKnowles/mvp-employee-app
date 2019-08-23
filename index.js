require("dotenv").config()
const express = require('express');
const bodyParser = require('body-parser');
const employeeRoute = require('./routes/employee');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5001;
const config = require('./config');
const path = require("path");
const app = express();

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/employees",
(err) => {
    if (err) throw err;
    console.log("Connected to Mongo");
});

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "client", "build")))

app.use('/employee', employeeRoute);

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(config.port, () => {
    console.log('Listening on port ' + config.port)
})