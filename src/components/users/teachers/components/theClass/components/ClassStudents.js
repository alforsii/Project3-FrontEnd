import React from 'react'
import { Link } from 'react-router-dom'

import Pagination from '../../classesList/Pagination'
import './ClassStudents.css'

export default function ClassStudents({filteredStudents, filterUsers, updateState, 
  currClass: { name, grade }, removeFromClass, toggleClassNavDropdown }) {

     //Toggle all checkboxes
//  const toggleCheckbox = e => {
//     const { checked } = e.target;
//     const checkboxes = document.querySelectorAll('.remove-user');
//     for (var i = 0; i < checkboxes.length; i++) {
//       checkboxes[i].checked = checked;
//     }
//   };

// Get current posts
const indexOfLastPost = currentPage * postsPerPage;
const indexOfFirstPost = indexOfLastPost - postsPerPage;
const currentPageClasses = classes?.slice(
  indexOfFirstPost,
  indexOfLastPost
);
    return (
        <div>

          <div className="side-header">
            <h2> {name} </h2>
            <h2>grade: {grade} </h2>
          </div>

             <input
            type="text"
            placeholder="Search by students name or email..."
            className="searchInput"
            onKeyUp={filterUsers}
            autoComplete="off"
          ></input>
          <div className="select-btns">
            {/* <div>
              <input type="checkbox" onClick={toggleCheckbox} />
              <span> Select all</span>
            </div> */}
            {/* <button id="removeFromClass">Remove all selected users</button> */}
          </div>
          <Pagination
          postsPerPage={postsPerPage}
          totalPosts={classes?.length}
          paginate={this.paginate}
        />
          <hr />
          <div className="userListScroll2">
             { filteredStudents?.map((studentData,i) => {
               const { student: {_id, path, username, firstName, lastName }, student} = studentData;
               return (
                 <div key={_id+i+1} className="each-student-main">
                     {/* <input type="checkbox" className='remove-user' /> */}
                     <div className="each-student">
                       <img className="user-image-sm " src={path} alt={username} />
                       <p>
                         {' '}
                         {firstName} {lastName}{' '}
                       </p>
                     </div>
                     {/* dropdown btn */}
                   <div className="dropdown3">
                        <button
                          className="dropbtn3"
                          onClick={toggleClassNavDropdown}
                        >
                            <i className="fas fa-ellipsis-h"></i>
                        </button>
                        <div className="dropdown-content3 classNavDropdown">
                          <p>
                            <Link
                              to={`/message-board/${_id}`}
                              onClick={() =>
                                updateState(prevState => ({
                                  messageBoard: {
                                    ...prevState.messageBoard,
                                    receiver: student,
                                  },
                                }))
                              }
                            >
                              Send message
                            </Link>
                          </p>
                          <p>Mark</p>
                          <p onClick={() => removeFromClass(studentData)}>Remove from class</p>
                        </div>
                      </div>
                 </div>
               );
          })}
          </div>
        </div>
    )
}
