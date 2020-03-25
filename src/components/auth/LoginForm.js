import React, { Component } from 'react';
import './LoginForm.css'

export class UserLogin extends Component {

  state = {
    email: '',
    password: ''
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value})
  }

  handleSubmit = e => {
    e.preventDefault()
  }

  render() {
    console.log(this.state)
    const { message } = this.props;
    return (
        <div id='main-login'>
          <form onSubmit={this.handleSubmit} id='login-form'>
            <h1>
              <i className="fas fa-sign-in-alt"></i>
              Login
            </h1>

            <label htmlFor="email">
              Email
            </label>
            <input onChange={this.handleChange} type="email" name="email" className="form-control" />

            <label htmlFor="password">
              Password
            </label>
            <input onChange={this.handleChange}
              type="password"
              name="password"
              className="form-control"
              placeholder="**********"
            />

            <button type="submit">
              Login
            </button>

            <p>
              Don't have an account?
              <a href="/auth/signup">Sign up</a>
            </p>
          </form>
          {message ? <div className="error-message">{{ message }}</div> : ''}
        </div>
    );
  }
}

export default UserLogin;
