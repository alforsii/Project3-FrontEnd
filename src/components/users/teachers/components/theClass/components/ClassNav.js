import React from 'react'
import { Link } from 'react-router-dom';

export default function ClassNav({toggleClassNavDropdown,toggleUserList, getStudents}) {
    return (
        <React.Fragment>
            <nav>
            <div className="class-navbar top">
              <div className="dropdown3">
                <button
                  className="dropbtn3"
                  onClick={toggleClassNavDropdown}
                >
                <i className="fas fa-plus-circle"></i> Create
                </button>
                <div className="dropdown-content3 classNavDropdown">
                  <p><i class="fas fa-question-circle"></i> Question</p>
                  <p><i class="fas fa-book"></i> Resource</p>
                  <p><i class="fas fa-tasks"></i> Assignment</p>
                  <hr/>
                  <p><i className="fas fa-file-alt"></i> Topic</p>
                </div>
              </div>
              <div className="dropdown3">
                <button
                  className="dropbtn3"
                  onClick={toggleClassNavDropdown}
                >
                  Subjects <i className="fa fa-caret-down"></i>
                </button>
                <div className="dropdown-content3 classNavDropdown">
                  <p>Math</p>
                  <p>Physics</p>
                  <p>Social studies</p>
                  <p>History</p>
                  <p>Computer & Science & historu and one more things</p>
                </div>
              </div>

              <div className="dropdown3">
                <button
                  className="dropbtn3"
                  onClick={toggleClassNavDropdown}
                >
                  Connect <i className="fa fa-caret-down"></i>
                </button>
                <div className="dropdown-content3 classNavDropdown">
                  <p
                    id="studentsBtn"
                    className="userDisplayBtns"
                    onClick={toggleUserList}
                  >
                    Students
                  </p>
                  <p
                    id="teachersBtn"
                    className="userDisplayBtns"
                    onClick={toggleUserList}
                  >
                    Co-Teachers
                  </p>
                </div>
              </div>

              <Link to="">Calendar</Link>

              <Link to=""><i className='fas fa-trash-alt'></i> Archives</Link>


            </div>
          </nav>
        </React.Fragment>
    )
}
