import React, { Component } from 'react';
import { AUTH_CLASSES } from '../../../../../services/classesAuth/ClassesAuth';
import ClassNav from './components/ClassNav'
import ClassStudents from './components/ClassStudents';
import Students from '../users/Students';
import Teachers from '../users/Teachers';
import './TheClass.css';

export class TheClass extends Component {
  state = {
    students: this.props.location.state.currClass.students,
    filteredStudents: this.props.location.state.currClass.students,
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
      filteredStudents: searchResult,
    });
  };
  //Add student to class
  addToClass = async user => {
    const res = await AUTH_CLASSES.addStudent({
      userId: user._id,
      classId: this.props.location.state.currClass._id,
    });

    this.setState(prevState => ({
      students: [...prevState.students, res.data.studentFromDB],
      filteredStudents: [...prevState.students, res.data.studentFromDB],
    }));
  };

  //Remove a student from the class
  removeFromClass = async studentData => {
    const res = await AUTH_CLASSES.removeStudent({
      studentData,
      classId: this.props.location.state.currClass._id,
    });

    this.setState(prevState => ({
      students: res.data.updatedStudents,
      filteredStudents: res.data.updatedStudents,
    }));
  }

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
          <div className='left-class-page-div'>
            <div className="students-list class-students">
              <img className="cover-image" src={path} alt='' />
                <ClassStudents currClass={currClass}
                filteredStudents={this.state.filteredStudents}
                filterUsers={this.filterUsers}
                removeFromClass={this.removeFromClass}
                />
            </div>
          </div>
          <div className='right-class-page-div'>
            <div className="navbar-div">
              <ClassNav 
              toggleClassNavDropdown={this.toggleClassNavDropdown}
              toggleUserList={this.toggleUserList}/>
            </div>
          </div>
        {/* <Sidebar/> */}
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
