import React, { Component } from 'react';

import Navbar from './components/navbar/Navbar'
import Sidebar from '../../sidebar/SideBar';
// import Sidebar from './components/Sidebar';
import ClassesList from './components/classesList/ClassesList';
import UsersList from './components/usersList/UsersList'

import { AUTH_CLASSES } from '../../../services/classesAuth/ClassesAuth';
import './TeacherPage.css';

export class Teacher extends Component {
  state = {
    users: null,
    classes: null,
    filteredClasses: null,
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
    this.setState({ 
      classes: res.data.classes,
      filteredClasses: res.data.classes
     });
  };

  //update state
  toggleSearchBar = () => {
    this.setState(prevState => ({
      search: !prevState.search,
      users: null
    }))
  }

  //Search for class
  searchForClass = e => {
    const searchingClass = this.state.classes.filter(theClass => theClass.name.toUpperCase().includes(e.target.value.toUpperCase()))
    this.setState({ filteredClasses: searchingClass})
  }

  //Remove the class (move to archive not completely deleting)
  removeClass = async (classId) => {
    const res = await AUTH_CLASSES.removeClass({classId})
    this.setState({ 
      classes: res.data.classes,
      filteredClasses: res.data.classes,
    })
  }

  render() {
    const { users, search, filteredClasses } = this.state;
    console.log("Output for: Teacher -> render -> filteredClasses", filteredClasses)
    const {
      updateState,
      toggleClassNavDropdown,
      state: { user }
    } = this.props.context;
    return (
      <div className="main-teacher">
          <div id='t-side-menu' className="t-child-div">
            <Sidebar loggedIn={this.props.context.state.loggedIn} user={user}/>
          </div>

        <div id='t-main' className="t-child-div">
          <img src='/images/man-walking-dog.jpg' alt='' style={{width: '100%', height: '300px'}}/>
          <div className="t-dashboard">
            
            <Navbar getUsers={this.getUsers.bind(this)}
            toggleSearchBar={this.toggleSearchBar}/>
            <UsersList users={users}
              updateState={userData => updateState(userData)}/>
            <ClassesList classes={filteredClasses} 
            toggleClassNavDropdown={toggleClassNavDropdown}
            searchForClass={this.searchForClass}
            removeClass={classId => this.removeClass(classId)}
            search={search} />
          </div>
        </div>
      </div>
    );
  }
}

export default Teacher;
