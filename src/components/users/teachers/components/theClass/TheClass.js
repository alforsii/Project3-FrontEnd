import React, { Component } from 'react';
import { SnackbarProvider, useSnackbar } from 'notistack';

import { AUTH_CLASSES } from '../../../../../services/classesAuth/ClassesAuth';
import ClassNavbar from './components/classNavbar/ClassNavbar';
import ClassPosts from './components/classPosts/ClassPosts'
import ClassWork from './components/classWork/ClassWork'
import ClassConnections from './components/ClassConnections/ClassConnections'
import ImageUploadForm from '../img-uploadForm/ImageForm';
import Snackbar from '../../../../auth/snackbar/Snackbar'
import Notification from '../../../../auth/snackbar/Notification'

import './TheClass.css';

export class TheClass extends Component {
  state = {
    currClass: this.props.location.state.currClass,
    coverImage: this.props.location.state.currClass.path,
    students: this.props.location.state.currClass.students,
    filteredStudents: this.props.location.state.currClass.students,
    teachers: this.props.location.state.currClass.teachers,
    filteredTeachers: this.props.location.state.currClass.teachers,
    restStudents: null,
    restTeachers: null,
    parents: [],
    dashboardImg: '',
    displayUsers: true,
    defaultPage: 'works',
    message: '',
  };

  componentDidMount = async () => {
    await this.getClassUsers();
  };

  getClassUsers = async () => {
    //Get current class students id's to filter out from the main list of students
    const {
      data: {
        currentClass: { students },
      },
    } = await AUTH_CLASSES.getClassStudents(this.state.currClass._id);
    const {
      data: {
        currentClass: { teachers },
        currentClass,
      },
    } = await AUTH_CLASSES.getClassTAs(this.state.currClass._id);

    this.setState(prevState => ({
      currClass: currentClass,
      coverImage: currentClass.path,
      students: students.sort((a,b) => a.firstName > b.firstName ? 1 : -1),
      filteredStudents: students.sort((a,b) => a.firstName > b.firstName ? 1 : -1),
      teachers: teachers.sort((a,b) => a.firstName > b.firstName ? 1 : -1),
      filteredTeachers: teachers.sort((a,b) => a.firstName > b.firstName ? 1 : -1),
    }));
  };

  //get other students that are not in class yet
  getOtherStudents = async () => {
    const {
      data: { students },
    } = await AUTH_CLASSES.getOtherStudents(this.state.currClass._id);

    this.setState({
      restStudents: students.sort((a,b) => a.firstName > b.firstName ? 1 : -1),
    });
  };
  //get teachers
  getOtherTAs = async () => {
    const {
      data: { teachers },
    } = await AUTH_CLASSES.getOtherTAs(this.state.currClass._id);

    this.setState({
      restTeachers: teachers.sort((a,b) => a.firstName > b.firstName ? 1 : -1),
    });
  };

  //toggle userList
  toggleUserList = e => {

    const { id } = e.target.closest('button');
    this.closeUserList();
    if (id === 'studentsBtn') {
      this.getOtherStudents();
      document.getElementById('studentsList').classList.toggle('show');
    }
    if (id === 'teachersBtn') {
      this.getOtherTAs();
      document.getElementById('teachersList').classList.toggle('show');
    }
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
    let searchResult;
    const searchUser = e.target.value.toUpperCase();
    if (this.state.displayUsers) {
      searchResult = [...this.state.students].filter(
        student =>
          `${student.firstName} ${student.lastName}`
            .toUpperCase()
            .includes(searchUser) ||
          `${student.email}`.toUpperCase().includes(searchUser)
      );
      this.setState({
        filteredStudents: searchResult,
      });
    } else {
      searchResult = [...this.state.teachers].filter(
        teacher =>
          `${teacher.firstName} ${teacher.lastName}`
            .toUpperCase()
            .includes(searchUser) ||
          `${teacher.email}`.toUpperCase().includes(searchUser)
      );
      this.setState({
        filteredTeachers: searchResult,
      });
    }
  };

  //Add student to class
  addToClass = async user => {
    if (user.title === 'Student') {
      const {
        data: { studentFromDB },
      } = await AUTH_CLASSES.addStudent({
        userId: user._id,
        classId: this.state.currClass._id,
      });
      this.setState(prevState => ({
        students: [...prevState.students, studentFromDB].sort((a,b) => a.firstName > b.firstName ? 1 : -1),
        filteredStudents: [...prevState.students, studentFromDB].sort((a,b) => a.firstName > b.firstName ? 1 : -1),
      }));
    }
    if (user.title === 'TA') {
      const {
        data: { teacherFromDB },
      } = await AUTH_CLASSES.addTeacher({
        userId: user._id,
        classId: this.state.currClass._id,
      });
      this.setState(prevState => ({
        teachers: [...prevState.teachers, teacherFromDB].sort((a,b) => a.firstName > b.firstName ? 1 : -1),
        filteredTeachers: [...prevState.teachers, teacherFromDB].sort((a,b) => a.firstName > b.firstName ? 1 : -1),
      }));
    }
  };

