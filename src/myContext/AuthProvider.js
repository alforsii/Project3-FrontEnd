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
        title: 'Student'
      },
      formLogin: { email: '', password: '' },
      loggedIn: false,
      isLoading: true,
      message: false,
      errMessage: false
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
        errMessage: err.response.data.message,
      }));
      return err.response.data.message
    } else {
      console.log(err);
      this.setState(prevState => ({
        ...prevState,
        errMessage: 'Sorry, something went wrong!',
      }));
      return err
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
  // //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  // //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  // handleLoginInput = e => {
  //   const { value, name } = e.target;
  //   this.setState(prevState => ({
  //     formLogin: {
  //       ...prevState.formLogin,
  //       [name]: value,
  //     },
  //   }));
  // };
  // //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  // //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  // handleLoginSubmit = async e => {
  //   e.preventDefault();
  //   try {
  //     const {data: {user, message}} = await AUTH_SERVICE.login(this.state.formLogin);
  //     // this.setState({  message: 'Successfully logged in!' });

   
  //     this.setState(prevState => ({
  //       ...prevState,
  //       formLogin: {
  //         email: '',
  //         password: '',
  //       },
  //       user,
  //       loggedIn: true,
  //       isLoading: false ,
  //       message
  //     }),() => {
  //       this.getUsers()
  //       this.props.history.push('/dashboard');
  //     });
  //   } catch (err) {
  //     this.setState({ isLoading: false, message: ''})
  //     this.displayError(err);

  //   }
  // };
  // //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  // //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  // handleSignupSubmit = async e => {
  // console.log("Output for: AuthProvider -> e", e)
  // e.preventDefault();
  //   try {
  //     const {data: {user, message}} = await AUTH_SERVICE.signup(this.state.formSignup);
  //     // this.setState({ message: 'Thanks! Successfully signed up.' });
      
  //     this.setState(prevState => ({
  //       ...prevState,
  //       formSignup: {
  //         username: '',
  //         firstName: '',
  //         lastName: '',
  //         email: '',
  //         password: '',
  //         title: ''
  //       },
  //       user,
  //       loggedIn: true,
  //       isLoading: false ,
  //       message
  //     }),() => {
  //       this.getUsers()
  //       this.props.history.push('/dashboard');
  //     });
  //   } catch (err) {
  //     this.setState({ isLoading: false, message: '' })
  //     this.displayError(err);
  //   }
  // };
  // //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  // //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  // handleSignupInput = e => {
  //   const { value, name } = e.target;
  //   this.setState(prevState => ({
  //     formSignup: {
  //       ...prevState.formSignup,
  //       [name]: value,
  //     },
  //   }));
  // };
  // //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  // //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  // handleLogout = async e => {
  //   try {
  //     this.setState({ isLoading: true, message: 'Logging out...' });
  //     const { message } = await AUTH_SERVICE.logout();
     

  //     this.setState({ 
  //       loggedIn: false, user: null, users: null,
  //       message, isLoading: false  
  //     },
  //     () =>  this.props.history.push('/')
  //     );

  //   } catch (err) {
  //     this.displayError(err);
  //     this.setState({ isLoading: false})
  //   }
  // };

    /* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
toggleClassNavDropdown = () => {
  const buttons = document.querySelectorAll('.classNavDropdown');
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].classList.toggle('show');
  }
};
displayForm = (id) => {
  // console.log("Output for: AuthProvider -> displayForm -> id", id)
  document.querySelector(id).classList.toggle('show')
  document.querySelector(id).classList.toggle('hide')
}
  render() {
    const {
      state,
      // handleLoginInput,
      // handleLoginSubmit,
      // handleSignupInput,
      // handleSignupSubmit,
      // handleLogout,
      updateState,
      isUserLoggedIn,
      getUsers,
      toggleClassNavDropdown,
      displayForm,
      displayError
    } = this;

    return (
      <AuthContext.Provider
        value={{
          state,
          // handleLoginInput,
          // handleLoginSubmit,
          // handleSignupInput,
          // handleSignupSubmit,
          // handleLogout,
          updateState,
          isUserLoggedIn,
          getUsers,
          toggleClassNavDropdown,
          displayForm,
          displayError
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export default withRouter(AuthProvider);
