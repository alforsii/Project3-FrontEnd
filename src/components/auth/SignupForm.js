import React from 'react';
import { Link} from 'react-router-dom'


const UserSignup = ({handleSignupInput, handleSignupSubmit}) => {


    return (
      <div>
        <form id='signup-form' onSubmit={handleSignupSubmit} action=''>
          <h1>
            <i className="fas fa-user-plus"></i>Sign up
          </h1>
          <div className="error-message"></div>
          <label htmlFor="username">
            Username
          </label>
          <input onChange={handleSignupInput} type="text" name="username" />

          <label  htmlFor="firstName">
            First Name
          </label>
          <input onChange={handleSignupInput} type="text" name="firstName" />

          <label  htmlFor="lastName">
            Last Name
          </label>
          <input onChange={handleSignupInput} type="text" name="lastName" />

          <label  htmlFor="email">
            Email
          </label>
          <input onChange={handleSignupInput} type="email" name="email" />

          <label  htmlFor="password">
            Password
          </label>
          <input onChange={handleSignupInput} type="password" name="password" placeholder="**********" />
          <label  htmlFor="password">
            Title
          </label>
          <select onChange={handleSignupInput}
              id='title' name='title'>
              <option>Student</option>
              <option>Parent</option>
              <option>TA</option>
            </select>

          <button id='signup-form-btn'  type="submit">
            Signup
          </button>

          <p>
            Already have an account?
            <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    );
}

export default UserSignup;