  //Remove a student from the class
  removeFromClass = async user => {
    if (user.title === 'Student') {
      const res = await AUTH_CLASSES.removeStudent({
        studentData: user,
        classId: this.state.currClass._id,
      });

      this.setState(prevState => ({
        students: res.data.updatedStudents.sort((a,b) => a.firstName > b.firstName ? 1 : -1),
        filteredStudents: res.data.updatedStudents.sort((a,b) => a.firstName > b.firstName ? 1 : -1),
      }));
      
    }
    if (user.title === 'TA') {
      const res = await AUTH_CLASSES.removeTeacher({
        teacherData: user,
        classId: this.state.currClass._id,
      });

      this.setState(prevState => ({
        teachers: res.data.updatedTeachers.sort((a,b) => a.firstName > b.firstName ? 1 : -1),
        filteredTeachers: res.data.updatedTeachers.sort((a,b) => a.firstName > b.firstName ? 1 : -1),
      }));
    }
  };

  //handle cover Img
  handleCoverImg = e => {
    this.setState({ [e.target.name]: e.target.files[0] });
  };
  //handle cover Img submit
  handleCoverImgSubmit = async e => {
    e.preventDefault();
    this.setState({ isLoading: true, coverImage: false });
    const newFile = new FormData();
    newFile.append(
      'image',
      this.state.dashboardImg,
      this.state.dashboardImg.name
    );
    newFile.append('classId', this.state.currClass._id);
    const {
      data: {
        class: { path },
      },
    } = await AUTH_CLASSES.updateClassImg(newFile);
    this.inputForm = '';

    this.setState(prevState => ({
      coverImage: path,
      dashboardImg: '',
    }));
  };
  //when switched reset filtered list to default 0
  switchUsersList = () => {
    this.setState(prevState => ({
      displayUsers: !prevState.displayUsers,
      filteredStudents: prevState.students,
      filteredTeachers: prevState.teachers,
    }));
  };

  //switch default page
  switchDefaultPage = (page) => {
    this.setState({ defaultPage: page })
  }
  render() {
    const {
      updateState,
      displayForm,
      toggleClassNavDropdown,
    } = this.props.context;
    const {
      currClass,
      filteredStudents,
      filteredTeachers,
      restStudents,
      restTeachers,
      coverImage,
      displayUsers,
      defaultPage
    } = this.state;
    return (
      <React.Fragment>
        <div className="main-class-page">
          <aside className="left-class-page-div">
            <div className="class-aside">
              <div className="cover-img-div">
                {coverImage ? (
                  <img className="cover-image" src={coverImage} alt="" />
                ) : (
                  <h4>loading...</h4>
                )}
                <button onClick={displayForm} id="cover-img-upload-btn">
                  <span>
                    <i className="fas fa-camera"></i>
                  </span>
                </button>
              </div>
            </div>
            <div className="work-notifications-div">
              <h4> {currClass.name} </h4>
              <h4>grade: {currClass.grade} </h4>
              <p>No upcoming work due...</p>
            </div>
          </aside>
          <div className="right-class-page-div">
            <div className="navbar-div">
              <ClassNavbar 
              switchDefaultPage={this.switchDefaultPage}
              />
            </div>
            <Snackbar/>
            {defaultPage === 'posts' && <ClassPosts/>}
            {defaultPage === 'works' && <ClassWork
            displayForm={displayForm}
            toggleClassNavDropdown={toggleClassNavDropdown}/>}
              {defaultPage === 'users' 
              && <ClassConnections
              displayUsers={displayUsers}
              switchUsersList={this.switchUsersList}
              toggleClassNavDropdown={toggleClassNavDropdown}
              toggleUserList={this.toggleUserList}
              currClass={currClass}
              filteredStudents={filteredStudents}
              filteredTeachers={filteredTeachers}
              filterUsers={this.filterUsers}
              updateState={updateState}
              removeFromClass={user => this.removeFromClass(user)}
              restStudents={restStudents}
              restTeachers={restTeachers}
              addToClass={user => this.addToClass(user)}
              closeUserList={this.closeUserList}
              />}
          </div>
        </div>

        {/*--------- below hidden user lists - appears on click -------------------*/}
        <ImageUploadForm
          src={coverImage ? coverImage : ''}
          handleSubmit={this.handleCoverImgSubmit}
          handleChange={this.handleCoverImg}
          inputForm={this.inputForm}
          displayForm={displayForm}
        />
      </React.Fragment>
    );
  }
}

export default TheClass;
