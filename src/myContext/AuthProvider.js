import React, { Component, createContext } from 'react'
import { withRouter } from 'react-router-dom'
import AUTH_SERVICE from '../services/auth/AuthServices'
import axios from 'axios'

export const AuthContext = createContext()
export class AuthProvider extends Component {
    state = {
        user: null,
        currentUser: null,
        users: null,
        formSignup: {username: '', firstName: '', lastName: '', email: '', password: ''},
        formLogin: {email: '',password: ''},
        loggedIn: false,
        isLoading: false,
        message: false
    }
    componentDidMount() {
        console.log("componentDidMount -> componentDidMount")
        this.isUserLoggedIn()
        // AUTH_SERVICE.getUser()
        //   .then(responseFromServer => {
        //     console.log('res: ', responseFromServer);
    
        //     // const { user } = responseFromServer.data;
    
        //     // this.setState(prevState => ({
        //     //   ...prevState,
        //     //   currentUser: user,
        //     //   user,
        //     //   loggedIn: true
        //     // }));
        //   })
        //   .catch(err =>
        //     console.log('Error while getting the user: ', err)
        //   );
      }

    isUserLoggedIn = async () => {

        try {
          const res = await AUTH_SERVICE.isLoggedIn();
          console.log("isUserLoggedIn -> res", res)
        //   const res = await axios.post('/api/auth/isLoggedIn', {})
              this.setState(prevState => ({
              ...prevState,
              currentUser: res.data.user,
              user: res.data.user,
              loggedIn: true
            }));
        //   this.setState({ user: res.data.user , loggedIn: true, isLoading: false})
            this.getUsers()
        } catch (err) {
           console.log("isUserLoggedIn -> err", err)
        }
      }
    handleLoginInput = e => {
        const { value, name } = e.target
        // const { formSignup } = this.state
        // const updateUser = [...formSignup][0]
        // updateUser[name] = value
        this.setState(prevState => ({
            formLogin: {
                ...prevState.formLogin,
                [name]: value
            }
        }))
        console.log("this.setState", this.setState)
        // this.setState({ [e.target.name]: e.target.value})
      }
    
      handleLoginSubmit = async e => {
        e.preventDefault()
        // const res = await axios.post('/api/auth/login', this.state.formLogin)
        const res = await AUTH_SERVICE.login(this.state.formLogin)
        this.updateState()
        const {
            data: { user, message }
          } = res;
        this.setState(prevState => ({
            ...prevState,
            formLogin: {
              email: '',
              password: ''
            },
            currentUser: user,
            user,
            loggedIn: true
          }));

          alert(`${message}`);
          this.props.history.push('/');
      }

      handleSignupSubmit = async e => {
        e.preventDefault()
        console.log("this.state.formSignup", this.state.formSignup)
        try {
            const res = await AUTH_SERVICE.signup(this.state.formSignup)
            console.log("AuthProvider -> res", res)
            // const res = await axios.post('/api/auth/signup', this.state.formSignup);
        const {
            data: { user, message }
          } = res;
  
        // this.setState({ user: res.data.user , loggedIn: true})
        this.setState(prevState => ({
            ...prevState,
            formSignup: {
              username: '',
              firstName: '',
              lastName: '',
              email: '',
              password: ''
            },
            currentUser: user,
            user,
            loggedIn: true
          }));

          alert(`${message}`);
          this.props.history.push('/');
        } catch (err) {
            if (err.response && err.response.data) {
                this.setState(prevState => ({
                  ...prevState,
                  message: err.response.data.message
                }))
            }
        }

      }
    
      handleSignupInput = e => {
        const { value, name } = e.target
        console.log(" -> value", value)
        // const { formSignup } = this.state
        // const updateUser = [...formSignup][0]
        // updateUser[name] = value
        
        this.setState(prevState => ({
            formSignup: {
                ...prevState.formSignup,
                [name]: value
            }
        }))
      }

      handleLogout = async (e) => {
        e.preventDefault()
        try {
          console.log('clicked logout')
          // const res =  await axios.post('/api/auth/logout',{})
          const res =  await AUTH_SERVICE.logout()
          console.log('clicked logout')
                
                this.setState(prevState => ({
                ...prevState,
                currentUser: null,
                user: null,
                loggedIn: false
            }));
            this.props.history.push('/');
            console.log('logged out')
            } catch (err) {
                alert('Error while logout: ', err)   
            }
      };

      updateState = () => {
        this.isUserLoggedIn()
      }

      getUsers = async () => {
        let res = await AUTH_SERVICE.getUsers()
        // let res = await axios.get(`/api/auth/users`)
        console.log("getUsers -> res", res)
        this.setState({ users: res.data})
      }


    render() {
        const { state,handleLoginInput,handleLoginSubmit, handleSignupInput,
             handleSignupSubmit, handleLogout,
            getUser, updateState, isUserLoggedIn} = this;
        return (
            <AuthContext.Provider value={{
                state,
                handleLoginInput,
                handleLoginSubmit,
                handleSignupInput,
                handleSignupSubmit,
                handleLogout,
                updateState,
                isUserLoggedIn,
                getUser
            }}>
                {this.props.children}
            </AuthContext.Provider>
        )
    }
}

export default withRouter(AuthProvider)
