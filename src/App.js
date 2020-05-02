import React, { Component } from 'react';
import { Switch } from 'react-router-dom';

import { AuthContext } from './myContext/AuthProvider';
import NavBar from './components/navbar/NavBar';
import Home from './components/home/Home';
import LandingPage from './components/home/LandingPage';
import SideBar from './components/sidebar/SideBar';
import MessageBoard from './components/messageBoard/MessageBoard';
import UpdateProfile from './components/update-upload/UpdateProfile'
import LoginForm from './components/auth/LoginForm';
import Loader from './/loader/Loader';
import Loader2 from './components/messageBoard/components/loader/Loader';
import ProtectedRoute from './components/protectedRoute/ProtectedRoute';
import PublicRoute from './components/protectedRoute/PublicRoutes';
import TeacherPage from './components/users/teachers/TeacherPage'
import TheClass from './components/users/teachers/components/theClass/TheClass'
import AddNewClass from './components/users/teachers/components/create-class-form/ClassForm'
// import Dashboard from './components/home/Dashboard'



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
        {isLoading ? (
          <><Loader message={message}/><Loader2 message={message}/></>
        ) : (
          <React.Fragment>
            <NavBar loggedIn={loggedIn} userLogout={handleLogout} user={user}/>
            <div id='main-sidebar' className='main-sidebar'></div>
            <div id='side-bar' className='side-bar-app'>
              <SideBar user={user} userLogout={handleLogout} loggedIn={loggedIn}/>
            </div>
          <Switch>
            <PublicRoute exact path="/" component={LandingPage} />
            <ProtectedRoute exact path="/home" component={Home} />
            {/* <ProtectedRoute exact path="/dashboard" component={Dashboard} /> */}
            <PublicRoute exact path="/login" component={LoginForm} />
            <ProtectedRoute exact path="/class" component={TeacherPage} />
            <ProtectedRoute exact path="/class/new" component={AddNewClass} />
            <ProtectedRoute exact path="/class/:classId" component={TheClass} />
            <ProtectedRoute exact path="/message-board" component={MessageBoard}/>
            <ProtectedRoute exact path="/message-board/:id" component={MessageBoard}/>
            <ProtectedRoute exact path="/settings/update-profile" component={UpdateProfile}/>
          </Switch>
          </React.Fragment>
        )}
      </div>
    );
  }
}
App.contextType = AuthContext;
export default App;
