import React, { Component } from 'react'
import Employee from './Employee'

export default class EmployeeList extends Component {
    render() {
        let { employees, loading, removeEmployee, editEmployee } = this.props;
        return (
            loading ?
                <div>
                    loading
                </div>
                :
                <div className='employee-list-wrapper'>
                    <div className='employee-information-categories-container'>
                        <div className='employee-information-category'>Employee Id</div>
                        <div className='employee-information-category'>First Name</div>
                        <div className='employee-information-category'>Last Name</div>
                        <div className='employee-information-category'>Phone Number</div>
                        <div className='employee-information-category'>Email Address</div>
                        <div className='employee-information-category'></div>
                    </div>
                    {employees.map((employee, index) => {
                        return <Employee key={index + employee.firstName}{...employee} editEmployee={editEmployee} removeEmployee={removeEmployee} />
                    })}
                </div>
        )
    }
}
