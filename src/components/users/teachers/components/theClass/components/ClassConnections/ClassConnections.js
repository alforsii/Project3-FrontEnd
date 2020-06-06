import React, { useState, useEffect } from 'react';

import ClassStudents from './ClassUsers/ClassUsers';
import ClassTeachers from './ClassUsers/ClassUsers';
import Students from '../../../users/Students';
import Teachers from '../../../users/Teachers';
import SwitchButton from './switchModeButton/SwitchButton';
import { ClassworkContext } from '../../../../../../../myContext/ClassworkProvider';
import './ClassConnections.css';

export default function ClassConnections({ currClass, students, teachers }) {
  const [displayUsers, setDisplayUsers] = useState(true);
  const [currentStudents, setCurrentStudents] = useState([]);
  const [currentTeachers, setCurrentTeachers] = useState([]);

  useEffect(() => {
    setCurrentStudents(students);
    setCurrentTeachers(teachers);
  }, [students, teachers]);

  //Search user
  const filterUsers = (e) => {
    const searchUser = e.target.value.toUpperCase();

    if (displayUsers) {
      const searchResult = [...students].filter(
        (student) =>
          `${student.firstName} ${student.lastName}`
            .toUpperCase()
            .includes(searchUser) ||
          `${student.email}`.toUpperCase().includes(searchUser)
      );
      setCurrentStudents(searchResult);
      return;
    }
    const searchResult = [...teachers].filter(
      (teacher) =>
        `${teacher.firstName} ${teacher.lastName}`
          .toUpperCase()
          .includes(searchUser) ||
        `${teacher.email}`.toUpperCase().includes(searchUser)
    );
    setCurrentTeachers(searchResult);
  };

  const switchUsersList = () => {
    setDisplayUsers(!displayUsers);
  };

  return (
    <ClassworkContext.Consumer>
      {(classContext) => {
        const {
          removeFromClass,
          addToClass,
          toggleUserList,
          closeUserList,
        } = classContext;
        const { restStudents, restTeachers } = classContext.classworkState;

        return (
          <div className="users-connections">
            <div className="switch-btns">
              <SwitchButton switchUsersList={switchUsersList} />
              {displayUsers ? (
                <button
                  id="studentsBtn"
                  className="userDisplayBtns"
                  onClick={() => toggleUserList('students')}
                >
                  <i className="fas fa-user-plus"></i>
                </button>
              ) : (
                <button
                  id="teachersBtn"
                  className="userDisplayBtns"
                  onClick={() => toggleUserList('teachers')}
                >
                  <i className="fas fa-user-plus"></i>
                </button>
              )}
            </div>

            {displayUsers ? (
              <ClassStudents
                currClass={currClass}
                users={currentStudents}
                filterUsers={filterUsers}
                removeFromClass={removeFromClass}
              />
            ) : (
              <ClassTeachers
                currClass={currClass}
                users={currentTeachers}
                filterUsers={filterUsers}
                removeFromClass={removeFromClass}
              />
            )}

            {/*--------- below hidden user lists - appears on click -------------------*/}
            {displayUsers ? (
              <div id="studentsList" className="userListMenu-content">
                {restStudents && (
                  <Students
                    users={restStudents}
                    addToClass={addToClass}
                    closeUserList={closeUserList}
                  />
                )}
              </div>
            ) : (
              <div id="teachersList" className="userListMenu-content">
                {restTeachers && (
                  <Teachers
                    users={restTeachers}
                    addToClass={addToClass}
                    closeUserList={closeUserList}
                  />
                )}
              </div>
            )}
          </div>
        );
      }}
    </ClassworkContext.Consumer>
  );
}
