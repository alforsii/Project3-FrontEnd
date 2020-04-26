import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function PaginationControlled({ postsPerPage, totalPosts, paginate, currentPage }) {
  const classes = useStyles();
  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
    paginate(value)
  };

  return (
    <div className={`${classes.root} pagination-div`}>
      {/* <Typography>Page: {page}</Typography> */}
      <Pagination count={Math.ceil(totalPosts / postsPerPage)} page={page} onChange={handleChange} />
    </div>
  );
}

// import React from 'react';

// const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
//   const pageNumbers = [];

//   for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
//     pageNumbers.push(i);
//   }

//   return (
//     <div className='pagination-div'>
//         {pageNumbers.length > 1 && pageNumbers.map(pageNumber => (
//             <button key={pageNumber} onClick={() => paginate(pageNumber)} className={currentPage === pageNumber ? 'focus-on' : ''}>
//               {pageNumber}
//             </button>
//         ))}
//     </div>
//   );
// };

// export default Pagination;
