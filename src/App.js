import React, { Component } from 'react';
import { Switch, Route, Redirect,  } from 'react-router-dom';
import NavBar from './components/navbar/NavBar';
import Home from './components/home/Home';
import LandingPage from './components/home/LandingPage';
import About from './components/about/About';
import { projects as Projects } from './components/projects/Projects';
import ProjectDetails from './components/projects/ProjectDetails';
import UserForm from './components/signup-form/UserForm';
import SideBar from './components/sidebar/SideBar';
// import MessageBoard from './components/messageBoard/MessageBoard';
import SocketMessageBoard from './components/messageBoard/SocketMessageBoard';
import LoginForm from './components/auth/LoginForm';
import Loader from './/loader/Loader'
import Loader2 from './components/messageBoard/components/loader/Loader'
import axios from 'axios'
import AUTH_SERVICE from './services/auth/AuthServices'

import './App.css';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      users: null,
      message: false,
      loggedIn: false,
      isLoading: false,
      userSignup: [{username: '', firstName: '', lastName: '', email: '', password: ''}]
    };
  }

  //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  displayError = (err) => {
    if(err.response.data.message){
      this.setState({ isLoading: true,message: err.response.data.message})
     console.log(err.response.data.message)
   }else{
     console.log(err)
   }
  }

  //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  isUserLoggedIn = async () => {
    try {
      this.setState({isLoading: true, message: 'Checking authentication...'})
      const res = await AUTH_SERVICE.isLoggedIn();
      
      // const res = await axios.get('/api/auth/isLoggedIn');
      this.setState({user: res.data.user })
      
      setTimeout(()=> {
        this.setState({ loggedIn: true})
        this.getUsers()
      }, 1000)
      setTimeout(()=> {
        this.setState({isLoading: false})
      },1500)
    } catch (err) {
       this.displayError(err)
      setTimeout(()=> {
        this.setState({isLoading: false})
      },2000)
    }
  }

  //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  getUsers = async () => {
    try {
      this.setState({isLoading: true})
    let res = await AUTH_SERVICE.getUsers()
    // let res = await axios.get(`/api/auth/users`)
    this.setState({ users: res.data, isLoading: false})
    } catch (err) {
      this.displayError(err)
    }
  }

  handleSignup = async e => {
    e.preventDefault()
    try {
      this.setState({isLoading: true, message: 'Checking authentication...'})
      const res = await AUTH_SERVICE.signup(this.state.userSignup[0]);
      // const res = await axios.post('/api/auth/signup', this.state.userSignup[0]);
      this.setState({ message: 'Signing in...'})
      this.setState({ user: res.data.user })
    setTimeout(()=> {
      this.setState({ loggedIn: true, isLoading: false})
    },2000)
    } catch (err) {
      this.displayError(err)
    }
  }

  handleChange = e => {
    const { value, name } = e.target
    const { userSignup } = this.state
    const updateUser = [...userSignup][0]
    updateUser[name] = value
    this.setState({
        userSignup: [updateUser]
    })
  }
  userLogout = async () => {
    this.setState({isLoading: true, message: 'Logging out...'})
    await AUTH_SERVICE.logout();
    // await axios.post('/api/auth/logout');
    this.setState({ loggedIn: false, user: null, users: null })
    setTimeout(() => {
      this.setState({isLoading: true, message: 'Successfully logged out!'})
    }, 1500)
    setTimeout(() => {
      this.setState({ isLoading: false})
    }, 2500)
  }
  componentDidMount() {
    this.setState({isLoading: true, message: 'Checking authentication...'})
    setTimeout(() => {
      this.isUserLoggedIn()
    },1000)
  }
  userLoggedIn = () => {
    this.isUserLoggedIn()
  }
  
  render() {
    const { loggedIn, user, users, isLoading, message } = this.state;
    // console.log("this.state", this.state)
   
    return (
      <div className="App">
          <NavBar loggedIn={loggedIn} userLogout={this.userLogout}/>
          {user ? <SideBar user={user}/> : ''}

        {isLoading? <>
          <Loader message={message}/>
          <Loader2 message={message}/></> : 
          <Switch>
            <Route
              exact strict
              path="/"
              render={props => {
                return loggedIn? <Home {...props} user={user}/> : <LandingPage {...props} handleChange={this.handleChange}  handleSubmit={ this.handleSignup}/>
              }}
            />
            <Route exact strict path="/login" render={props => {
            return  loggedIn ? <Redirect to='/' /> : <LoginForm {...props} userLoggedIn={this.userLoggedIn} />
            }} />
            <Route exact strict path="/about" component={About} />
            <Route exact strict path="/user-update" component={UserForm} />
            <Route exact strict path="/projects" component={Projects} />
            <Route exact strict path="/projects/:id" component={ProjectDetails} />
            {/* <Route exact strict path="/message-board" component={SocketMessageBoard} />
            <Route exact strict path="/message-board/:id" component={SocketMessageBoard} /> */}

              <Route
              exact strict
              path="/message-board"
              render={props => loggedIn? <SocketMessageBoard {...props} user={user} users={users} /> : ''}
            />
            <Route
              exact strict
              path="/message-board/:id"
              render={props => users? <SocketMessageBoard {...props} /> : <Redirect to='/message-board'/>}
            />
            {/* <Route exact strict path="/projects/:id" component={ProjectDetails} />
              <Route
              exact strict
              path="/message-board"
              render={props => loggedIn? <MessageBoard {...props} user={user} users={users}/> : <Redirect to='/'/>}
            />
            <Route
              exact strict
              path="/message-board/:id"
              render={props => loggedIn? <MessageBoard {...props} /> : <Redirect to='/'/>}
            /> */}
          </Switch>
  }
      </div>
    );
  }
}

export default App;
