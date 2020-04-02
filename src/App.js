import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { AuthContext } from "./myContext/AuthProvider";
import NavBar from "./components/navbar/NavBar";
import Home from "./components/home/Home";
import LandingPage from "./components/home/LandingPage";
import About from "./components/about/About";
import { projects as Projects } from "./components/projects/Projects";
import ProjectDetails from "./components/projects/ProjectDetails";
import UserForm from "./components/signup-form/UserForm";
import SideBar from "./components/sidebar/SideBar";
// import MessageBoard from './components/messageBoard/MessageBoard';
import SocketMessageBoard from "./components/messageBoard/SocketMessageBoard";
import LoginForm from "./components/auth/LoginForm";
import Loader from ".//loader/Loader";
import Loader2 from "./components/messageBoard/components/loader/Loader";

import "./App.css";

export class App extends Component {
  componentDidMount() {
    this.context.updateState({
      isLoading: true,
      message: "Checking authentication..."
    });
    this.context.isUserLoggedIn();
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
      isUserLoggedIn
    } = this.context;
    return (
      <div className="App">
        <NavBar loggedIn={loggedIn} userLogout={handleLogout} />
        {user && <SideBar user={user} />}
        {/* 
        Your App component only mounts once(when user is initialy loading the website(or if you refresh))
        so isLoading should be set to true in starting state and changed to false when you get back that  
        response from the backend. 
        After that isLoading should only be set to true when you are making a call to the backend and waiting for the response.
         */}
        {isLoading ? (
          <>
            <Loader message={message} />
            <Loader2 message={message} />
          </>
        ) : (
          <Switch>
            {loggedIn && (
              <>
                <Route
                  exact
                  strict
                  path="/"
                  render={props => {
                    <Home {...props} user={user} />;
                  }}
                />
                <Route
                  exact
                  strict
                  path="/message-board"
                  render={() => <SocketMessageBoard />}
                />
                <Route
                  exact
                  strict
                  path="/message-board/:id"
                  render={() => <SocketMessageBoard />}
                />
              </>
            )}
            <Route exact strict path="/about" component={About} />
            <Route exact strict path="/user-update" component={UserForm} />
            <Route exact strict path="/projects" component={Projects} />
            <Route
              exact
              strict
              path="/projects/:id"
              component={ProjectDetails}
            />
            <Route
              exact
              strict
              path="/login"
              render={props => {
                return loggedIn ? (
                  <Redirect to="/" />
                ) : (
                  <LoginForm
                    {...props}
                    userLoggedIn={isUserLoggedIn}
                    handleLoginInput={handleLoginInput}
                    handleLoginSubmit={handleLoginSubmit}
                  />
                );
              }}
            />
            <Route
              exact
              strict
              path="/"
              render={props => {
                <LandingPage
                  {...props}
                  handleChange={handleSignupInput}
                  handleSubmit={handleSignupSubmit}
                />;
              }}
            />
            <Route
              exact
              strict
              path="/message-board/:id"
              render={() => <Redirect to="/message-board" />}
            />
            }
          </Switch>
        )}
      </div>
    );
  }
}
App.contextType = AuthContext;
export default App;
