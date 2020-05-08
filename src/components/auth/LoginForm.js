import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import Snackbar from './Snackbar';
import ProgressBar from './progressBar/ProgressBar'
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
    width: '400px',
  },
  link: {
    color: '#068ce6',
    textDecoration: 'none',
  },
  image: {
    width: '100%',
    maxWidth: '500px'
  }
}));

export const UserLogin = (props) => {
  console.log("Output for: UserLogin -> props", props)
  const classes = useStyles();
  const { handleLoginSubmit, handleLoginInput, isLoading } = props.context;

  return (
    <div className={classes.root}>
         <img className={classes.image} src='/images/bg-img.png' alt=''/>
      <form className={classes.columns} onSubmit={handleLoginSubmit}>
        <Typography variant="h5" component="h5">
          <i style={{color: '#0794f3'}} className="fas fa-sign-in-alt"></i> Login
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
        <Snackbar context={props.context} btn="Login" />

        <Typography display="block" variant="subtitle1" color="textSecondary">
          Don't have an account?{' '}
          <Link className={classes.link} to="/">
            <span className={classes.link}>
              {' '}
              <i className="far fa-arrow-alt-circle-right"></i> Signup
            </span>
          </Link>
          <ProgressBar isLoading={isLoading} strengthValue={100} />
        </Typography>
      </form>
     
    </div>
  );
};

export default UserLogin;
