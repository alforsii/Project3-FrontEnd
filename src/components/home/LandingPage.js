import React from 'react';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import SignupForm from '../auth/SignupForm';

import './LandingPage.css';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexWrap: 'wrap',
    width: '100%',
    height: '100vh',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  column: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '500px',
  },
  rows: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'base-line',
  },
  textField: {
    width: '100%',
    margin: '5px',
  },
  image: {
    width: '100%',
    maxWidth: '500px'
  }
}));

const HomePage = (props) => {
  const classes = useStyles();
  const { handleSignupSubmit, handleSignupInput, state, isLoading } = props.context;

  return (
    <div className={classes.root}>
      <div className={classes.column}>
        <Typography
          style={{  textAlign: 'center' }}
          className={classes.textField}
          variant="h4"
          component="h4"
          color='primary'
        >
        <img className={classes.image} src='/images/bg-img.png' alt=''/>
          Welcome to IronSchool
        </Typography>
        <div className={classes.rows}>
          <Typography
            className={classes.textField}
            variant="subtitle1"
            color="textSecondary"
          >
            <i style={{color: '#0794f3'}} className="fas fa-users fa-fw"></i>
            <Divider />
            Invite teachers, students and parents to your class
          </Typography>
          <Typography
            className={classes.textField}
            display="block"
            variant="subtitle1"
            color="textSecondary"
          >
            <i style={{color: '#0794f3'}} className="fas fa-comments fa-fw"></i>
            <Divider />
            Connect with other teachers, students and parents
          </Typography>
          <Typography
            className={classes.textField}
            display="block"
            variant="subtitle1"
            color="textSecondary"
          >
            <i style={{color: '#0794f3'}} className="fas fa-share-square fa-fw"></i>
            <Divider />
            Share your classworks and much more
          </Typography>
        </div>
      </div>

      <SignupForm
      isLoading={isLoading}
        formSignup={state.formSignup}
        handleSignupSubmit={handleSignupSubmit}
        handleSignupInput={handleSignupInput}
      />
    </div>
  );
};

export default HomePage;
