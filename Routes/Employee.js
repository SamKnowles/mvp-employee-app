const express = require('express');
const employeeRoute = express.Router();
const Employees = require('../models/Employees')

employeeRoute.route('/')
    .get((req, res) => {
        let query = {};
        Employees.find(query, (err, employees) => {
            if (err) return res.status(500).send(err);
            return res.send(employees);
        });
    })

    .post((req, res) => {
        let newEmployee = new Employee(req.body);
        newEmployee.save((err) => {
            if (err) return res.status(500).send(err);
            return res.send(newEmployee);
        });
    })

employeeRoute.route('/:id')
    .get((req, res) => {
        Employees.findById(req.params.id, (err, employee) => {
            if (err) return res.status(500).send(err);
            return res.send(employee);
        })
    })

    .delete((req, res) => {
        Employees.findByIdAndRemove(req.params.id, (err, deletedEmployee) => {
            if (err) return res.status(500).send(err);
            return res.send(deletedEmployee);
        });
    })
    .put((req, res) => {
        Employees.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedEmployee) => {
            if (err) return res.status(500).send(err);
            return res.send(updatedEmployee);
        })
    });

module.exports = employeeRoute;
