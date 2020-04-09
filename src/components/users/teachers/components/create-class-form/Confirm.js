import React, { Component } from 'react'
import {AUTH_CLASSES} from '../../../../../services/classesAuth/ClassesAuth'

export default class Confirm extends Component {
    //proceed next step
    handleSubmit = async (e) => {
        e.preventDefault()
        const {form, nextStep, setState} = this.props
        
        if(form.name !== '' && form.grade !== ''){
            const res = await AUTH_CLASSES.createClass(form)
            setState(prevState => ({
                users: [...prevState.users, res.data.class]
              }))

        }
        
        nextStep()
    }

    render() {
        const {form: {name,grade,image,description}, prevStep} = this.props
        return (
                    <form className='user-form confirm-page'>
                        <h2>Confirm & Continue</h2>
                        
                        <label><span>Name: </span> <span>{name} </span>

                        </label>

                        <label><span>Grade: </span> <span>{grade}</span>

                        </label>

                        <label><span>Image: </span><span>{image}</span>

                        </label>

                        <label><span>Description: </span><span>{description} </span>

                        </label>

                        <div>
                            <button className='form-btn back-btn' onClick = {prevStep}>Go Back</button>
                            <button className='form-btn' onClick={this.handleSubmit} type='submit'>Confirm & Continue</button>
                        </div>
                    </form>
          
        )
    }
       
}