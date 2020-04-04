import React from 'react';
import {Link} from 'react-router-dom'
import './LoginForm.css'

export const UserLogin = (props) => {
const {handleLoginSubmit, handleLoginInput} = props.context
const {message} = props.context.state

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
            <input onChange={handleLoginInput} type="email" name="email" className="form-control" />

            <label htmlFor="password">
              Password
            </label>
            <input onChange={handleLoginInput}
              type="password"
              name="password"
              className="form-control"
              placeholder="**********"
            />

            <button to='/login' type="submit">
              Login
            </button>

            <p>
              Don't have an account?
              <Link to='/'>Sign up</Link>
            </p>
          </form>
          {message ? <div className="error-message">{ message}</div> : ''}
        </div>
    );

}

export default UserLogin;
