import React from 'react';
import { Link } from 'react-router-dom';

const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className='pagination-div'>
        {pageNumbers.map(pageNumber => (
            <button key={pageNumber} onClick={() => paginate(pageNumber)} className={currentPage === pageNumber ? 'focus-on' : ''}>
              {pageNumber}
            </button>
        ))}
    </div>
  );
};

export default Pagination;
