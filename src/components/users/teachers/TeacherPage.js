import React, { Component } from 'react';

import Navbar from './components/navbar/Navbar'
import Sidebar from '../../sidebar/SideBar';

import ClassesList from './components/classesList/ClassesList';
import ImageUploadForm from  './components/img-uploadForm/ImageForm'
import UsersList from './components/usersList/UsersList'

import { AUTH_CLASSES } from '../../../services/classesAuth/ClassesAuth';
import AUTH_SERVICE from '../../../services/auth/AuthServices';
import './TeacherPage.css';

export class Teacher extends Component {
  state = {
    users: null,
    classes: null,
    filteredClasses: null,
    archiveClasses: null,
    filteredArchiveClasses: null,
    search: false,
    archive: false,
    navigate: 'class-list',
    dashboardImg:''
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

  //update this state
  updateState = (data) => {
    this.setState(data)
  }

  //Get all classes
  getClasses = async () => {
    const res = await AUTH_CLASSES.getClasses();
    this.setState({ 
      classes: res.data.classes,
      filteredClasses: res.data.classes,
      archiveClasses: res.data.removedClasses,
      filteredArchiveClasses: res.data.removedClasses,
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
  //Search for class in archive
  searchForClassArchive = e => {
    const searchingClass = this.state.archiveClasses.filter(theClass => theClass.name.toUpperCase().includes(e.target.value.toUpperCase()))
    this.setState({ filteredArchiveClasses: searchingClass})
  }

  //Remove the class (move to archive not completely deleting)
  removeClass = async (classId) => {
    const res = await AUTH_CLASSES.removeClass({classId})
    this.setState({ 
      classes: res.data.classes,
      filteredClasses: res.data.classes,
    })
  }

  //handle dashboardImg
  handleDashboardImg = e => {
    this.setState({ [e.target.name]: e.target.files[0]})
  }
  //handle dashboardImg submit
  handleDashboardImgSubmit = async e => {
    e.preventDefault()
    const newFile = new FormData()
    newFile.append('image', this.state.dashboardImg,this.state.dashboardImg.name)
    await AUTH_SERVICE.updateDashboardImg(newFile)
    this.inputForm = ''
    this.setState({dashboardImg: ''})
    this.props.context.isUserLoggedIn()
  }
  render() {
    const { users, search, navigate, filteredClasses, filteredArchiveClasses } = this.state;

    const {
      updateState,
      toggleClassNavDropdown,
      displayForm,
      state: { user }
    } = this.props.context;
    return (
      <div className="main-teacher">
          <div id='t-side-menu' className="t-child-div">
            <Sidebar loggedIn={this.props.context.state.loggedIn} user={user}/>
          </div>

        <div id='t-main' className="t-child-div">
          <div className='cover-img-div'>
            <img id='cover-img' src={user.dashboardImg} alt=''/>
            <button onClick={displayForm} id='cover-img-upload-btn'>
                <span><i className="fas fa-camera"></i></span>
            </button>
          </div>
          <div className="t-dashboard">
            
            <Navbar getUsers={this.getUsers.bind(this)}
            toggleClassNavDropdown={this.props.context.toggleClassNavDropdown}
            toggleSearchBar={this.toggleSearchBar}
            updateState={data => this.updateState(data)}
            />
            { navigate === 'users-list' && <UsersList users={users}
              updateState={userData => updateState(userData)}
              />}
            
           { navigate === 'archive' &&  <ClassesList  archive={true}
            classes={filteredArchiveClasses} 
            toggleClassNavDropdown={toggleClassNavDropdown}
            searchForClass={this.searchForClassArchive}
            // removeClass={classId => this.removeClass(classId)}
           search={search} /> }
          { navigate === 'class-list' && <ClassesList archive={false}
          classes={filteredClasses} 
          toggleClassNavDropdown={toggleClassNavDropdown}
          searchForClass={this.searchForClass}
          removeClass={classId => this.removeClass(classId)}
          search={search} />
          }
          </div>
        </div>
        {/* ----------- position fixed or hidden  */}

        <ImageUploadForm src={user.dashboardImg}
            handleSubmit={this.handleDashboardImgSubmit} 
            handleChange={this.handleDashboardImg}
            inputForm={this.inputForm}
            displayForm={displayForm}
            />

      </div>
    );
  }
}

export default Teacher;
