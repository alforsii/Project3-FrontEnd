import { Route, Redirect } from 'react-router'
import PublicHomePage from './PublicPage'
import PrivatePage from './PrivatePage'

import React, { Component } from 'react'

export class Authorization extends Component {
  state = {
    loggedIn: false
  }

  authorizeUser = loggedIn => {
  console.log("Output for: Authorization -> loggedIn", loggedIn)
    this.setState({loggedIn})
  }

  render() {
    const { loggedIn} = this.state
    return (
      <div>
        <Route exact path="/" render={() => (
          loggedIn ? (
            <Redirect to="/home"/>
          ) : (
            <PublicHomePage loggedIn={this.state.loggedIn} authorizeUser={this.authorizeUser}/>
          )
        )}/>
      </div>
    )
  }
}

export default Authorization




{/* <Redirect push to="/somewhere/else"/> */}