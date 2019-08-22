import React, { useState, useEffect } from 'react'
import axios from 'axios'
import EmployeeList from './EmployeeList'

const employeeUrl = '/employee'

export default function EmployeeForm(props) {

    const [inputs, setInputs] = useState({
        firstName: '',
        lastName: '',
        emailAddress: '',
        phoneNumber: '',
        employeeId: ''
    })
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(employeeUrl)
            .then(response => {
                setEmployees(response.data)
                setLoading(false)
            })
            .catch(err => {
                console.error(err);
            });
    });

    const removeEmployee = (_id) => {
        axios.delete(employeeUrl + '/' + _id)
            .then(response => {
                setEmployees(prevEmployees => {
                    return prevEmployees.filter(employee => {
                        return employee._id !== _id
                    })
                })
                setLoading(false)
            })
            .catch(err => {
                console.error(err);
            })
    }

    const editEmployee = (_id, updatedEmployee) => {

        axios.put(employeeUrl + '/' + _id, updatedEmployee)
            .then(response => {
                for (let i = 0; i < employees.length; i++) {
                    if (employees[i]._id === _id) {
                        employees[i] = Object.assign(employees[i], updatedEmployee);
                    }
                }
                setEmployees(employees)
            })

    }

    // const getEmployees = () => {
    //     axios.get(employeeUrl)
    //         .then(response => {
    //             setEmployees(response.data)
    //         })
    //         .catch(err => {
    //             console.error(err);
    //         });
    // }

    const handleChange = (e) => {
        let { name, value } = e.target;
        setInputs(prevInputs => {
            return {
                ...prevInputs,
                [name]: value
            }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(employeeUrl, inputs)
            .then(response => {
                setEmployees(prevEmployees => {
                    return [...prevEmployees, response.data]
                })
            })
            .catch(err => {
                console.error(err);
            });
        clearInputs();
    }

    const clearInputs = () => {
        setInputs({
            firstName: '',
            lastName: '',
            emailAddress: '',
            phoneNumber: '',
            employeeId: ''
        })
    }

    let { firstName, lastName, emailAddress, phoneNumber, employeeId } = inputs;
    return (
        <div>
            <div className='employee-form-section-wrapper'>
                <div className='title-wrapper'>mvp-employee-app</div>
                <div className='tag-inputs-button-form-wrapper'>
                    <div className='new-employee-form-tags-wrapper'>
                        <div className='employee-form-tag'>First Name:</div>
                        <div className='employee-form-tag'>Last Name:</div>
                        <div className='employee-form-tag'>Email Address:</div>
                        <div className='employee-form-tag'>Phone Number:</div>
                        <div className='employee-form-tag'>Employee Id:</div>
                    </div>
                    <form className='new-employee-form-wrapper' onSubmit={handleSubmit}>
                        <input onChange={handleChange} name='firstName' value={firstName} type="text" placeholder='' />
                        <input onChange={handleChange} name='lastName' value={lastName} type="text" placeholder='' />
                        <input onChange={handleChange} name='emailAddress' value={emailAddress} type="text" placeholder='' />
                        <input onChange={handleChange} name='phoneNumber' value={phoneNumber} type="text" placeholder='' />
                        <input onChange={handleChange} name='employeeId' value={employeeId} type="text" placeholder='' />
                    </form>
                    <button className='add-employee-button' onClick={handleSubmit}>Add Employee</button>
                </div>
            </div>
            <EmployeeList className='test' loading={loading} employees={employees} removeEmployee={removeEmployee} editEmployee={editEmployee} />
        </div>
    )

}
