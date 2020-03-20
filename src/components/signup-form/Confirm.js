import React, { Component } from 'react'

export default class Confirm extends Component {
    //proceed next step
    handleSubmit = (e) => {
        e.preventDefault()
        const {user, users, nextStep, setState} = this.props
        
        if(user.firstName !== '' && user.lastName !== ''){
            user.id = users.length + 1
            setState({ users: [...users, user]})
            console.log('submit')
        }
        // setState({
        //     user: [{ id:'', firstName: '', lastName: '', email: '', occupation: '', city: '', bio:''}]
        // })
        //process form
        nextStep()
    }

    render() {
        const {user: {firstName,lastName,email,city,occupation,bio}, prevStep} = this.props
        return (
                    <form className='user-form confirm-page'>
                        <h2>Confirm & Continue</h2>
                        
                        <label><span>First name: </span> <span>{firstName} </span>
                            {/* <input className='form-input' disabled  placeholder={firstName} /> */}
                        </label>

                        <label><span>Last name: </span> <span>{lastName}</span>
                                {/* <input className='form-input' disabled  placeholder={lastName} /> */}
                        </label>

                        <label><span>Email: </span><span>{email}</span>
                            {/* <input className='form-input' disabled  placeholder={email} /> */}
                        </label>

                        <label><span>Occupation: </span><span>{occupation} </span>
                                {/* <input className='form-input' disabled  placeholder={occupation} /> */}
                        </label>

                        <label><span>City: </span><span>{city} </span>
                                {/* <input className='form-input' disabled  placeholder={city} /> */}
                        </label>

                        <label><span>Bio: </span><span>{bio}</span>
                                {/* <input className='form-input' disabled  placeholder={bio} /> */}
                        </label>

                        <div>
                            <button className='form-btn back-btn' onClick = {prevStep}>Go Back</button>
                            <button className='form-btn' onClick={this.handleSubmit} type='submit'>Confirm & Continue</button>
                        </div>
                    </form>
          
        )
    }
       
}