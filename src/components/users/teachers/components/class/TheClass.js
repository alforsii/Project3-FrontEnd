import React, { Component } from 'react';
import { AUTH_CLASSES } from '../../../../../services/classesAuth/ClassesAuth';
import ClassNav from './ClassNav'
import ClassStudents from './ClassStudents';
import Students from '../users/Students';
import Teachers from '../users/Teachers';
import './TheClass.css';

export class TheClass extends Component {
  state = {
    students: this.props.location.state.currClass.students.map(
      data => data.student
    ),
    filterStudents: this.props.location.state.currClass.students.map(
      data => data.student
    ),
    teachers: [],
    parents: [],
    selectAllStudents: false,
  };
  //get users by title(TA,Student or Parent)
  getUsers = title => {
    return this.props.context.state.users.filter(user => user.title === title);
  };
  /* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
  toggleClassNavDropdown = () => {
    const buttons = document.querySelectorAll('.classNavDropdown');
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].classList.toggle('show');
    }
  };
  //toggle userList
  toggleUserList = e => {
    const { id } = e.target;
    this.closeUserList();
    return id === 'studentsBtn'
      ? document.getElementById('studentsList').classList.toggle('show')
      : id === 'teachersBtn'
      ? document.getElementById('teachersList').classList.toggle('show')
      : '';
  };
  //close user list
  closeUserList = () => {
    const dropdowns = document.getElementsByClassName('userListMenu-content');
    for (let i = 0; i < dropdowns.length; i++) {
      const openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  };
  //Search user
  filterUsers = e => {
    const searchUser = e.target.value.toUpperCase();
    const searchResult = [...this.state.students].filter(user =>
      `${user.firstName} ${user.lastName}`
        .toUpperCase()
        .includes(searchUser.toUpperCase())
    );
    this.setState({
      filterStudents: searchResult,
    });
  };
  //Add student to class
  addToClass = async user => {
    const res = await AUTH_CLASSES.addStudent({
      userId: user._id,
      classId: this.props.location.state.currClass._id,
    });

    this.setState(prevState => ({
      students: [...prevState.students, res.data.student.student],
      filterStudents: [...prevState.students, res.data.student.student],
    }));
  };

  componentDidMount = () => {
    // this.getStudents()
  };

  render() {
    const {
      currClass: { path },
      currClass
    } = this.props.location.state;
    const {updateState} = this.props.context;

    return (
      <React.Fragment>
        <div className="main-class-page">
        <div className="navbar-div">
          <ClassNav currClass={currClass}
          toggleClassNavDropdown={this.toggleClassNavDropdown}
          toggleUserList={this.toggleUserList}/>
          </div>
      
        <div className="students-list class-students">
            <img className="cover-image" src={path} alt="" />
            <ClassStudents filterStudents={this.state.filterStudents}
            filterUsers={this.filterUsers}
             />
        </div>
      </div>

{/*--------- below hidden user lists - appears on click -------------------*/}
      <div id="studentsList" className="userListMenu-content">
            <Students
              users={this.getUsers('Student')}
              updateState={updateState}
              addToClass={user => this.addToClass(user)}
              closeUserList={this.closeUserList}
            />
          </div>
          <div id="teachersList" className="userListMenu-content">
            <Teachers
              users={this.getUsers('TA')}
              updateState={updateState}
              addToClass={user => this.addToClass(user)}
              closeUserList={this.closeUserList}
            />
          </div>
      </React.Fragment>
    );
  }
}

export default TheClass;
