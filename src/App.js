import React, { Component } from 'react';

import { AuthContext } from './myContext/AuthProvider';
import Loader from './/loader/Loader';
import Loader2 from './components/messageBoard/components/loader/Loader';
import MainTemplate from './components/mainTemplate/MainTemplate';

import './App.css';
export class App extends Component {
  componentDidMount() {
    this.context.updateState({ message: 'Checking authentication...' });
  }

  render() {
    const { isLoading, message } = this.context.state;
    return (
      <React.Fragment>
        {isLoading ? (
          <>
            <Loader message={message} />
            <Loader2 message={message} />
          </>
        ) : (
          <MainTemplate />
        )}
      </React.Fragment>
    );
  }
}
App.contextType = AuthContext;
export default App;
