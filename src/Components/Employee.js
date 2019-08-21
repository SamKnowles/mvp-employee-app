import React, { useState } from 'react'

export default function Employee(props) {

    const [isEditing, setIsEditing] = useState(false)
    const [inputs, setInputs] = useState({
        firstName: props.firstName || '',
        lastName: props.lastName || '',
        emailAddress: props.emailAddress || '',
        phoneNumber: props.phoneNumber || '',
        employeeId: props.employeeId || '',
    })


    const handleChange = (e) => {
        let { name, value } = e.target;
        setInputs(prevState => {
            return {
                ...prevState,
                [name]: value
            }
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let updatedEmployee = inputs;
        let id = props._id;
        props.editEmployee(id, updatedEmployee);
        toggleEdit();
    }

    const toggleEdit = () => {
        setIsEditing((prevIsEditing) => {
            return !prevIsEditing;
        });
    }

    let { employeeId, firstName, lastName, emailAddress, phoneNumber } = inputs;
    let { removeEmployee, _id } = props;
    return (
        isEditing ?
            <div>
                <form action="">
                    <input type="text" onChange={handleChange} name='employeeId' value={employeeId} />
                    <input type="text" onChange={handleChange} name='firstName' value={firstName} />
                    <input type="text" onChange={handleChange} name='lastName' value={lastName} />
                    <input type="text" onChange={handleChange} name='emailAddress' value={emailAddress} />
                    <input type="text" onChange={handleChange} name='phoneNumber' value={phoneNumber} />
                    <button onClick={toggleEdit}>Cancel</button><button onClick={handleSubmit}>Submit</button>
                </form>
            </div>
            :
            <div className='employee-information-wrapper'>
                <div className='employee-information'>{lastName}</div>
                <div className='employee-information'>{firstName}</div>
                <div className='employee-information'>{employeeId}</div>
                <div className='employee-information'>{phoneNumber}</div>
                <div className='employee-information'>{emailAddress}</div>
                <div className='employee-information'>
                    <button onClick={toggleEdit}>Edit</button>
                    <button onClick={() => { removeEmployee(_id) }}>X</button>
                </div>
            </div>
    )

}
