import React, { useState} from 'react';
import { Link } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import {AUTH_SERVICE} from '../../services/auth/AuthServices'
import ProgressBar from './progressBar/ProgressBar'
import './LoginForm.css';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    
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
  },
  button: {
    backgroundColor: '#0794f3',
    "&:hover": {
      backgroundColor: "#0794f3  !important"
      }
  },
}));


export default function MySnackbar(props) {

  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

 
// return (
//   <AuthContext.Consumer>
//     { context => {
const { updateState, getUsers } = props.context;
const [isLoading,setLoading] = useState(false)
const [formLogin, setFormLogin] = useState({
  email: '',
  password: '',
})

      const handleClickVariant = (message, errorMessage,user) => {
        // variant could be success, error, warning, info, or default
        if(errorMessage){
          enqueueSnackbar(errorMessage, { variant: 'error' });
        }
        if(message) {
          enqueueSnackbar(`${message} Welcome back ${user?.firstName} to the board!`, { variant: 'success' });
        }
      };

  //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 const handleLoginInput = e => {
    const { value, name } = e.target;
   setFormLogin({
     ...formLogin,
     [name]: value
   })
  };
  //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  const handleLoginSubmit = async e => {
    e.preventDefault();
    try {
      setLoading(true)
      const {data: {user, message}} = await AUTH_SERVICE.login(formLogin);

      setFormLogin({
        email: '',
        password: ''
      })
      updateState(prevState => ({
        ...prevState,
        user,
        loggedIn: true,
        isLoading: false ,
      }),() => {
        this.props.history.push('/dashboard');
      });
      getUsers()
      handleClickVariant(message,null,user)
      setLoading(false)
    } catch (err) {
      updateState({ isLoading: false, message: ''})
      const error = displayError(err);
      handleClickVariant(null,error, null)
      setLoading(false)
    }
  };

 const displayError = err => {
    if (err.response && err.response.data) {
      return err.response.data.message
    } else {
      console.log(err);
      return 'Sorry, something went wrong!'
    }
  };
    
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
          type="email"
          name="email"
          label="Email address*"
        />
        <TextField
          className={classes.textField}
          onChange={handleLoginInput}
          type="password"
          name="password"
          label="Password*"
        />

        <br />
        <Button
      variant="contained"
      color="primary"
      type='submit' 
      className={classes.button}
    >
     Login
    </Button>

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
}
 

