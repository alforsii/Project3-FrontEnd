import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';

import MenuDropdown from './MenuDropdown';
import Pagination from '../../../../classesList/Pagination';
import './ClassUsers.css';

export default function ClassUsers({ users, filterUsers, removeFromClass }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPageUsers = users?.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <div className="class-users">
      <input
        type="text"
        placeholder="Search by name or email..."
        className="searchInClassInput"
        onKeyUp={filterUsers}
        autoComplete="off"
      ></input>
      <div className="select-btns">
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={users?.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
      <div className="userListScroll2">
        {currentPageUsers?.map((currUser, i) => {
          const { _id, path, username, firstName, lastName } = currUser;

          return (
            <div key={_id + i + 1} className="each-student-main">
              <div className="each-student">
                <Avatar alt={username} src={path} />
                <p>
                  {' '}
                  {firstName} {lastName}{' '}
                </p>
              </div>
              <MenuDropdown
                currUser={currUser}
                removeFromClass={removeFromClass}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
