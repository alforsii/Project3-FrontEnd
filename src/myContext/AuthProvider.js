import React, { Component, createContext } from 'react';
import { withRouter } from 'react-router-dom';
import AUTH_SERVICE from '../services/auth/AuthServices';

export const AuthContext = createContext();
export class AuthProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      currentUser: null,
      users: null,
      formSignup: {
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
      },
      formLogin: { email: '', password: '' },
      loggedIn: false,
      isLoading: true,
      message: false,
    };
  }
  componentDidMount() {
    this.isUserLoggedIn()
  }
  //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  updateState = data => {
    this.setState(data);
   
  };
  //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  getUsers = async () => {
    try {
      const res = await AUTH_SERVICE.getUsers();
      this.setState({ users: res.data });
    } catch (err) {
      this.displayError(err)
    }
  };
  //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  displayError = err => {
    if (err.response && err.response.data) {
      this.setState(prevState => ({
        ...prevState,
        message: err.response.data.message,
      }));
    } else {
      console.log(err);
    }
  };
  //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  isUserLoggedIn = async () => {
    try {
      const {data: {user}} = await AUTH_SERVICE.isLoggedIn();
       this.setState({ 
         user, loggedIn: true,isLoading: false 
         }, this.getUsers )
    } catch (err) {
      this.displayError(err);
      this.setState({ isLoading: false });
    }
  };
  //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  handleLoginInput = e => {
    const { value, name } = e.target;
    this.setState(prevState => ({
      formLogin: {
        ...prevState.formLogin,
        [name]: value,
      },
    }));
  };
  //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  handleLoginSubmit = async e => {
    e.preventDefault();
    try {
      this.setState({  message: 'Logging in...' });
      const {data: {user}} = await AUTH_SERVICE.login(this.state.formLogin);

      this.props.history.push('/dashboard');
      this.setState(prevState => ({
        ...prevState,
        formLogin: {
          email: '',
          password: '',
        },
        user,
        loggedIn: true,
        isLoading: false 
      }),this.getUsers);

      // setTimeout(() => {
      //   this.setState({ });
        
      // }, 2000);
    } catch (err) {
      this.displayError(err);
      this.setState({ isLoading: false})
    }
  };
  //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  handleSignupSubmit = async e => {
    e.preventDefault();
    try {
      this.setState({ message: 'Signing up...' });
      const {data: {user}} = await AUTH_SERVICE.signup(this.state.formSignup);

      this.props.history.push('/dashboard');
      this.setState(prevState => ({
        ...prevState,
        formSignup: {
          username: '',
          firstName: '',
          lastName: '',
          email: '',
          password: '',
        },
        user,
        loggedIn: true,
        isLoading: false 
      }),this.getUsers);

      
    } catch (err) {
      this.displayError(err);
      this.setState({ isLoading: false })
    }
  };
  //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  handleSignupInput = e => {
    const { value, name } = e.target;
    this.setState(prevState => ({
      formSignup: {
        ...prevState.formSignup,
        [name]: value,
      },
    }));
  };
  //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  handleLogout = async e => {
    try {
      this.setState({ isLoading: true, message: 'Logging out...' });
      await AUTH_SERVICE.logout();
      this.props.history.push('/');

      this.setState({ 
        loggedIn: false, user: null, users: null,
        message: 'Successfully logged out!', isLoading: false  
      });

    } catch (err) {
      this.displayError(err);
      this.setState({ isLoading: false})
    }
  };

    /* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
toggleClassNavDropdown = () => {
  const buttons = document.querySelectorAll('.classNavDropdown');
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].classList.toggle('show');
  }
};
displayForm = (id) => {
  console.log("Output for: AuthProvider -> displayForm -> id", id)
  document.querySelector(id).classList.toggle('show')
  document.querySelector(id).classList.toggle('hide')
}
  render() {
    const {
      state,
      handleLoginInput,
      handleLoginSubmit,
      handleSignupInput,
      handleSignupSubmit,
      handleLogout,
      updateState,
      isUserLoggedIn,
      getUsers,
      toggleClassNavDropdown,
      displayForm
    } = this;
    return (
      <AuthContext.Provider
        value={{
          state,
          handleLoginInput,
          handleLoginSubmit,
          handleSignupInput,
          handleSignupSubmit,
          handleLogout,
          updateState,
          isUserLoggedIn,
          getUsers,
          toggleClassNavDropdown,
          displayForm
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export default withRouter(AuthProvider);
