import React from 'react';

import ClassStudents from './ClassUsers/ClassUsers';
import ClassTeachers from './ClassUsers/ClassUsers';
import Students from '../../../users/Students';
import Teachers from '../../../users/Teachers';
import SwitchButton from './switchModeButton/SwitchButton';

import './ClassConnections.css'
export default function ClassConnections({
  switchUsersList,
  toggleClassNavDropdown,
  toggleUserList,
  displayUsers,
  currClass,
  filteredStudents,
  filteredTeachers,
  filterUsers,
  updateState,
  removeFromClass,
  restStudents,
  restTeachers,
  addToClass,
  closeUserList,
}) {
  return (
    <div className='users-connections'>
      <div className='switch-btns'>
        <SwitchButton switchUsersList={switchUsersList} />
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
          toggleClassNavDropdown={toggleClassNavDropdown}
          users={filteredStudents}
          filterUsers={filterUsers}
          updateState={updateState}
          removeFromClass={removeFromClass}
        />
      ) : (
        <ClassTeachers
          currClass={currClass}
          toggleClassNavDropdown={toggleClassNavDropdown}
          users={filteredTeachers}
          filterUsers={filterUsers}
          updateState={updateState}
          removeFromClass={removeFromClass}
        />
      )}

      {/*--------- below hidden user lists - appears on click -------------------*/}
      <div id="studentsList" className="userListMenu-content">
        {restStudents && (
          <Students
            users={restStudents}
            updateState={updateState}
            addToClass={user => addToClass(user)}
            closeUserList={closeUserList}
            toggleClassNavDropdown={toggleClassNavDropdown}
          />
        )}
      </div>
      <div id="teachersList" className="userListMenu-content">
        {restTeachers && (
          <Teachers
            users={restTeachers}
            updateState={updateState}
            addToClass={user => addToClass(user)}
            closeUserList={closeUserList}
            toggleClassNavDropdown={toggleClassNavDropdown}
          />
        )}
      </div>
    </div>
  );
}
