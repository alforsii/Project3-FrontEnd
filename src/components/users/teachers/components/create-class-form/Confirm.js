import React, { Component } from 'react'
import {AUTH_CLASSES} from '../../../../../services/classesAuth/ClassesAuth'
import Loader from '../../../../messageBoard/components/loader/Loader'


export default class Confirm extends Component {
    state = {
        isLoading: false,
        message: ''
    }
    //proceed next step
    handleSubmit = async (e) => {
        e.preventDefault()
       try {
        const {form, setState} = this.props
        this.setState({isLoading: true, message: 'Creating a new class.Please wait, it may take few minutes...'})
        
        const newFile = new FormData()
        newFile.append('image', form.image)
        newFile.append('name', form.name)
        newFile.append('grade', form.grade)
        newFile.append('description', form.description)

        await AUTH_CLASSES.createClass(newFile)
        //set current state
        this.setState({isLoading: false})
        //set parent state
        setState({
            createForm: {
                    name: '',
                    grade: '',
                    image: '',
                    description: ''
             }
        })

        //redirect to the origin page
          this.props.history.push('/teachers-page')

       } catch (error) {
        this.setState({isLoading: false, message:'Sorry something went wrong. Try again later!'})
       }
    }

    render() {
        const {form: {name,grade,image,description}, prevStep} = this.props

        return <form className='user-form confirm-page' encType="multipart/form-data">
            {this.state.isLoading?<Loader message={this.state.message}/>
            :  <>
               <h2>Confirm & Continue</h2>
                
                <label><span>Name: </span> <span>{name} </span>

                </label>

                <label><span>Grade: </span> <span>{grade}</span>

                </label>

                <label><span>Image: </span><span>{image.name}</span>

                </label>

                <label><span>Description: </span><span>{description} </span>

                </label>

                <div>
                    <button className='form-btn back-btn' onClick = {prevStep}>Go Back</button>
                    <button className='form-btn' onClick={this.handleSubmit} type='submit'>Confirm & Continue</button>
                    <p> {this.state.message} </p>
                </div>

               </>
        }
            </form>
          
        
    }
       
}