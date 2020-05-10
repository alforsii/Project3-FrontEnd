import React, { Component } from 'react';

// import { AUTH_CLASSES } from '../../../../../services/classesAuth/ClassesAuth';
import {ClassworkContext} from '../../../../../myContext/ClassworkProvider'
// import {MessageContext} from '../../../../../myContext/MessageProvider'
import ClassNavbar from './components/classNavbar/ClassNavbar';
import ClassPosts from './components/classPosts/ClassPosts'
import ClassWork from './components/classWork/ClassWork'
import ClassConnections from './components/ClassConnections/ClassConnections'
import ClassAlbums from './components/classAlbums/ClassAlbums'
// import ImageUploadForm from '../img-uploadForm/ImageForm';
// import NewImageUploadForm from '../img-uploadForm/NewImageUploadForm'

import './TheClass.css';

export class TheClass extends Component {
  state = {
    // currClass: this.props.location.state.currClass,
    // classrooms: this.props.location.state.classrooms,
    // classworks: [],
    // coverImage: this.props.location.state.currClass.path,
    // students: this.props.location.state.currClass.students,
    // teachers: this.props.location.state.currClass.teachers,
    // restStudents: null,
    // restTeachers: null,
    // parents: [],
    // dashboardImg: '',
    // displayUsers: true,
    // defaultPage: 'works',
    // message: '',
  };

   componentDidMount(){
   this.context.getClassData();
   this.props.handleDrawerOpen()
  };

  // getClassData = async () => {
  //   const {_id} = this.props.location.state.currClass
  //   //Get current class students id's to filter out from the main list of students
  //   try {
  //     const {
  //       data: {
  //         currentClass: { students },
  //       },
  //     } = await AUTH_CLASSES.getClassStudents(_id);
  //     const {
  //       data: {
  //         currentClass: { teachers },
  //         currentClass,
  //       },
  //     } = await AUTH_CLASSES.getClassTAs(_id);
  //     const {
  //       data: {
  //         classworks
  //       },
  //     } = await AUTH_CLASSES.getClassworks(_id);
  
  //     this.setState(prevState => ({
  //       currClass: currentClass,
  //       classworks,
  //       coverImage: currentClass.path,
  //       students: students.sort((a,b) => a.firstName > b.firstName ? 1 : -1),
  //       filteredStudents: students.sort((a,b) => a.firstName > b.firstName ? 1 : -1),
  //       teachers: teachers.sort((a,b) => a.firstName > b.firstName ? 1 : -1),
  //       filteredTeachers: teachers.sort((a,b) => a.firstName > b.firstName ? 1 : -1),
  //     }));
  //   } catch (err) {
  //   console.log("TheClass -> getClassData -> err", err)
  //   }
  // };

  // //get other students that are not in class yet
  // getOtherStudents = async () => {
  //   const {
  //     data: { students },
  //   } = await AUTH_CLASSES.getOtherStudents(this.state.currClass._id);
    
  //   this.setState({
  //     restStudents: students.sort((a,b) => a.firstName > b.firstName ? 1 : -1),
  //   });
  // };
  // //get teachers
  // getOtherTAs = async () => {
  //   const {
  //     data: { teachers },
  //   } = await AUTH_CLASSES.getOtherTAs(this.state.currClass._id);

  //   this.setState({
  //     restTeachers: teachers.sort((a,b) => a.firstName > b.firstName ? 1 : -1),
  //   });
  // };

  // //toggle userList
  // toggleUserList = async e => {

  //   const { id } = e.target.closest('button');
  //   // this.closeUserList();
  //   if (id === 'studentsBtn') {
  //    await this.getOtherStudents();
  //     document.getElementById('studentsList').classList.toggle('show');
  //   }
  //   if (id === 'teachersBtn') {
  //    await this.getOtherTAs();
  //     document.getElementById('teachersList').classList.toggle('show');
  //   }
  // };
  // //close user list
  // closeUserList = () => {
  //   const dropdowns = document.getElementsByClassName('userListMenu-content');
  //   for (let i = 0; i < dropdowns.length; i++) {
  //     const openDropdown = dropdowns[i];
  //     if (openDropdown.classList.contains('show')) {
  //       openDropdown.classList.remove('show');
  //     }
  //   }
  // };

