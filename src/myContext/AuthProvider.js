import React, { Component, createContext } from 'react';
import { withRouter } from 'react-router-dom';
import AUTH_SERVICE from '../services/auth/AuthServices';

export const AuthContext = createContext();
export class AuthProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      users: null,
      formSignup: {
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        title: 'Student',
      },
      formLogin: { email: '', password: '' },
      loggedIn: false,
      isLoading: true,
      message: false,
      errMessage: false,
    };
  }
  componentDidMount() {
    this.isUserLoggedIn();
  }
  //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  updateState = (data) => {
    this.setState(data);
  };
  //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  getUsers = async () => {
    try {
      const res = await AUTH_SERVICE.getUsers();
      this.setState({ users: res.data });
    } catch (err) {
      this.displayError(err);
    }
  };
  //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  displayError = (err) => {
    if (err.response && err.response.data) {
      this.setState((prevState) => ({
        ...prevState,
        errMessage: err.response.data.message,
      }));
      return err.response.data.message;
    } else {
      console.log(err);
      this.setState((prevState) => ({
        ...prevState,
        errMessage: 'Sorry, something went wrong!',
      }));
      return err;
    }
  };
  //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  isUserLoggedIn = async () => {
    try {
      const {
        data: { user },
      } = await AUTH_SERVICE.isLoggedIn();
      this.setState(
        {
          user,
          loggedIn: true,
          isLoading: false,
        },
        this.getUsers
      );
    } catch (err) {
      this.displayError(err);
      this.setState({ isLoading: false });
    }
  };
  // //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  // //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

  /* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
  toggleClassNavDropdown = () => {
    const buttons = document.querySelectorAll('.classNavDropdown');
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].classList.toggle('show');
    }
  };
  displayForm = (id) => {
    document.querySelector(id).classList.toggle('show');
    document.querySelector(id).classList.toggle('hide');
  };
  render() {
    const {
      state,
      updateState,
      isUserLoggedIn,
      getUsers,
      toggleClassNavDropdown,
      displayForm,
      displayError,
    } = this;

    return (
      <AuthContext.Provider
        value={{
          state,
          updateState,
          isUserLoggedIn,
          getUsers,
          toggleClassNavDropdown,
          displayForm,
          displayError,
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export default withRouter(AuthProvider);
