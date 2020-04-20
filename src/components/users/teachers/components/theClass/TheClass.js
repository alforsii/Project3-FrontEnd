import React, { Component } from 'react';
import { AUTH_CLASSES } from '../../../../../services/classesAuth/ClassesAuth';
import ClassNav from './components/ClassNav'
import ClassStudents from './components/ClassStudents';
import Students from '../users/Students';
import Teachers from '../users/Teachers';
import ImageUploadForm from '../img-uploadForm/ImageForm'
import './TheClass.css';

export class TheClass extends Component {
  state = {
    students: this.props.location.state.currClass.students,
    filteredStudents: this.props.location.state.currClass.students,
    restStudents: null,
    restTeachers: null,
    teachers: [],
    parents: [],
    dashboardImg: ''
  };

  componentDidMount = async () => {
   await this.getClassStudents()
  };

  getClassStudents = async () => {
    //Get current class students id's to filter out from the main list of students
    const res = await AUTH_CLASSES.getClassStudents(this.props.location.state.currClass._id)

    this.setState(prevState => ({
      students: res.data.studentsData.students,
    filteredStudents: res.data.studentsData.students,
    }))
  }

  //get other students that are not in class yet
  getOtherStudents = async () => {
    const res = await AUTH_CLASSES.getOtherStudents(this.props.location.state.currClass._id)

    this.setState({
      restStudents: res.data.students,
    })
  };
  //get teachers
  getOtherTAs = async () => {
    const res = await AUTH_CLASSES.getOtherTAs(this.props.location.state.currClass._id)
    console.log("teachers", res.data.teachers)
    this.setState({
      restTeachers: res.data.teachers,
    })
  };

  //toggle userList
  toggleUserList = e => {
    const { id } = e.target;
    id === 'studentsBtn' ? this.getOtherStudents() : this.getOtherTAs()
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
    const searchResult = [...this.state.students].filter(data =>
      `${data.student.firstName} ${data.student.lastName}`.toUpperCase().includes(searchUser) 
      || `${data.student.email}`.toUpperCase().includes(searchUser)
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

  //handle cover Img
  handleCoverImg = e => {
    this.setState({ [e.target.name]: e.target.files[0]})
  }
  //handle cover Img submit
  handleCoverImgSubmit = async e => {
    e.preventDefault()
    const classId = this.props.location.state.currClass._id
    const newFile = new FormData()
    newFile.append('image', this.state.dashboardImg,this.state.dashboardImg.name)
    newFile.append('classId', classId)
    await AUTH_CLASSES.updateClassImg(newFile)
    this.inputForm = ''
    this.setState({dashboardImg: ''})
    this.props.history.push('/teachers-page')
    // this.props.context.isUserLoggedIn()
  }

  
  render() {
    const {
      currClass: { path },
      currClass
    } = this.props.location.state;
    const { updateState, displayForm, toggleClassNavDropdown } = this.props.context;
    const { filteredStudents, restStudents, restTeachers } = this.state
    return (
      <React.Fragment>
        <div className="main-class-page">
          <div className='left-class-page-div'>
            <div className="students-list class-students">
            <div className='cover-img-div'>
            <img className="cover-image" src={path} alt='' />
            <button onClick={displayForm} id='cover-img-upload-btn'>
                <span><i className="fas fa-camera"></i></span>
            </button>
          </div>
              
                <ClassStudents currClass={currClass}
                toggleClassNavDropdown={toggleClassNavDropdown}
                filteredStudents={filteredStudents}
                filterUsers={this.filterUsers}
                updateState={updateState}
                removeFromClass={this.removeFromClass}
                />
            </div>
          </div>
          <div className='right-class-page-div'>
            <div className="navbar-div">
              <ClassNav 
              toggleClassNavDropdown={toggleClassNavDropdown}
              toggleUserList={this.toggleUserList}
              />
            </div>
          </div>
        {/* <Sidebar/> */}
      </div>

{/*--------- below hidden user lists - appears on click -------------------*/}
      <div id="studentsList" className="userListMenu-content">
            { restStudents && <Students
              users={restStudents}
              // users={this.getUsers('Student')}
              updateState={updateState}
              addToClass={user => this.addToClass(user)}
              closeUserList={this.closeUserList}
              toggleClassNavDropdown={toggleClassNavDropdown}
              // classStudents={students.map(data => data.student._id)}
            />}
          </div>
          <div id="teachersList" className="userListMenu-content">
            { restTeachers && <Teachers
              users={restTeachers}
              updateState={updateState}
              addToClass={user => this.addToClass(user)}
              closeUserList={this.closeUserList}
            />}
          </div>
          <ImageUploadForm src={path}
            handleSubmit={this.handleCoverImgSubmit} 
            handleChange={this.handleCoverImg}
            inputForm={this.inputForm}
            displayForm={displayForm}
            />
            {/* <button onClick={displayForm} id='add-button' className="button is-primary dashboardImg-form">
            <i className="fas fa-camera"></i>
                    </button> */}
      </React.Fragment>
    );
  }
}

export default TheClass;
