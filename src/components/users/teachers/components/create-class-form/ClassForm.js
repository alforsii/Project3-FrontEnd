import React, { Component } from 'react'
import StepOne from './StepOne'
import StepTwo from './StepTwo'
import Confirm from './Confirm'
import './ClassForm.css'



export default class UserForm extends Component {
    state = {
        step: 1,
        currClass: this.props.location.state?.currClass,
        createForm: {
            name: this.props.location.state?.currClass.name,
            grade: this.props.location.state?.currClass.grade,
            schoolYearStart: this.props.location.state?.currClass.schoolYearStart,
            schoolYearEnd: this.props.location.state?.currClass.schoolYearEnd,
            image: this.props.location.state?.currClass.path,
            description: this.props.location.state?.currClass.description,
          },
        message: ''
    }

    //proceed next step
    nextStep = () => {
        
        const { step, createForm:{ name, grade, schoolYearStart, schoolYearEnd} } = this.state
        if(!name || !grade || !schoolYearStart || !schoolYearEnd){
            this.setState({
                message: 'Please fill all inputs'
            })
        } else {
                this.setState({
                    step: step + 1,
                    message: ''
                })
        }
    }
    prevStep = () => {
        const { step } =this.state
        this.setState({
            step: step - 1
        })
    }

    handleChange = e => {
        const { name, value} = e.target
        this.setState(prevState => ({
          createForm: {
            ...prevState.createForm,
            [name]: value
          }
        }))
    }
    // handleImageChange = e => {
    //     const { files } = e.target;
    //     this.setState(prevState => ({
    //         createForm: {
    //           ...prevState.createForm,
    //           image: files[0]
    //         }
    //       }))
    // }
    render() {
       const { step, createForm, message, currClass } = this.state
       // eslint-disable-next-line 
        switch(step){
            case 1:
                return (
                    <div className='main-user-form'>
                        <StepOne form={createForm} 
                        handleChange={this.handleChange} 
                        message={message}
                        nextStep={this.nextStep} />
                    </div>
                    )
            case 2:
                return (
                    <div className='main-user-form'>
                        <StepTwo  form={createForm} 
                        handleChange={this.handleChange}
                        // handleImageChange={this.handleImageChange}
                        nextStep={this.nextStep} 
                        message={message}
                        prevStep={this.prevStep} />
                    </div>
                    )
            case 3:
                return (
                    <div className='main-user-form'>
                        <Confirm  form={createForm}
                         currClass={currClass}
                        handleChange={this.handleChange}
                         nextStep={this.nextStep} 
                         prevStep={this.prevStep}
                         message={message}
                         {...this.props}
                         setState={ prevState => this.setState(prevState)} />
                    </div>
                )
          
        }
    }
}
