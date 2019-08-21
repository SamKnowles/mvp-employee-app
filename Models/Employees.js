const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    employeeId: String,
    firstName: String,
    lastName: String,
    emailAddress: String,
    phoneNumber: String
})

module.exports = mongoose.model('EmployeeModel', EmployeeSchema);