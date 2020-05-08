import React from 'react';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
// import { Switch, Redirect} from 'react-router-dom';
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
      // width: '25ch',
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
    // flexWrap: 'wrap',
  },
  textField: {
    width: '100%',
    // maxWidth: '450px',
    margin: '5px'
    // padding: 5
  },

}));

const HomePage = props => {
  const classes = useStyles();
  const { 
    handleSignupSubmit, handleSignupInput,state
   } = props.context;

  return (
    <div className={classes.root}>
      {/* Welcome Page Container */}
      {/* <div className="landing-page-container"> */}
        <div className={classes.column}>
        <Typography style={{color: '#068ce6' }} className={classes.textField} variant="h4" component="h4">
                Welcome to IronSchool
             
              </Typography>
              <Divider />
         <div className={classes.rows}>
          <Typography className={classes.textField} variant="subtitle1" color="textSecondary">
            <i className="fas fa-users fa-fw"></i> 
            <Divider/>
            Invite teachers, students and parents to your class
              </Typography>
              <Typography className={classes.textField} display="block" variant="subtitle1" color="textSecondary">
            <i className="fas fa-comments fa-fw"></i> 
            <Divider  />
            Connect with other teachers, students and parents
               </Typography>
              
              <Typography className={classes.textField} display="block" variant="subtitle1" color="textSecondary">
            <i className="fas fa-share-square fa-fw"></i>
             <Divider/>
             Share your classworks and much more
              </Typography>

         </div>
          
        </div>

        {/* { Sign up form  */}
         <SignupForm
         formSignup={state.formSignup}
          handleSignupSubmit={handleSignupSubmit}
          handleSignupInput={handleSignupInput}
        />
        {/* End of Sign Up form  */}
      {/* </div> */}
    </div>
  );
};

export default HomePage;
