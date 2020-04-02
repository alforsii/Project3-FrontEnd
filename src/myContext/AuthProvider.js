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
    const res = await AUTH_SERVICE.getUsers();
    this.setState({ users: res.data });
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
      const res = await AUTH_SERVICE.isLoggedIn();
       this.setState({ user: res.data.user,loggedIn: true  }, this.getUsers )
 
      setTimeout(() => {
        this.setState({ isLoading: false });
      }, 1500);
    } catch (err) {
      this.displayError(err);
      this.setState({ isLoading: false });
      // setTimeout(() => {
      // }, 2000);
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
      this.setState({ isLoading: true, message: 'Logging in 🤞 ' });
      const res = await AUTH_SERVICE.login(this.state.formLogin);
      // await this.getUsers();
      const {
        data: { user },
      } = res;
      this.setState(prevState => ({
        ...prevState,
        formLogin: {
          email: '',
          password: '',
        },
        user,
        loggedIn: true,
      }),this.getUsers);

      setTimeout(() => {
        this.setState({ isLoading: false });
        this.props.history.push('/');
      }, 2000);
    } catch (err) {
      this.displayError(err);
    }
  };
  //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  handleSignupSubmit = async e => {
    e.preventDefault();
    try {
      this.setState({isLoading: true, message: 'Signing up...' });
      const res = await AUTH_SERVICE.signup(this.state.formSignup);
      const {
        data: { user },
      } = res;
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
      }),this.getUsers);

      setTimeout(() => {
        this.setState({ isLoading: false });
        this.props.history.push('/');
      }, 2000);
    } catch (err) {
      this.displayError(err);
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
      this.setState({ loggedIn: false, user: null, users: null });
      setTimeout(() => {
        this.setState({ message: 'Successfully logged out!' });
      }, 1500);
      setTimeout(() => {
        this.setState({ isLoading: false });
        this.props.history.push('/');
      }, 2500);
    } catch (err) {
      this.displayError(err);
    }
  };

  render() {
    const {
      state,
      handleLoginInput,
      handleLoginSubmit,
      handleSignupInput,
      handleSignupSubmit,
      handleLogout,
      getUser,
      updateState,
      isUserLoggedIn,
      getUsers,
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
          getUser,
          getUsers,
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export default withRouter(AuthProvider);
