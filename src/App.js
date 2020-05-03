import React, { Component } from 'react';

import { AuthContext } from './myContext/AuthProvider';
import NavBar from './components/navbar/NavBar';
import SideBar from './components/sidebar/SideBar';
import Loader from './/loader/Loader';
import Loader2 from './components/messageBoard/components/loader/Loader';
import MainTemplate from './components/mainTemplate/MainTemplate'


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
            <MainTemplate />
          </React.Fragment>
        )}
      </div>
    );
  }
}
App.contextType = AuthContext;
export default App;
