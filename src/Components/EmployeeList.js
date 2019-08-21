import React, { Component } from 'react'
import Employee from './Employee'

export default class EmployeeList extends Component {
    render() {
        let {employees, loading, removeEmployee, editEmployee} = this.props;
        return (
            loading ? 
            <div>
                loading
            </div>
            :
            <div>
                {employees.map((employee, index) => {
                    return <Employee key={index + employee.firstName}{...employee} editEmployee={editEmployee} removeEmployee={removeEmployee} />
                })}
            </div>
        )
    }
}
