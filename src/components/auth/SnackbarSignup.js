import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import Snackbar from './Snackbar';
import {AUTH_SERVICE} from '../../services/auth/AuthServices'
import ProgressBar from './progressBar/ProgressBar'


import { makeStyles, useTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
// import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '500px',
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
  },
  link: {
    color: '#068ce6',
    textDecoration: 'none',
  },
  button: {
    backgroundColor: '#0794f3',
    "&:hover": {
      backgroundColor: "#0794f3  !important"
      }
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = ['Teacher', 'Student', 'Parent'];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const UserSignup = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();

  const {  updateState, getUsers } = props
  const [isLoading,setLoading] = useState(false)

const [formSignup, setFormSignup] = useState({
  username: '', 
  firstName: '', 
  lastName: '',  
  email: '',
  password: '',
  title: 'Student'
})
const {username,firstName,lastName,email,password,title} = formSignup

  const [personName, setPersonName] = useState([]);
  

  const handleClickVariant = (message, errorMessage,user) => {
    // variant could be success, error, warning, info, or default
    if(errorMessage){
      enqueueSnackbar(errorMessage, { variant: 'error' });
    }
    if(message) {
      enqueueSnackbar(`${message} Welcome ${user?.firstName} to IronSchool!`, { variant: 'success' });
    }
  };

  //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  const handleSignupSubmit = async e => {
    e.preventDefault();
    try {
      setLoading(true)
        const {data: {user, message}} = await AUTH_SERVICE.signup(formSignup);
        
        setFormSignup({
          username: '', 
          firstName: '', 
          lastName: '',  
          email: '',
          password: '',
          title: ''
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
        return 'Sorry 😔, something went wrong!'
      }
    };

    //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    const handleSignupInput = e => {
      const { value, name } = e.target;
      setFormSignup({
        ...formSignup,
        [name]: value
      })
    };
    //
    const handleChange = (event) => {
      setPersonName(event.target.value);
      handleSignupInput(event);
    };

  return (
    <div className={classes.root}>
      <form
        onSubmit={handleSignupSubmit}
        className={classes.columns}
        noValidate
        autoComplete="off"
      >
     
        <Typography variant="h5" component="h5">
          <i style={{color: '#0794f3'}} className="fas fa-user-plus"></i> Sign up
        </Typography>
        

        <TextField
          className={classes.textField}
          value={username}
          onChange={handleSignupInput}

          type="text"
          name="username"
          label="Username"
        />
        <TextField
          className={classes.textField}
          value={firstName}
          onChange={handleSignupInput}

          type="text"
          name="firstName"
          label="First name"
        />
        <TextField
          className={classes.textField}
          value={lastName}
          onChange={handleSignupInput}

          type="text"
          name="lastName"
          label="Last name"
        />
        <TextField
          className={classes.textField}
          value={email}
          onChange={handleSignupInput}

          type="email"
          name="email"
          label="Email address"
        />
        <TextField
          className={classes.textField}
          onChange={handleSignupInput}

          type="password"
          name="password"
          label="Password"
        />
        <FormControl className={classes.textField}>
          <InputLabel id="user-title">
            Are you a Teacher or Parent? Then select here {' '}
            <i className="far fa-arrow-alt-circle-down"></i>
          </InputLabel>
          <Select
            className={classes.textField}
            labelId="user-title"
            // multiple
            value={title}
            name="title"
            onChange={handleChange}
            input={<Input />}
            MenuProps={MenuProps}
          >
            {names.map((name) => (
              <MenuItem
                key={name}
                value={name}
                style={getStyles(name, personName, theme)}
              >
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <br />
        <div>
        <Button
      variant="contained"
      color="primary"
      type='submit' 
      className={classes.button}
    >
     Signup
    </Button>

        </div>
        <Typography display="block" variant="subtitle1" color="textSecondary">
          Already have an account? 
          <Link className={classes.link} to="/login">
            <span className={classes.link}>
              {' '}
              <i className="far fa-arrow-alt-circle-right"></i> Login
            </span>
          </Link>
          <ProgressBar isLoading={isLoading} strengthValue={100} />
        </Typography>
          {/* <Divider /> */}
          <Typography display="block" variant="caption" color="textSecondary">
            Made with{' '}
            <span
              style={{ color: 'red', fontSize: '16px' }}
              role="img"
              aria-label="emoji"
            >
              ♥️
            </span>{' '}
            at Ironhack Miami - PTWD October 2019 &copy;
          </Typography>
      </form>



    </div>
  );
};

export default UserSignup;
