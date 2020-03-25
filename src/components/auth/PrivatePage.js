import React, { Component } from 'react'
import { Switch, Route, Link} from 'react-router-dom';
import NavBar from './components/navbar/NavBar'
import Home from './components/home/Home'
import HomePage from './components/home/HomePage'
import About from './components/about/About';
import {projects as Projects} from './components/projects/Projects';
import ProjectDetails from './components/projects/ProjectDetails';
import UserForm from './components/signup-form/UserForm'
import SideBar from './components/sidebar/SideBar'
import toggle from './components/sidebar/toggle'
import MessageBoard from './components/messageBoard/MessageBoard'

export class PrivatePage extends Component {
    constructor(props) {
        super(props);
        this.state = { 
          route: '',
          isAuthorized: false
         };
      }

    componentDidMount(){
        if(this.state.isAuthorized){
         toggle()
        }
       }

    render() {
        return (
            <div>
                 <NavBar /> 
                <SideBar />
                <Switch>
                    <Route exact path='/home' component={Home}/>
                    <Route exact path='/about' component={About} />
                    <Route exact path='/about' component={About} />
                    <Route exact path='/user-update' component={UserForm}/>
                    <Route exact path='/projects' component={Projects}/>
                    <Route exact path="/projects/:id" component={ProjectDetails} />
                    <Route exact path="/message-board" component={MessageBoard} />  
                    <Route exact path="/message-board/:id" render={ props => <MessageBoard {...props} />}/>
                </Switch>
            </div>
        )
    }
}

export default PrivatePage
