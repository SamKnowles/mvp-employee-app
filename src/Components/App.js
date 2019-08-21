import React from 'react'
import EmployeeForm from './EmployeeForm'

import '../Styles/style.css'


function App(props) {
    return (
        <div className='app-wrapper'>
            <div className='app-header-wrapper'>
                <div className='app-title'></div>
                <div className='add-employee-button'></div>
            </div>
            <EmployeeForm />
        </div>
    )
}

export default App
