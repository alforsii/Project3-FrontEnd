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
        const {form, setState, currClass} = this.props
        // const newFile = new FormData()
        // newFile.append('image', form.image)
        // newFile.append('name', form.name)
        // newFile.append('grade', form.grade)
        // newFile.append('description', form.description)
        // newFile.append('schoolYearStart', form.schoolYearStart)
        // newFile.append('schoolYearEnd', form.schoolYearEnd)
        // await AUTH_CLASSES.createClass(newFile)
       if(currClass){
        this.setState({ isLoading: true, message: 'Updating details! Please wait, it may take a moment...' })
        await AUTH_CLASSES.updateClass( currClass._id, form)
       }else {
        this.setState({ isLoading: true, message: 'Creating a new class.Please wait, it may take a moment...' })
        await AUTH_CLASSES.createClass(form)
       }
        //set current state
        this.setState({isLoading: false})
        //set parent state
        setState({
            createForm: {
                    name: '',
                    grade: '',
                    image: '',
                    description: '',
                    schoolYearStart: '',
                    schoolYearEnd: '',
             }
        })

        //redirect to the origin page
          this.props.history.push('/dashboard')

       } catch (error) {
        this.setState({isLoading: false, message:'Sorry something went wrong. Try again later!'})
       }
    }

    render() {
        const {form: {name,grade,description}, prevStep} = this.props

        return(
            <React.Fragment>
            {this.state.isLoading? <div className='' style={{position: 'fixed', left: '10%', display: 'initial'}}>
                <Loader message={this.state.message}/>
            </div>
             :<>
            <form className='user-form confirm-page' encType="multipart/form-data">
               <h2>Confirm & Continue</h2>
                
                <label><span>Name: </span> <span>{name} </span>

                </label>

                <label><span>Grade: </span> <span>{grade}</span>

                </label>

                {/* <label><span>Image: </span><span>{this.props.image.name}</span>

                </label> */}

                <label><span>Description: </span><span>{description} </span>

                </label>

                <div>
                    <button className='form-btn back-btn' onClick = {prevStep}>Go Back</button>
                    <button className='form-btn' onClick={this.handleSubmit} type='submit'>Confirm & Continue</button>
                    <p> {this.state.message} </p>
                </div>

            </form>
               </>
        }
          
            </React.Fragment>
        )
        
    }
       
}