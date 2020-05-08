import React, {useState, useEffect} from 'react';

import ClassStudents from './ClassUsers/ClassUsers';
import ClassTeachers from './ClassUsers/ClassUsers';
import Students from '../../../users/Students';
import Teachers from '../../../users/Teachers';
import SwitchButton from './switchModeButton/SwitchButton';
import './ClassConnections.css'

export default function ClassConnections({
  // switchUsersList,
  // toggleClassNavDropdown,
  toggleUserList,
  // displayUsers,
  currClass,
  // filteredStudents,
  // filteredTeachers,
  students,
  teachers,
  // filterUsers,
  // updateState,
  removeFromClass,
  restStudents,
  restTeachers,
  addToClass,
  closeUserList,
}) {

  const [displayUsers,setDisplayUsers] = useState(true)
  const [currentStudents, setCurrentStudents] = useState([])
  const [currentTeachers, setCurrentTeachers] = useState([])

  useEffect(() => {
    setCurrentStudents(students)
    setCurrentTeachers(teachers)
  },[students, teachers])

  const switchUsersList = () => {
    setDisplayUsers(!displayUsers)
  };

   //Search user
 const filterUsers = e => {
  const searchUser = e.target.value.toUpperCase();

   if(displayUsers){
    const searchResult = [...students].filter(
      student =>
        `${student.firstName} ${student.lastName}`
          .toUpperCase()
          .includes(searchUser) ||
        `${student.email}`.toUpperCase().includes(searchUser)
    );
    setCurrentStudents(searchResult)
      return
   }
   const searchResult = [...teachers].filter(
    teacher =>
      `${teacher.firstName} ${teacher.lastName}`
        .toUpperCase()
        .includes(searchUser) ||
      `${teacher.email}`.toUpperCase().includes(searchUser)
  );
  setCurrentTeachers(searchResult)
};

  
  return (
    <div className='users-connections'>
      <div className='switch-btns'>
        <SwitchButton switchUsersList={switchUsersList}/>
        {displayUsers?  <button
              id="studentsBtn"
              className="userDisplayBtns"
              onClick={toggleUserList}
            >
              <i className='fas fa-user-plus'></i>
            </button>
            :<button
              id="teachersBtn"
              className="userDisplayBtns"
              onClick={toggleUserList}
            >
              <i className='fas fa-user-plus'></i>
            </button>}
      </div>

      {displayUsers ? (
        <ClassStudents
          currClass={currClass}
          users={currentStudents}
          filterUsers={filterUsers}
          // updateState={updateState}
          removeFromClass={removeFromClass}
        />
      ) : (
        <ClassTeachers
          currClass={currClass}
          users={currentTeachers}
          filterUsers={filterUsers}
          // updateState={updateState}
          removeFromClass={removeFromClass}
        />
      )}

      {/*--------- below hidden user lists - appears on click -------------------*/}
      {displayUsers? 
      <div id="studentsList" className="userListMenu-content">
        {restStudents && (
          <Students
            users={restStudents}
            // updateState={updateState}
            addToClass={addToClass}
            closeUserList={closeUserList}
          />
        )}
      </div>

      :<div id="teachersList" className="userListMenu-content">
        {restTeachers && (
          <Teachers
            users={restTeachers}
            // updateState={updateState}
            addToClass={addToClass}
            closeUserList={closeUserList}
          />
        )}
      </div>
      }
    </div>
  );
}