  // //Add student to class
  // addToClass = async user => {
  //   if (user.title === 'Student') {
  //     const {
  //       data: { studentFromDB },
  //     } = await AUTH_CLASSES.addStudent({
  //       userId: user._id,
  //       classId: this.state.currClass._id,
  //     });
  //     this.setState(prevState => ({
  //       students: [...prevState.students, studentFromDB].sort((a,b) => a.firstName > b.firstName ? 1 : -1),
  //     }));
  //   }
  //   if (user.title === 'TA') {
  //     const {
  //       data: { teacherFromDB },
  //     } = await AUTH_CLASSES.addTeacher({
  //       userId: user._id,
  //       classId: this.state.currClass._id,
  //     });
  //     this.setState(prevState => ({
  //       teachers: [...prevState.teachers, teacherFromDB].sort((a,b) => a.firstName > b.firstName ? 1 : -1),
  //     }));
  //   }
  // };

  // //Remove a student from the class
  // removeFromClass = async user => {
  //   if (user.title === 'Student') {
  //     const res = await AUTH_CLASSES.removeStudent({
  //       studentData: user,
  //       classId: this.state.currClass._id,
  //     });

  //     this.setState(prevState => ({
  //       students: res.data.updatedStudents.sort((a,b) => a.firstName > b.firstName ? 1 : -1),
  //       filteredStudents: res.data.updatedStudents.sort((a,b) => a.firstName > b.firstName ? 1 : -1),
  //     }));
      
  //   }
  //   if (user.title === 'TA') {
  //     const res = await AUTH_CLASSES.removeTeacher({
  //       teacherData: user,
  //       classId: this.state.currClass._id,
  //     });

  //     this.setState(prevState => ({
  //       teachers: res.data.updatedTeachers.sort((a,b) => a.firstName > b.firstName ? 1 : -1),
  //       filteredTeachers: res.data.updatedTeachers.sort((a,b) => a.firstName > b.firstName ? 1 : -1),
  //     }));
  //   }
  // };

  // //handle cover Img
  // handleCoverImg = e => {
  //   this.setState({ [e.target.name]: e.target.files[0] });
  // };
  // //handle cover Img submit
  // handleCoverImgSubmit = async e => {
  //   e.preventDefault();
  //   this.setState({ isLoading: true, coverImage: false });
  //   const newFile = new FormData();
  //   newFile.append(
  //     'image',
  //     this.state.dashboardImg,
  //     this.state.dashboardImg.name
  //   );
  //   newFile.append('classId', this.state.currClass._id);
  //   const {
  //     data: {
  //       class: { path },
  //     },
  //   } = await AUTH_CLASSES.updateClassImg(newFile);
  //   this.inputForm = '';

  //   this.setState(prevState => ({
  //     coverImage: path,
  //     dashboardImg: '',
  //   }));
  // };
  // //switch default page
  // switchDefaultPage = (page) => {
  //   this.setState({ defaultPage: page })
  // }
  render() {
    const {
      // displayForm,
      state:{ users}
    } = this.props.context;
    const {
      // currClass,
      // classworks,
      students,
      teachers,
      // classrooms,
      restStudents,
      restTeachers,
      // coverImage,
      defaultPage,
    } = this.context.classworkState;
    const { currClass } = this.props.location.state
    console.log("Output for: TheClass -> render -> this.props", this.props)
    const { toggleUserList, addToClass,
      closeUserList, removeFromClass, switchDefaultPage,
      updateState } = this.context
      
    return (
      <React.Fragment>
        <div className="main-class-page">
            <ClassNavbar switchDefaultPage={switchDefaultPage}/>

            {defaultPage === 'posts' && <ClassPosts/>}

            {defaultPage === 'works' && <ClassWork currClass={currClass}/>}

              {defaultPage === 'users' 
              && <ClassConnections
              toggleUserList={toggleUserList}
              closeUserList={closeUserList}
              currClass={currClass}
              students={students}
              teachers={teachers}
              updateState={updateState}
              removeFromClass={user => removeFromClass(user)}
              restStudents={restStudents}
              restTeachers={restTeachers}
              addToClass={user => addToClass(user)}
              />}

              { defaultPage === 'albums' && <ClassAlbums users={users}/>}
        </div>

        {/*--------- below hidden user lists - appears on click -------------------*/}
        {/* <ImageUploadForm
          src={coverImage ? coverImage : ''}
          handleSubmit={handleCoverImgSubmit}
          handleChange={handleCoverImg}
          inputForm={''}
          displayForm={displayForm}
        /> */}
        {/* <NewImageUploadForm
          src={coverImage ? coverImage : ''}
          handleSubmit={handleCoverImgSubmit}
          handleChange={handleCoverImg}
        /> */}
      </React.Fragment>
    );
  }
}

export default TheClass;
TheClass.contextType = ClassworkContext

