import React, { Component } from 'react';

import Navbar from './components/navbar/Navbar'
import Sidebar from './components/Sidebar';
import ClassesList from './components/classesList/ClassesList';
import UsersList from './components/usersList/UsersList'

import { AUTH_CLASSES } from '../../../services/classesAuth/ClassesAuth';
import './TeacherPage.css';

export class Teacher extends Component {
  state = {
    users: null,
    classes: null,
    search: false
  };
  componentDidMount = () => {
    this.getClasses();
  };
  //get all users
  getUsers = title => {
    this.setState(prevState => ({
      users: this.props.context.state.users.filter(
        user => user.title === title
      ),
      search: false
    }));
  };

  //Get all classes
  getClasses = async () => {
    const res = await AUTH_CLASSES.getClasses();
    this.setState({ classes: res.data.classes });
  };

  //update state
  toggleSearchBar = () => {
    this.setState(prevState => ({
      search: !prevState.search,
      users: null
    }))
  }

  render() {
    const { users, search } = this.state;
    const {
      updateState,
      // state: { user }
    } = this.props.context;
    return (
      <div className="main-teacher">
        <div className="t-child-div">
          <Sidebar />
        </div>

        <div className="t-child-div">
          <img src='/images/man-walking-dog.jpg' alt='' style={{width: '100%', height: '300px'}}/>
          <div className="t-dashboard">
            
            <Navbar getUsers={this.getUsers.bind(this)}
            toggleSearchBar={this.toggleSearchBar}/>
            <UsersList users={users}
              updateState={userData => updateState(userData)}/>
            <ClassesList classes={this.state.classes} search={search} />
          </div>
        </div>
      </div>
    );
  }
}

export default Teacher;
