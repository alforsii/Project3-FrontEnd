import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Container from '@material-ui/core/Container';

import { AuthContext } from './myContext/AuthProvider';
import PublicRoute from './components/protectedRoute/PublicRoutes';
import MainTemplate from './components/mainTemplate/MainTemplate';
import LandingPage from './components/home/LandingPage';
import SnackbarLogin from './components/auth/SnackbarLogin';
import Loader from './/loader/Loader';
import Loader2 from './components/messageBoard/components/loader/Loader';

import './App.css';
export class App extends Component {
  componentDidMount() {
    this.context.updateState({ message: 'Checking authentication...' });
  }

  render() {
    const { user, isLoading, message, loggedIn } = this.context.state;
    const { isUserLoggedIn, updateState } = this.context;
    return (
      <React.Fragment>
        {isLoading ? (
          <>
            <Loader message={message} />
            <Loader2 message={message} />
          </>
        ) : loggedIn ? (
          <>
            <MainTemplate
              user={user}
              updateState={updateState}
              isUserLoggedIn={isUserLoggedIn}
            />
          </>
        ) : (
          <Container maxWidth="xl">
            <Switch>
              <PublicRoute exact path="/" component={LandingPage} />
              <PublicRoute exact path="/login" component={SnackbarLogin} />
              <Route path="/" render={(props) => <Redirect to="/login" />} />
            </Switch>
          </Container>
        )}
      </React.Fragment>
    );
  }
}
App.contextType = AuthContext;
export default App;
