import React, { Component } from 'react'
import { Switch, Route} from 'react-router-dom';
import NavBar from './components/navbar/NavBar'
import Home from './components/home/Home'
import About from './components/about/About';
import {projects as Projects} from './components/projects/Projects';
import ProjectDetails from './components/projects/ProjectDetails';
import UserForm from './components/signup-form/UserForm'
import SideBar from './components/sidebar/SideBar'
import toggle from './components/sidebar/toggle'
import MessageBoard from './components/messageBoard/MessageBoard'

import './App.css';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = { route: '' };
  }

  componentDidMount(){
   toggle()
  }

  render() {
    return  (
      <div className="App">
        <NavBar />
        <SideBar />

        <Switch>
          <Route exact path='/' component={Home}/>
          <Route exact path='/about' component={About} />
          <Route exact path='/signup' component={UserForm}/>
          <Route exact path='/projects' component={Projects}/>
          <Route exact path="/projects/:id" component={ProjectDetails} />
          <Route exact path="/message-board" component={MessageBoard} />
          {/* <Route exact path="/projects/:id" children={ProjectDetails} /> */}
        </Switch>
      </div>
    ) 
  }
}



export default App

