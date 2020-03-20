import React, { Component } from 'react'

export default class FormUserDetails extends Component {
    
    render() {
        const {user: {firstName, lastName, email, password}, message, handleChange, nextStep} = this.props
        return (
            <div className='user-form'>
                <h2>Enter User Details</h2>

                <label> First name
                    </label>
                <input className='form-input'
                placeholder={message? message : 'First name'}
                name='firsName'
                type='text'
                onChange={handleChange('firstName')}
                defaultValue={firstName}
                />

                <label>Last name
                    </label>
                <input className='form-input'
                placeholder={message? message : 'Last name'}
                name='lastName'
                type='text'
                onChange={handleChange('lastName')}
                defaultValue={lastName}
                />

                <label>Email
                    </label>
                <input className='form-input'
                placeholder={message? message : 'Email'}
                name='email'
                type='email'
                onChange={handleChange('email')}
                defaultValue={email}
                />

                <label>Password
                    </label>
                <input className='form-input'
                placeholder={message? message : 'password'}
                name='password'
                type='password'
                onChange={handleChange('password')}
                defaultValue={password}
                />

                <div>
                <button className='form-btn' onClick = {nextStep}>Continue</button>
                </div>

            </div>
        )
    }
       
}
