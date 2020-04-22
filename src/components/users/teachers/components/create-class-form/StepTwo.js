import React from 'react'

export const StepTwo = (props) => {
    
        const { form: { image, description}, handleChange, nextStep, prevStep} = props
        return (
                    <div className='user-form'>
                        <h2>Add description or skip</h2>
                        <img className='cover-image-md' src={image? image:'/images/school-class.jpg'} alt='' />
                        <i>You can upload or update the cover image in the class section*</i>
                        {/* <label htmlFor='image'>Select cover image
                            </label> */}
                        {/* <input 
                        type='file'
                        name='image'
                        onChange={props.handleImageChange}
                        /> */}

                        <label htmlFor='description'>Add description of your class:
                            </label>
                        <textarea className='form-input'
                        id='description'
                        name='description'
                        placeholder='Enter description(optional)'
                        type='text'
                        onChange={handleChange}
                        defaultValue={description}
                        ></textarea>
                        <div>
                            <button className='form-btn back-btn' onClick = {prevStep}>Go Back</button>
                            <button className='form-btn' onClick = {nextStep}>Continue</button>
                        </div>
                    </div>
        )
    }

    export default StepTwo