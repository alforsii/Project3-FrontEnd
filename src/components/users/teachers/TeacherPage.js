import React, { Component } from 'react';

import MainClassNavbar from './components/navbar/mainClassNavbar/ClassNavbar';
import ClassesList from './components/classesList/ClassesList';
import DashboardSkeleton from './components/dashboardSkeleton/DashboardSkeleton';
import { AUTH_CLASSES } from '../../../services/classesAuth/ClassesAuth';
import AUTH_SERVICE from '../../../services/auth/AuthServices';

import './TeacherPage.css';

export class Teacher extends Component {
  state = {
    user: this.props.context.state.user,
    users: null,
    classes: null,
    filteredClasses: null,
    archiveClasses: null,
    filteredArchiveClasses: null,
    search: false,
    archive: false,
    navigate: 'classrooms',
    dashboardImg: '',
    isLoading: false,
    message: '',
  };
  componentDidMount = () => {
    this.getClasses();
  };
  //get all users
  getUsers = (title) => {
    this.setState((prevState) => ({
      users: this.props.context.state.users.filter(
        (user) => user.title === title
      ),
      search: false,
    }));
  };

  //update this state
  updateState = (data) => {
    this.setState(data);
  };

  //Get all classes
  getClasses = async () => {
    try {
      const res = await AUTH_CLASSES.getClasses();
      this.setState({
        classes: res.data.classes,
        filteredClasses: res.data.classes,
        archiveClasses: res.data.removedClasses,
        filteredArchiveClasses: res.data.removedClasses,
      });
    } catch (err) {
      console.log('Teacher -> getClasses -> err', err);
    }
  };

  //update state
  toggleSearchBar = () => {
    this.setState((prevState) => ({
      search: !prevState.search,
      users: null,
    }));
  };

  //Search for class
  searchForClass = (e) => {
    const searchingClass = this.state.classes.filter((theClass) =>
      theClass.name.toUpperCase().includes(e.target.value.toUpperCase())
    );
    this.setState({ filteredClasses: searchingClass });
  };
  //Search for class in archive
  searchForClassArchive = (e) => {
    const searchingClass = this.state.archiveClasses.filter((theClass) =>
      theClass.name.toUpperCase().includes(e.target.value.toUpperCase())
    );
    this.setState({ filteredArchiveClasses: searchingClass });
  };

  //Remove the class (move to archive not completely deleting)
  removeClass = async (classId) => {
    try {
      const res = await AUTH_CLASSES.removeClass({ classId });
      this.setState({
        classes: res.data.classes,
        filteredClasses: res.data.classes,
      });
    } catch (err) {
      console.log('Teacher -> removeClass -> err', err);
    }
  };

  //handle dashboardImg
  handleDashboardImg = (e) => {
    this.setState({ [e.target.name]: e.target.files[0] });
  };
  //handle dashboardImg submit
  handleDashboardImgSubmit = async (e) => {
    try {
      e.preventDefault();

      const newFile = new FormData();
      newFile.append(
        'image',
        this.state.dashboardImg,
        this.state.dashboardImg.name
      );
      const {
        data: { user },
      } = await AUTH_SERVICE.updateDashboardImg(newFile);

      this.props.context.updateState({ user });
      this.props.context.updateState({ message: 'Uploaded successfully!!!' });
    } catch (err) {
      this.props.context.displayError(err);
    }
  };
  render() {
    const {
      search,
      navigate,
      filteredClasses,
      filteredArchiveClasses,
    } = this.state;

    const {
      toggleClassNavDropdown,
      state: { user, isLoading },
    } = this.props.context;
    return (
      <div className="main-teacher">
        <div id="t-main" className="t-child-div">
          <div className="cover-img-div">
            <DashboardSkeleton
              isLoading={isLoading}
              title="Upload new Dashboard image"
              src={user?.dashboardImg}
              handleSubmit={this.handleDashboardImgSubmit}
              handleChange={this.handleDashboardImg}
              user={user}
            />
          </div>
          <div className="t-dashboard">
            <MainClassNavbar
              getUsers={this.getUsers.bind(this)}
              toggleClassNavDropdown={toggleClassNavDropdown}
              toggleSearchBar={this.toggleSearchBar}
              updateState={(data) => this.updateState(data)}
            />

            {navigate === 'archive' && (
              <ClassesList
                archive={true}
                classes={filteredArchiveClasses}
                toggleClassNavDropdown={toggleClassNavDropdown}
                searchForClass={this.searchForClassArchive}
                search={search}
              />
            )}

            {navigate === 'classrooms' && (
              <ClassesList
                archive={false}
                classes={filteredClasses}
                toggleClassNavDropdown={toggleClassNavDropdown}
                searchForClass={this.searchForClass}
                removeClass={(classId) => this.removeClass(classId)}
                search={search}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Teacher;
