import React from 'react';
import { Link } from 'react-router-dom';

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className='pagination-div'>
        {pageNumbers.map(number => (
            <Link to='/teachers-page' key={number} onClick={() => paginate(number)} className='page-link'>
              {number}
            </Link>
        ))}
    </div>
  );
};

export default Pagination;
