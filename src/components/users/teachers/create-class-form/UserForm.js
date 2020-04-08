import React, { Component } from 'react'
import FormUserDetails from './FormUserDetails'
import FormUserPersonal from './FormUserPersonal'
import Confirm from './Confirm'
import Success from './Success'
import './UserForm.css'


export default class UserForm extends Component {
    state = {
        step: 1,
        users: [],
        user: [{id: '', firstName: '', lastName: '', password: '', email: '', occupation: '', city: '', bio:'' }],
        message: ''
    }

    //proceed next step
    nextStep = (e) => {
        
        const { step, user:{ firstName, lastName} } = this.state
        if(firstName !== '' && lastName !==''){
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

    handleChange = input => e => {
    console.log("Output for: UserForm -> input", input)
        const { value } = e.target
        const { user } = this.state
        const updateUser = [...user][0]
        updateUser[input] = value
        this.setState({
            user: [updateUser]
        })
    }
    render() {
       const { step, user, users, message } = this.state
       // eslint-disable-next-line 
        switch(step){
            case 1:
                return (
                    <div className='main-user-form'>
                        <FormUserDetails user={user[0]} 
                        handleChange={this.handleChange} 
                        message={message}
                        nextStep={this.nextStep} />
                    </div>
                    )
            case 2:
                return (
                    <div className='main-user-form'>
                        <FormUserPersonal  user={user[0]} 
                        handleChange={this.handleChange}
                        nextStep={this.nextStep} 
                        message={message}
                        prevStep={this.prevStep} />
                    </div>
                    )
            case 3:
                return (
                    <div className='main-user-form'>
                        <Confirm  user={user[0]} users={users}
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
                        <Success  user={user[0]} setState={ prevState => this.setState(prevState)} users={users}/>
                    </div>
                )
          
        }
    }
}
