import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import NavBar from './components/navbar/NavBar';
import Home from './components/home/Home';
import HomePage from './components/home/HomePage';
import About from './components/about/About';
import { projects as Projects } from './components/projects/Projects';
import ProjectDetails from './components/projects/ProjectDetails';
import UserForm from './components/signup-form/UserForm';
import SideBar from './components/sidebar/SideBar';
import toggle from './components/sidebar/toggle';
import MessageBoard from './components/messageBoard/MessageBoard';
import LoginForm from './components/auth/LoginForm';
// import SignupForm from './components/auth/SignupForm';
import axios from 'axios'

import './App.css';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      loggedIn: false,
      userSignup: [{
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
      }]
    };
    this.isUserLoggedIn = this.isUserLoggedIn()
  }

  isUserLoggedIn = () => {
    axios.get('/api/auth/isLoggedIn')
    .then(user => {
    console.log("Output for: App -> isUserLoggedIn -> user", user)
      if(user) {
        this.setState({ user, loggedIn: true})
      }else {
        this.setState({ user: {}, loggedIn: false})
      }
    })
    .catch(err => console.log(err))
  }

  handleSignup =  e => {
  console.log("Output for: App -> data", e)
    e.preventDefault()
      axios.post('/api/auth/signup', this.state.userSignup[0])
      .then(newUser => {
        this.setState({ loggedIn: true, user: newUser})
      })
      .catch(err => console.log(err))
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

  componentDidMount() {
    // this.isUserLoggedIn()
    if (this.state.loggedIn) {
      toggle();
     setTimeout(()=> {
     },500)
    }
  }
componentDidUpdate = () => {
  toggle();
}
  render() {
    const { loggedIn, user } = this.state;
    console.log(" this.state",  this.state)
   
    return (
      <div className="App">
        <NavBar loggedIn={loggedIn} />
        <SideBar />

        <Switch>
          <Route
            exact
            path="/"
            render={props => {
              return loggedIn? <Home {...props} user={user}/> : <HomePage {...props} handleChange={this.handleChange}  handleSubmit={ this.handleSignup}/>
            }}
          />
          <Route
            exact
            path="/login"
            render={props => 
               !loggedIn? <LoginForm /> : <Redirect to='/'/> } />
          {/* <Route
            exact
            path="/signup"
            render={props => !loggedIn? <SignupForm /> : <Redirect to='/'/>}
          /> */}
          <Route exact path="/about" component={About} />
          <Route exact path="/user-update" component={UserForm} />
          <Route exact path="/projects" component={Projects} />
          <Route exact path="/projects/:id" component={ProjectDetails} />
          <Route exact path='/message-board' component={MessageBoard} />
          <Route
            exact
            path="/message-board/:id"
            render={props => <MessageBoard {...props} />}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
