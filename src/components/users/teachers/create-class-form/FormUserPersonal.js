import React, { Component } from 'react'

export default class FormUserPersonal extends Component {
    
    render() {
        const {user: {city,occupation,bio},handleChange, nextStep, prevStep} = this.props
        return (
                    <div className='user-form'>
                        <h2>Enter User Personal</h2>

                        <label>City:
                            </label>
                        <input className='form-input'
                        placeholder='Enter Your City'
                        type='city'
                        onChange={handleChange('city')}
                        defaultValue={city}
                        />

                        <label>Occupation:
                            </label>
                        <input className='form-input'
                        placeholder='Enter Your Occupation'
                        type='occupation'
                        onChange={handleChange('occupation')}
                        defaultValue={occupation}
                        />

                        <label>Bio:
                            </label>
                        <input className='form-input'
                        placeholder='Enter Your Bio'
                        type='bio'
                        onChange={handleChange('bio')}
                        defaultValue={bio}
                        />

                        <div>
                            <button className='form-btn back-btn' onClick = {prevStep}>Go Back</button>
                            <button className='form-btn' onClick = {nextStep}>Continue</button>
                        </div>
                    </div>
        )
    }
       
}
