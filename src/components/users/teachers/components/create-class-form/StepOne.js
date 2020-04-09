import React, { Component } from 'react'

export default class FormUserDetails extends Component {
    
    render() {
        const {form: {name, grade}, message, handleChange, nextStep} = this.props
        return (
            <div className='user-form'>
                <h2>Enter Class name & grade</h2>

                <label htmlFor='name'> Name
                    </label>
                <input className='form-input'
                placeholder={message? message : 'Enter name'}
                name='name'
                id='name'
                type='text'
                onChange={handleChange}
                defaultValue={name}
                />

                <label htmlFor='grade'>Grade
                    </label>
                <input className='form-input'
                placeholder={message? message : 'Enter grade'}
                name='grade'
                id='grade'
                type='text'
                onChange={handleChange}
                defaultValue={grade}
                />
                <div>
                <button className='form-btn' onClick = {nextStep}>Continue</button>
                </div>

            </div>
        )
    }
       
}
