import React, { Component } from 'react'

export default class Employee extends Component {
    constructor(props) {
        super(props);
        let { employeeId, firstName, lastName, emailAddress, phoneNumber } = props;
        this.state = {
            isEditing: false,
            inputs: {
                firstName: firstName || '',
                lastName: lastName || '',
                emailAddress: emailAddress || '',
                phoneNumber: phoneNumber || '',
                employeeId: employeeId || '',
            }
        }
    }

    handleChange = () => {
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

    handleSubmit = () => {
        e.preventDefault();
        let updatedEmployee = this.state.inputs;
        let id = this.props._id;
        this.props.editEmployee(id, updatedEmployee);
        this.toggleEdit();
    }

    toggleEdit = () => {
        this.setState({
            isEditing: !this.state.isEditing
        })
    }

    render() {
        let { employeeId, firstName, lastName, emailAddress, phoneNumber } = this.state.inputs;
        let { removeEmployee, _id } = this.props;
        return (
            this.state.isEditing? 
            <div>
                <form action="">
                    <input type="text" onChange={this.handleChange} name='employeeId' value={employeeId}/>
                    <input type="text" onChange={this.handleChange} name='firstName' value={firstName}/>
                    <input type="text" onChange={this.handleChange} name='lastName' value={lastName}/>
                    <input type="text" onChange={this.handleChange} name='emailAddress' value={emailAddress}/>
                    <input type="text" onChange={this.handleChange} name='phoneNumber' value={phoneNumber}/>
                    <button onClick={this.toggleEdit}>Cancel</button><button onClick={this.handleSubmit}>Submit</button>
                </form>
            </div>
            :
            <div>
                <h2>{`${firstName} ${lastName}`}</h2>
                <h2>Employee Id: {employeeId}</h2>
                <h2>Phone Number: {phoneNumber}</h2>
                <h2>Email Address: {emailAddress}</h2>
                <button onClick={this.toggleEdit}>Edit</button>
                <button onClick={() => {removeEmployee(_id) }}>X</button>
            </div>
        )
    }
}
