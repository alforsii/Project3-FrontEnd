import React from 'react';
import {Link} from 'react-router-dom'
import './LoginForm.css'

export const UserLogin = (props) => {
const {handleLoginSubmit, handleLoginInput} = props.context
// const {message} = props.context.state

    return (
        <div id='main-login'>
          <form onSubmit={handleLoginSubmit} id='login-form'>
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
            <label htmlFor="title">
              Title
            </label>
            <select onChange={handleLoginInput}
              id='title' name='title'>
              <option>Teacher</option>
              <option>Student</option>
              <option>Parent</option>
            </select>

            <button to='/login' type="submit">
              Login
            </button>

            <p>
              Don't have an account?
              <Link to='/'>Sign up</Link>
            </p>
          </form>
        </div>
    );

}

export default UserLogin;
