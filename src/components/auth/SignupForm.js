import React from 'react';
// import { Redirect} from 'react-router-dom'


const UserSignup = ({handleChange, handleSubmit}) => {


    return (
      <div>
        <form onSubmit={handleSubmit} action=''>
          <h1>
            <i className="fas fa-user-plus"></i>Sign up
          </h1>
          <div className="error-message"></div>
          <label htmlFor="username">
            Username
          </label>
          <input onChange={handleChange} type="text" name="username" />

          <label  htmlFor="firstName">
            First Name
          </label>
          <input onChange={handleChange} type="text" name="firstName" />

          <label  htmlFor="lastName">
            Last Name
          </label>
          <input onChange={handleChange} type="text" name="lastName" />

          <label  htmlFor="email">
            Email
          </label>
          <input onChange={handleChange} type="email" name="email" />

          <label  htmlFor="password">
            Password
          </label>
          <input onChange={handleChange} type="password" name="password" placeholder="**********" />

          <button  type="submit">
            Signup
          </button>

          <p>
            Already have an account?
            <a href="/auth/login">Login</a>
          </p>
        </form>
      </div>
    );
}

export default UserSignup;
