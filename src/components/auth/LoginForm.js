import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import Snackbar from './Snackbar';
import './LoginForm.css';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  textField: {
    width: '100%',
    margin: '5px',
  },
  columns: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100vh',
  },
  link: {
    color: '#068ce6',
    textDecoration: 'none',
  },
}));

export const UserLogin = (props) => {
  const classes = useStyles();
  const { handleLoginSubmit, handleLoginInput } = props.context;

  return (
    <div className={classes.root}>
      <form className={classes.columns} onSubmit={handleLoginSubmit}>
        <Typography variant="h5" component="h5">
          <i className="fas fa-sign-in-alt"></i> Login
        </Typography>

        <TextField
          className={classes.textField}
          onChange={handleLoginInput}
          required={true}
          type="email"
          name="email"
          label="Email address"
        />
        <TextField
          className={classes.textField}
          onChange={handleLoginInput}
          required={true}
          type="password"
          name="password"
          label="Password"
        />

        <br />
        <Snackbar type="Login" />

        <Typography display="block" variant="subtitle1" color="textSecondary">
          Don't have an account?{' '}
          <Link className={classes.link} to="/">
            <span className={classes.link}>
              {' '}
              <i className="far fa-arrow-alt-circle-right"></i> Signup
            </span>
          </Link>
        </Typography>
      </form>
    </div>
  );
};

export default UserLogin;
