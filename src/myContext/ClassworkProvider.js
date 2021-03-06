import React, { Component, createContext } from 'react';
import { withRouter } from 'react-router-dom';

import { AUTH_CLASSES } from '../services/classesAuth/ClassesAuth';
import { AuthContext } from './AuthProvider';
export const ClassworkContext = createContext();

export class ClassworkProvider extends Component {
  state = {
    currClass: this.props?.location.state?.currClass,
    classrooms: this.props.location.state?.classrooms,
    coverImage: this.props.location.state?.currClass?.path,
    students: this.props.location.state?.currClass?.students,
    teachers: this.props.location.state?.currClass?.teachers,
    restStudents: null,
    restTeachers: null,
    parents: [],
    dashboardImg: '',
    displayUsers: true,
    defaultPage: 'works',
    message: '',
  };

  getClassData = async (id) => {
    //Get current class students id's to filter out from the main list of students
    try {
      const {
        data: {
          currentClass: { students },
        },
      } = await AUTH_CLASSES.getClassStudents(id);
      const {
        data: {
          currentClass: { teachers },
          currentClass,
        },
      } = await AUTH_CLASSES.getClassTAs(id);

      this.setState((prevState) => ({
        currClass: currentClass,
        coverImage: currentClass.path,
        students:
          students?.sort((a, b) => (a.firstName > b.firstName ? 1 : -1)) || [],
        teachers:
          teachers?.sort((a, b) => (a.firstName > b.firstName ? 1 : -1)) || [],
      }));
      console.log(this.state);
    } catch (err) {
      console.log('TheClass -> getClassData -> err', err);
    }
  };

  //get other students that are not in class yet
  getOtherStudents = async () => {
    try {
      const {
        data: { students },
      } = await AUTH_CLASSES.getOtherStudents(this.state.currClass._id);

      this.setState({
        restStudents: students?.sort((a, b) =>
          a.firstName > b.firstName ? 1 : -1
        ),
      });
    } catch (err) {
      console.log('ClassworkProvider -> getOtherStudents -> err', err);
    }
  };
  //get teachers
  getOtherTAs = async () => {
    try {
      const {
        data: { teachers },
      } = await AUTH_CLASSES.getOtherTAs(this.state.currClass._id);

      this.setState({
        restTeachers: teachers?.sort((a, b) =>
          a.firstName > b.firstName ? 1 : -1
        ),
      });
    } catch (err) {
      console.log('ClassworkProvider -> getOtherTAs -> err', err);
    }
  };

  //toggle userList
  toggleUserList = async (users) => {
    try {
      // const { id } = e.target.closest('button');
      if (users === 'students') {
        await this.getOtherStudents();
        document.getElementById('studentsList').classList.toggle('show');
      }
      if (users === 'teachers') {
        await this.getOtherTAs();
        document.getElementById('teachersList').classList.toggle('show');
      }
    } catch (err) {
      console.log(err);
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

  //Add student to class
  addToClass = async (user) => {
    try {
      if (user.title === 'Student') {
        const {
          data: { studentFromDB },
        } = await AUTH_CLASSES.addStudent({
          userId: user._id,
          classId: this.state.currClass._id,
        });
        //   await this.getOtherStudents();
        this.setState((prevState) => ({
          students: [...prevState.students, studentFromDB].sort((a, b) =>
            a.firstName > b.firstName ? 1 : -1
          ),
        }));
      }
      if (user.title === 'Teacher') {
        const {
          data: { teacherFromDB },
        } = await AUTH_CLASSES.addTeacher({
          userId: user._id,
          classId: this.state.currClass._id,
        });
        //   await this.getOtherTAs();
        this.setState((prevState) => ({
          teachers: [...prevState.teachers, teacherFromDB].sort((a, b) =>
            a.firstName > b.firstName ? 1 : -1
          ),
        }));
      }
    } catch (err) {
      console.log(err);
    }
  };

  //Remove a student from the class
  removeFromClass = async (user) => {
    try {
      if (user.title === 'Student') {
        const res = await AUTH_CLASSES.removeStudent({
          studentData: user,
          classId: this.state.currClass._id,
        });
        //   await this.getOtherStudents();
        this.setState((prevState) => ({
          students: res.data.updatedStudents.sort((a, b) =>
            a.firstName > b.firstName ? 1 : -1
          ),
        }));
      }
      if (user.title === 'Teacher') {
        const res = await AUTH_CLASSES.removeTeacher({
          teacherData: user,
          classId: this.state.currClass._id,
        });
        //   await this.getOtherTAs();
        this.setState((prevState) => ({
          teachers: res.data.updatedTeachers.sort((a, b) =>
            a.firstName > b.firstName ? 1 : -1
          ),
        }));
      }
    } catch (err) {
      console.log(err);
    }
  };

  //handle cover Img
  handleCoverImg = (e) => {
    this.setState({ [e.target.name]: e.target.files[0] });
  };
  //handle cover Img submit
  handleCoverImgSubmit = async (e) => {
    e.preventDefault();
    try {
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

      this.setState((prevState) => ({
        coverImage: path,
        dashboardImg: '',
      }));
    } catch (err) {
      console.log(err);
    }
  };
  //switch default page
  switchDefaultPage = (page) => {
    this.setState({ defaultPage: page });
  };

  render() {
    const {
      getClassData,
      getOtherStudents,
      getOtherTAs,
      toggleUserList,
      closeUserList,
      addToClass,
      removeFromClass,
      handleCoverImg,
      handleCoverImgSubmit,
      switchDefaultPage,
    } = this;
    const classworkState = this.state;
    const { state } = this.context;
    return (
      <ClassworkContext.Provider
        value={{
          state,
          context: this.context,
          classworkState,
          getClassData,
          getOtherStudents,
          getOtherTAs,
          toggleUserList,
          closeUserList,
          addToClass,
          removeFromClass,
          handleCoverImg,
          handleCoverImgSubmit,
          switchDefaultPage,
        }}
      >
        {this.props.children}
      </ClassworkContext.Provider>
    );
  }
}

export default withRouter(ClassworkProvider);
ClassworkProvider.contextType = AuthContext;
