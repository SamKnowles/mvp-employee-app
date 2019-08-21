import React, { Component } from 'react'
import axios from 'axios'
import EmployeeList from './EmployeeList'

const employeeUrl = '/employee'

export default class EmployeeForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputs: {
                firstName: '',
                lastName: '',
                emailAddress: '',
                phoneNumber: '',
                employeeId: ''
            },
            employees: [],
            loading: true
        }
    }

    componentDidMount = () => {
        axios.get(employeeUrl)
            .then(response => {
                this.setState({
                    employees: response.data,
                    loading: false
                });
            })
            .catch(err => {
                console.error(err);
            });
    }

    removeEmployee = (_id) => {
        let { employees } = this.state;
        axios.delete(employeeUrl + '/' + _id)
            .then(response => {
                this.setState({
                    employees: employees.filter((employee, index) => {
                        return employee._id !== _id
                    }),
                    loading: false
                })
            })
            .catch(err => {
                console.error(err);
            })
    }

    getEmployees = () => {
        axios.get(employeeUrl)
            .then(response => {
                this.setState({
                    employees: response.data
                })
            })
            .catch(err => {
                console.error(err);
            });
    }

    handleChange = (e) => {
        let { name, value } = e.target;
        this.setState(prevState => {
            return {
                inputs: {
                    ...prevState.inputs,
                    [name]: value
                }
            }
        });
    }

    handleSubmit = (e) => {
        let employee = this.state.inputs;
        e.preventDefault();
        axios.post(employeeUrl, employee)
            .then(response => {
                this.setState(prevState => ({
                    employees: [...prevState.employees, response.data],
                    loading: false
                }));
            })
            .catch(err => {
                console.error(err);
            });
        this.clearInputs();
    }

    clearInputs() {
        this.setState({
            inputs: {
                firstName: '',
                lastName: '',
                emailAddress: '',
                phoneNumber: '',
                employeeId: ''
            }
        })
    }


    render() {
        let { firstName, lastName, emailAddress, phoneNumber, employeeId } = this.state.inputs;
        let { employees, loading } = this.state;
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input onChange={this.handleChange} name='firstName' value={firstName} type="text" placeholder='First Name' />
                    <input onChange={this.handleChange} name='lastName' value={lastName} type="text" placeholder='Last Name' />
                    <input onChange={this.handleChange} name='emailAddress' value={emailAddress} type="text" placeholder='Email Address' />
                    <input onChange={this.handleChange} name='phoneNumber' value={phoneNumber} type="text" placeholder='Phone Nubmber' />
                    <input onChange={this.handleChange} name='employeeId' value={employeeId} type="text" placeholder='Employee Id' />
                    <button onClick={this.handleSubmit}>SUBMIT</button>
                </form>
                <EmployeeList className='test' loading={loading} employees={employees} removeEmployee={this.removeEmployee} editEmployee={this.editEmployee} />
            </div>
        )
    }
}
