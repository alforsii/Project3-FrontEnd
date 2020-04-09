import React, { Component } from 'react'
import FormUserDetails from './StepOne'
import FormUserPersonal from './StepTwo'
import Confirm from './Confirm'
import Success from './ClassPage'
import './UserForm.css'


export default class UserForm extends Component {
    state = {
        step: 1,
        classes: [],
        createForm: {
            name: '',
            grade: '',
            image: '',
            description: ''
          },
        message: ''
    }

    //proceed next step
    nextStep = (e) => {
        
        const { step, createForm:{ name, grade} } = this.state
        if(name !== '' && grade !==''){
            this.setState({
                step: step + 1,
                message: ''
            })
        } else {
            this.setState({
                message: 'Please fill all inputs'
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
        console.log("Output for: UserForm -> name", name,value)
        this.setState(prevState => ({
          createForm: {
            ...prevState.createForm,
            [name]: value
          }
        }))
    }
    render() {
       const { step, createForm, classes, message } = this.state
       console.log("this.state", this.state)
       // eslint-disable-next-line 
        switch(step){
            case 1:
                return (
                    <div className='main-user-form'>
                        <FormUserDetails form={createForm} 
                        handleChange={this.handleChange} 
                        message={message}
                        nextStep={this.nextStep} />
                    </div>
                    )
            case 2:
                return (
                    <div className='main-user-form'>
                        <FormUserPersonal  form={createForm} 
                        handleChange={this.handleChange}
                        nextStep={this.nextStep} 
                        message={message}
                        prevStep={this.prevStep} />
                    </div>
                    )
            case 3:
                return (
                    <div className='main-user-form'>
                        <Confirm  form={createForm} classes={classes}
                        handleChange={this.handleChange}
                         nextStep={this.nextStep} 
                         prevStep={this.prevStep}
                         message={message}
                         setState={ prevState => this.setState(prevState)} />
                    </div>
                )
            case 4:
                return (
                    <div className='main-user-form'>
                        <Success  form={createForm} setState={ prevState => this.setState(prevState)} classes={classes}/>
                    </div>
                )
          
        }
    }
}
