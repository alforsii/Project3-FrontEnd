import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
      <Pagination count={Math.ceil(totalPosts / postsPerPage)} page={page} onChange={handleChange} />
    </div>
  );
}
