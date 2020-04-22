import React, { Component } from 'react';
import { AUTH_CLASSES } from '../../../../../services/classesAuth/ClassesAuth';
import ClassNav from './components/ClassNav'
import ClassStudents from './components/ClassUsers';
import ClassTeachers from './components/ClassUsers';
import Students from '../users/Students';
import Teachers from '../users/Teachers';
import ImageUploadForm from '../img-uploadForm/ImageForm'
import SwitchButton from './components/switchModeButton/SwitchButton'
import PageMessage from './components/PageMessage'
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
  };

  componentDidMount = async () => {
   await this.getClassUsers()
  };

  getClassUsers = async () => {
    //Get current class students id's to filter out from the main list of students
    const {data: {currentClass: {students}}} = await AUTH_CLASSES.getClassStudents(this.state.currClass._id)
    const {data: {currentClass: {teachers}, currentClass}} = await AUTH_CLASSES.getClassTAs(this.state.currClass._id)

    this.setState(prevState => ({
      currClass: currentClass,
      coverImage: currentClass.path,
      students,
      filteredStudents: students,
      teachers,
      filteredTeachers: teachers,
    }))
  }

  //get other students that are not in class yet
  getOtherStudents = async () => {
    const {data: {students}} = await AUTH_CLASSES.getOtherStudents(this.state.currClass._id)

    this.setState({
      restStudents: students,
    })
  };
  //get teachers
  getOtherTAs = async () => {
    const {data: {teachers}} = await AUTH_CLASSES.getOtherTAs(this.state.currClass._id)

    this.setState({
      restTeachers: teachers,
    })
  };

  //toggle userList
  toggleUserList = e => {
    const { id } = e.target;
    this.closeUserList();
    if(id === 'studentsBtn'){
      this.getOtherStudents() 
      document.getElementById('studentsList').classList.toggle('show')
    }
    if(id === 'teachersBtn') {
      this.getOtherTAs()
      document.getElementById('teachersList').classList.toggle('show')
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
    if(this.state.displayUsers){
      searchResult = [...this.state.students].filter(student =>
        `${student.firstName} ${student.lastName}`.toUpperCase().includes(searchUser) 
        || `${student.email}`.toUpperCase().includes(searchUser)
        );
        this.setState({
          filteredStudents: searchResult,
        });
    }else {
      searchResult = [...this.state.teachers].filter(teacher =>
        `${teacher.firstName} ${teacher.lastName}`.toUpperCase().includes(searchUser) 
        || `${teacher.email}`.toUpperCase().includes(searchUser)
        );
        this.setState({
          filteredTeachers: searchResult,
        });
    }
    
  };
  //Add student to class
  addToClass = async user => {
    if(user.title === 'Student'){
      const {data: {studentFromDB}} = await AUTH_CLASSES.addStudent({
        userId: user._id,
        classId: this.state.currClass._id,
      });
  
      this.setState(prevState => ({
        students: [...prevState.students, studentFromDB],
        filteredStudents: [...prevState.students, studentFromDB],
      }));
    }
    if(user.title === 'TA'){
      const {data: {teacherFromDB}} = await AUTH_CLASSES.addTeacher({
        userId: user._id,
        classId: this.state.currClass._id,
      });
  
      this.setState(prevState => ({
        teachers: [...prevState.teachers, teacherFromDB],
        filteredTeachers: [...prevState.teachers, teacherFromDB],
      }));
    }
  };

  //Remove a student from the class
  removeFromClass = async user => {
    if(user.title === 'Student') {
      const res = await AUTH_CLASSES.removeStudent({
        studentData: user,
        classId: this.state.currClass._id,
      });
  
      this.setState(prevState => ({
        students: res.data.updatedStudents,
        filteredStudents: res.data.updatedStudents,
      }));
    }
    if(user.title === 'TA') {
      const res = await AUTH_CLASSES.removeTeacher({
        teacherData: user,
        classId: this.state.currClass._id,
      });
  
      this.setState(prevState => ({
        teachers: res.data.updatedTeachers,
        filteredTeachers: res.data.updatedTeachers,
      }));
    }
  }

  //handle cover Img
  handleCoverImg = e => {
    this.setState({ [e.target.name]: e.target.files[0]})
  }
  //handle cover Img submit
  handleCoverImgSubmit = async e => {
    e.preventDefault()
    this.setState({ isLoading: true, coverImage: false})
    const newFile = new FormData()
    newFile.append('image', this.state.dashboardImg,this.state.dashboardImg.name)
    newFile.append('classId', this.state.currClass._id)
    const {data: {class: {path}}} = await AUTH_CLASSES.updateClassImg(newFile)
    this.inputForm = ''

    this.setState(prevState => ({
      coverImage: path,
      dashboardImg: ''
    }))
  }
  //
  switchUsersList = () => {
    this.setState(prevState => ({
      displayUsers: !prevState.displayUsers,
      filteredStudents: prevState.students,
      filteredTeachers: prevState.teachers,
    }))
  }
  
  render() {
    const { updateState, displayForm, toggleClassNavDropdown } = this.props.context;
    const { currClass,filteredStudents, filteredTeachers, restStudents, 
      restTeachers, coverImage, displayUsers } = this.state
    return (
      <React.Fragment>
        <div className="main-class-page">
          <div className='left-class-page-div'>
            <div className="students-list class-students">
            <div className='cover-img-div'>
            {/* {(isLoading) && <h4>loading...</h4>} */}
            {coverImage ? <img className="cover-image" src={coverImage} alt='' />
            : <h4>loading...</h4>}
            <button onClick={displayForm} id='cover-img-upload-btn'>
                <span><i className="fas fa-camera"></i></span>
            </button>
          </div>
              <p>{<SwitchButton switchUsersList={this.switchUsersList}/>}</p>

                { displayUsers? <ClassStudents currClass={currClass}
                toggleClassNavDropdown={toggleClassNavDropdown}
                users={filteredStudents}
                filterUsers={this.filterUsers}
                updateState={updateState}
                removeFromClass={this.removeFromClass}
                />
                : <ClassTeachers currClass={currClass}
                toggleClassNavDropdown={toggleClassNavDropdown}
                users={filteredTeachers}
                filterUsers={this.filterUsers}
                updateState={updateState}
                removeFromClass={this.removeFromClass}
                />}
            </div>
          </div>
          <div className='right-class-page-div'>
            <div className="navbar-div">
              <ClassNav 
              toggleClassNavDropdown={toggleClassNavDropdown}
              toggleUserList={this.toggleUserList}
              />
            </div>
            <PageMessage/>
          </div>
      </div>

{/*--------- below hidden user lists - appears on click -------------------*/}
      <div id="studentsList" className="userListMenu-content">
            { restStudents && <Students
              users={restStudents}
              updateState={updateState}
              addToClass={user => this.addToClass(user)}
              closeUserList={this.closeUserList}
              toggleClassNavDropdown={toggleClassNavDropdown}
            />}
          </div>
          <div id="teachersList" className="userListMenu-content">
            { restTeachers && <Teachers
              users={restTeachers}
              updateState={updateState}
              addToClass={user => this.addToClass(user)}
              closeUserList={this.closeUserList}
              toggleClassNavDropdown={toggleClassNavDropdown}
            />}
          </div>
          <ImageUploadForm src={coverImage?coverImage: ''}
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