import React, { Component } from 'react';
import { Switch } from 'react-router-dom';

import { AuthContext } from './myContext/AuthProvider';
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
import Loader from './/loader/Loader';
import Loader2 from './components/messageBoard/components/loader/Loader';
import ProtectedRoute from './components/protectedRoute/ProtectedRoute';
import PublicRoute from './components/protectedRoute/PublicRoutes';

import './App.css';

export class App extends Component {
  componentDidMount() {
    this.context.updateState({ message: 'Checking authentication...' });
  }

  render() {
    // eslint-disable-next-line
    const { loggedIn, isLoading, message, user, users } = this.context.state;
    const {
      handleLoginInput,
      handleLoginSubmit,
      handleSignupInput,
      handleSignupSubmit,
      handleLogout,
      isUserLoggedIn,
    } = this.context;
    return (
      <div className="App">
        <NavBar loggedIn={loggedIn} userLogout={handleLogout} />
        {user && <SideBar user={user} />}
        {isLoading ? (
          <>
            <Loader message={message} />
            <Loader2 message={message} />
          </>
        ) : (
          <Switch>
            <PublicRoute
              exact
              strict
              path="/"
              handleSignupInput={handleSignupInput}
              handleSignupSubmit={handleSignupSubmit}
              component={LandingPage}
            />
            <PublicRoute
              exact
              strict
              path="/login"
              userLoggedIn={isUserLoggedIn}
              handleLoginInput={handleLoginInput}
              handleLoginSubmit={handleLoginSubmit}
              component={LoginForm}
            />
            <ProtectedRoute
              exact
              strict
              path="/message-board"
              user={user}
              users={users}
              component={SocketMessageBoard}
            />
            <ProtectedRoute
              exact
              strict
              path="/message-board/:id"
              user={user}
              users={users}
              component={SocketMessageBoard}
            />
            <ProtectedRoute
              exact
              strict
              path="/home"
              user={user}
              component={Home}
            />
            <ProtectedRoute exact strict path="/about" component={About} />
            <ProtectedRoute
              exact
              strict
              path="/user-update"
              component={UserForm}
            />
            <ProtectedRoute
              exact
              strict
              path="/projects"
              users={users}
              component={Projects}
            />
            <ProtectedRoute
              exact
              strict
              path="/projects/:id"
              component={ProjectDetails}
            />
          </Switch>
        )}
      </div>
    );
  }
}
App.contextType = AuthContext;
export default App;
