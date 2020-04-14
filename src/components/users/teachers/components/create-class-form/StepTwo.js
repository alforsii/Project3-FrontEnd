import React, { Component } from 'react'

export default class FormUserPersonal extends Component {
    
    render() {
        const {form: { description}, handleChange, handleImageChange, nextStep, prevStep} = this.props
        return (
                    <div className='user-form'>
                        <h2>Upload class cover image & description or skip</h2>

                        <label htmlFor='image'>Select cover image
                            </label>
                        <input 
                        type='file'
                        name='image'
                        onChange={handleImageChange}
                        ref={fInput => this.fileInput = fInput}
                        />

                        <label htmlFor='description'>Description:
                            </label>
                        <input className='form-input'
                        id='description'
                        name='description'
                        placeholder='Enter description'
                        type='text'
                        onChange={handleChange}
                        defaultValue={description}
                        />
                        <div>
                            <button className='form-btn back-btn' onClick = {prevStep}>Go Back</button>
                            <button className='form-btn' onClick = {nextStep}>Continue</button>
                        </div>
                    </div>
        )
    }
       
}
