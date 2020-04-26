import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar'
import MenuDropdown from './MenuDropdown'

import Pagination from '../../../../classesList/Pagination'
import './ClassUsers.css'

export default function ClassUsers({users, filterUsers, updateState, 
  currClass: { name, grade }, removeFromClass, toggleClassNavDropdown }) {

     //Toggle all checkboxes
//  const toggleCheckbox = e => {
//     const { checked } = e.target;
//     const checkboxes = document.querySelectorAll('.remove-user');
//     for (var i = 0; i < checkboxes.length; i++) {
//       checkboxes[i].checked = checked;
//     }
//   };
const [currentPage, setCurrentPage] = useState(1);
const [postsPerPage] = useState(10);
// Get current posts
const indexOfLastPost = currentPage * postsPerPage;
const indexOfFirstPost = indexOfLastPost - postsPerPage;
const currentPageUsers = users?.slice(
  indexOfFirstPost,
  indexOfLastPost
);

 // Change page
 const paginate = pageNumber => setCurrentPage(pageNumber);
    return (
        <div className='class-users'>

          {/* <div className="side-header">
            <h4> {name} </h4>
            <h4>grade: {grade} </h4>
          </div> */}

             <input
            type="text"
            placeholder="Search by name or email..."
            className="searchInClassInput"
            onKeyUp={filterUsers}
            autoComplete="off"
          ></input>
          <div className="select-btns">
            {/* <div>
              <input type="checkbox" onClick={toggleCheckbox} />
              <span> Select all</span>
            </div> */}
            {/* <button id="removeFromClass">Remove all selected users</button> */}
          <Pagination
          postsPerPage={postsPerPage}
          totalPosts={users?.length}
          paginate={paginate}
          currentPage={currentPage}
        />
          </div>
          <div className="userListScroll2">
             { currentPageUsers?.map((currUser,i) => {
               const { _id, path, username, firstName, lastName } = currUser;

               return (
                 <div key={_id+i+1} className="each-student-main">
                     {/* <input type="checkbox" className='remove-user' /> */}
                     <div className="each-student">
                       {/* <img className="user-image-sm " src={path} alt={username} /> */}
                       <Avatar alt={username} src={path}/>
                       <p>
                         {' '}
                         {firstName} {lastName}{' '}
                       </p>
                     </div>
                     {/* dropdown btn */}
                     <MenuDropdown 
                      currUser={currUser}
                      updateState={updateState}
                      removeFromClass={removeFromClass}
                     />
                   {/* <div className="dropdown3">
                        <button
                          className="dropbtn3"
                          onClick={toggleClassNavDropdown}
                        >
                            <i className="fas fa-ellipsis-h"></i>
                        </button>
                        <div className="dropdown-content3 classNavDropdown">
                        <div className="each-student">
                       <img className="user-image-md" src={path} alt={username} />
                       <h4>
                         {' '}
                         {firstName} {lastName}{' '}
                       </h4>
                     </div>
                          <p>
                            <Link
                              to={`/message-board/${_id}`}
                              onClick={() =>
                                updateState(prevState => ({
                                  messageBoard: {
                                    ...prevState.messageBoard,
                                    receiver: currUser,
                                  },
                                }))
                              }
                            >
                              Send message
                            </Link>
                          </p>
                          <p>Mark</p>
                          <p onClick={() => removeFromClass(currUser)}>Remove from class</p>
                        </div>
                      </div> */}
                 </div>
               );
          })}
          </div>
        </div>
    )
}