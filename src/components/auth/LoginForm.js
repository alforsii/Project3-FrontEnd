import React from 'react';
import {Link} from 'react-router-dom'
import './LoginForm.css'
import Snackbar from './Snackbar'

export const UserLogin = (props) => {
const {handleLoginSubmit, handleLoginInput} = props.context
// const {message} = props.context.state

    return (
        <div id='main-login'>
          <form id='login-form' onSubmit={handleLoginSubmit}>
            <h1>
              <i className="fas fa-sign-in-alt"></i>
              Login
            </h1>

            <label htmlFor="email">
              Email
            </label>
            <input onChange={handleLoginInput} 
            type="email" 
            id='email'
            name="email"  
            placeholder='Enter your email...'
            />

            <label htmlFor="password">
              Password
            </label>
            <input onChange={handleLoginInput}
              type="password"
              id='password'
              name="password"
              placeholder="**********"
            />
            <Snackbar context={props.context}/>
            {/* <button type="submit">
              Login
            </button> */}

            <p>
              Don't have an account?
              <Link to='/'>Sign up</Link>
            </p>
          </form>
        </div>
    );

}

export default UserLogin;
