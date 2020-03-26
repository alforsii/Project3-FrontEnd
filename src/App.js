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
import MessageBoard from './components/messageBoard/MessageBoard';
import LoginForm from './components/auth/LoginForm';
import axios from 'axios'

import './App.css';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      loggedIn: false,
      isLoading: true,
      userSignup: [{username: '', firstName: '', lastName: '', email: '', password: ''}]
    };
  }

  isUserLoggedIn = async () => {
    try {
      const res = await axios.get('/api/auth/isLoggedIn');
      this.setState({ user: res.data.user , loggedIn: true, isLoading: false})
    } catch (err) {
       console.log("isUserLoggedIn -> err", err)
    }
  }

  handleSignup = async e => {
    e.preventDefault()
    const res = await axios.post('/api/auth/signup', this.state.userSignup[0]);
    this.setState({ user: res.data.user , loggedIn: true, isLoading: false})
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
    await axios.post('/api/auth/logout');
    this.setState({ loggedIn: false, user: null})
  }
  componentDidMount() {
    console.log('componentDidMount')
    this.isUserLoggedIn()
  }
  updateState = () => {
    this.isUserLoggedIn()
  }

// componentDidUpdate = () => {
//   console.log('componentDidUpdate')
// }
// UNSAFE_componentWillMount = () => {
// console.log('UNSAFE_componentWillMount')
// // this.isUserLoggedIn()
// }
// UNSAFE_componentWillUpdate = (props, state) => {
// console.log({props, state})
// }

  render() {
    const { loggedIn, user } = this.state;
   
    return (
      <div className="App">
         {/* { isLoading && <i className="fa  fa-spinner fa-spin"></i> */}
         <div>
          <NavBar loggedIn={loggedIn} userLogout={this.userLogout}/>
          <SideBar />
  
          <Switch>
            <Route
              exact strict
              path="/"
              render={props => {
                return loggedIn? <Home {...props} user={user}/> : <HomePage {...props} handleChange={this.handleChange}  handleSubmit={ this.handleSignup}/>
              }}
            />
            <Route exact strict path="/login" render={props => {
            return  loggedIn ? <Redirect to='/' /> : <LoginForm {...props} updateState={this.updateState} />
            }} />

            <Route exact strict path="/about" component={About} />
            <Route exact strict path="/user-update" component={UserForm} />
            <Route exact strict path="/projects" component={Projects} />
            <Route exact strict path="/projects/:id" component={ProjectDetails} />
            <Route exact strict path='/message-board' component={MessageBoard} />
            <Route
              exact strict
              path="/message-board/:id"
              render={props => <MessageBoard {...props} />}
            />
          </Switch>
         </div>
       {/* )} */}
      </div>
    );
  }
}

export default App;
