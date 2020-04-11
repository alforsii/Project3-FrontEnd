import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import {AUTH_CLASSES} from '../../../../services/classesAuth/ClassesAuth'
import Students from './users/Students';
import Teachers from './users/Teachers';
import './TheClass.css';

export class TheClass extends Component {
    state = {
        students: this.props.location.state.currClass.students.map(data => data.student),
        filterStudents: this.props.location.state.currClass.students.map(data => data.student),
        teachers: [],
        parents: [],
        selectAllStudents: false,
    }
  //get users by title(TA,Student or Parent)
  getUsers = title => {
    return this.props.context.state.users.filter(user => user.title === title);
  };

    /* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
toggleDropdownMenu = () => {
    const buttons = document.querySelectorAll('.myDropdown')
    for(let i=0; i< buttons.length;i++){
        buttons[i].classList.toggle('show');
    }
    // document.getElementById('myDropdown').classList.toggle('show');
  }
  //Search 
    //
    filterUsers = e => {
        const searchUser = e.target.value.toUpperCase();
         const searchResult = [...this.state.students].filter(user => `${user.firstName} ${user.lastName}`.toUpperCase().includes(searchUser.toUpperCase()))
         this.setState({
           filterStudents: searchResult
         })
    }
//Add to class 
addToClass = async user => {
  const res = await AUTH_CLASSES.addStudent({
    userId: user._id, 
    classId: this.props.location.state.currClass._id
  })

    this.setState(prevState => ({
        students: [...prevState.students,res.data.student.student],
        filterStudents: [...prevState.students,res.data.student.student],
    }))
}
//Add to class 
getStudents = async () => {
  // const res = await AUTH_CLASSES.getStudents({
  //   classId: this.props.location.state.currClass._id
  // })

  //   this.setState(prevState => ({
  //       students: res.data.class.students,
  //       filterStudents: res.data.class.students,
  //   }))
}

//Toggle all checkboxes
toggleCheckbox = (e) => {
    const { checked } = e.target
    const checkboxes = document.querySelectorAll('.remove-user');
    // this.setState({selectAllStudents: checked})
    for (var i = 0; i < checkboxes.length; i++) {
      checkboxes[i].checked = checked;
    }
  }
componentDidMount = () =>{
  // this.getStudents()
  console.log(this.state.students)
}

  render() {
    const {
      currClass: { name, grade, path, description },
    } = this.props.location.state;
    const {
      updateState,
      state: { user },
    } = this.props.context;
    return (
      <div className='main-class-page'>
        <div className='navbar-div'>
          <nav>
            <div className="class-navbar top">
              <Link to="">{name} </Link>
              <Link to="">Grade: {grade}</Link>
              <Link to="">Description: {description}</Link>
            </div>
          </nav>
            <img
                className='cover-image'
                src={path}
                alt="image"
            />
                <nav>
                    <div className="class-navbar">
                    <Link to="">Home</Link>
                    <Link to="">Subjects</Link>
                    <Link to=""><i className='fas fa-plus-circle'></i> New Subject</Link>
                    <div className="dropdown3">
                        <button className="dropbtn3" onClick={this.toggleDropdownMenu}>
                        Search{' '}
                        <i className="fa fa-caret-down"></i>
                        </button>
                        <div className="dropdown-content3 myDropdown">
                            <p>Students</p>
                            <p>Parents</p>
                            <p>Co-Teachers</p>
                        </div>
                    </div>
                    <div className="dropdown3">
                        <button className="dropbtn3" onClick={this.toggleDropdownMenu}>
                        Subjects{' '}
                        <i className="fa fa-caret-down"></i>
                        </button>
                        <div  className="dropdown-content3 myDropdown">
                            <p>Students</p>
                            <p>Parents</p>
                            <p>Co-Teachers</p>
                        </div>
                    </div>
                    </div>
                 </nav>
            <div className="students-list">
            <Students
                users={this.getUsers('Student')}
                updateState={updateState}
                addToClass={user => this.addToClass(user)}
            />
            </div>
            <div className="students-list ta-list">
            <Teachers
                users={this.getUsers('TA')}
                updateState={updateState}
                addToClass={user => this.addToClass(user)}
            />
            </div>
        </div>
          <div className='students-list class-students'>
        <input type="text" placeholder="Search.." className="searchInput" onKeyUp={this.filterUsers} autoComplete='off'></input>
        <div className='select-btns'>
          <div>
            <input type="checkbox"  onClick={this.toggleCheckbox} />
            <span> Select all</span>
          </div>
          <button id='addToClass'>Remove all selected users</button>
        </div>
        <hr/>
          { this.state.filterStudents?.map((user,i) => {
               const { _id, path, username, firstName, lastName } = user;
               return (
                 <div key={_id+i+1} className="user-user-list-horizontal">
                   <div className="user-image-div user-horizontal">
                     <input type="checkbox" className='remove-user' />
                     <div>
                       <img className="user-image-sm " src={path} alt={username} />
                       <p>
                         {' '}
                         {firstName} {lastName}{' '}
                       </p>
                     </div>
                       <button className='addOneToClass'
                       onClick={() => this.props.addToClass(user)}>Remove from class</button>
                   </div>
                 </div>
               );
          })}
          </div>
      </div>
    );
  }
}

export default TheClass;
