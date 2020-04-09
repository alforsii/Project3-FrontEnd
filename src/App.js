import React, { Component } from 'react';
import { Switch } from 'react-router-dom';

import { AuthContext } from './myContext/AuthProvider';
import NavBar from './components/navbar/NavBar';
import Home from './components/home/Home';
import LandingPage from './components/home/LandingPage';
import About from './components/about/About';
import { projects as Projects } from './components/projects/Projects';
import ProjectDetails from './components/projects/ProjectDetails';
import SideBar from './components/sidebar/SideBar';
// import MessageBoard from './components/messageBoard/MessageBoard';
import SocketMessageBoard from './components/messageBoard/SocketMessageBoard';
import UpdateProfile from './components/upload/UpdateProfile'
import LoginForm from './components/auth/LoginForm';
import Loader from './/loader/Loader';
import Loader2 from './components/messageBoard/components/loader/Loader';
import ProtectedRoute from './components/protectedRoute/ProtectedRoute';
import PublicRoute from './components/protectedRoute/PublicRoutes';
import Teacher from './components/users/teachers/Teacher'
import TheClass from './components/users/teachers/components/TheClass'


import './App.css';

export class App extends Component {
  componentDidMount() {
    this.context.updateState({ message: 'Checking authentication...' });
  }

  render() {
    const { loggedIn, isLoading, message, user } = this.context.state;
    const { handleLogout } = this.context;
    return (
      <div className="App">
        <NavBar loggedIn={loggedIn} userLogout={handleLogout} />
        <SideBar user={user} userLogout={handleLogout} loggedIn={loggedIn}/>

        {isLoading ? (
          <><Loader message={message}/><Loader2 message={message}/></>
        ) : (
          <Switch>
            <PublicRoute exact path="/" component={LandingPage} />
            <PublicRoute exact path="/login" component={LoginForm} />
            <ProtectedRoute exact path="/teachers-page" component={Teacher} />
            <ProtectedRoute exact path="/class/:id" component={TheClass} />
            <ProtectedRoute exact path="/home" component={Home} />
            <ProtectedRoute exact path="/about" component={About} />
            <ProtectedRoute exact path="/projects" component={Projects} />
            <ProtectedRoute exact path="/projects/:id" component={ProjectDetails}/>
            <ProtectedRoute exact path="/message-board" component={SocketMessageBoard}/>
            <ProtectedRoute exact path="/message-board/:id" component={SocketMessageBoard}/>
            <ProtectedRoute exact path="/settings/update-profile" component={UpdateProfile}/>
          </Switch>
        )}
      </div>
    );
  }
}
App.contextType = AuthContext;
export default App;
