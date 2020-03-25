import React, { Component } from 'react'
import NavBar from './components/navbar/NavBar'
import HomePage from './components/home/HomePage'

export class PublicPage extends Component {
    render() {
        const { loggedIn, authorizeUser } =this.props
        return (
            <div>
                <NavBar loggedIn={loggedIn}/> 
                <HomePage authorizeUser={authorizeUser}  loggedIn={loggedIn}/>
            </div>
        )
    }
}

export default PublicPage
