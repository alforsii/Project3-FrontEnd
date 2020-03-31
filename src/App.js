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

  isUserLoggedIn = async () => {
    try {
      this.setState({isLoading: true, message: 'Checking authentication'})
      const res = await axios.get('/api/auth/isLoggedIn');
      // console.log("Output for: App -> isUserLoggedIn -> res", res)
      setTimeout(()=> {
        this.setState({ user: res.data.user , loggedIn: true, isLoading: false})
        this.getUsers()
      }, 2000)
    } catch (err) {
       console.log("isUserLoggedIn -> err", err)
    }
  }

  getUsers = async () => {
    this.setState({isLoading: true})
    let res = await axios.get(`/api/auth/users`)
    // console.log("getUsers -> res", res)
    this.setState({ users: res.data, isLoading: false})
  }

  handleSignup = async e => {
    e.preventDefault()
    this.setState({isLoading: true, message: 'Signing up, please wait!'})
    const res = await axios.post('/api/auth/signup', this.state.userSignup[0]);
    setTimeout(()=> {
      this.setState({ user: res.data.user , loggedIn: true, isLoading: false})
    },2000)
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
    this.setState({isLoading: true, message: 'Logging in, please wait...'})
    await axios.post('/api/auth/logout');
    setTimeout(() => {
      this.setState({ loggedIn: false, user: null, isLoading: false})
    }, 2000)
  }
  componentDidMount() {
    console.log('componentDidMount')
    this.isUserLoggedIn()
  }
  updateState = () => {
    this.isUserLoggedIn()
  }
  
  render() {
    const { loggedIn, user, users, isLoading, message } = this.state;
    // console.log("this.state", this.state)
   
    return (
      <div className="App">
         {/* { isLoading && <i className="fa  fa-spinner fa-spin"></i> */}
          <NavBar loggedIn={loggedIn} userLogout={this.userLogout}/>
          {user ? <SideBar user={user}/> : ''}

        {isLoading? <>
          <Loader message={message}/>
          <Loader2/></> : 
          <Switch>
            <Route
              exact strict
              path="/"
              render={props => {
                return loggedIn? <Home {...props} user={user}/> : <LandingPage {...props} handleChange={this.handleChange}  handleSubmit={ this.handleSignup}/>
              }}
            />
            <Route exact strict path="/login" render={props => {
            return  loggedIn ? <Redirect to='/' /> : <LoginForm {...props} updateState={this.updateState} />
            }} />
            <Route exact strict path="/about" component={About} />
            <Route exact strict path="/user-update" component={UserForm} />
            <Route exact strict path="/projects" component={Projects} />
            <Route exact strict path="/projects/:id" component={ProjectDetails} />
              <Route
              exact strict
              path="/message-board"
              render={props =>  <SocketMessageBoard {...props} user={user} users={users}/> }
            />
            <Route
              exact strict
              path="/message-board/:id"
              render={props =>  <SocketMessageBoard {...props} /> }
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
