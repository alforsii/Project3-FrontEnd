import React from 'react';
import { Link } from 'react-router-dom';
import Snackbar from './Snackbar';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Divider from '@material-ui/core/Divider';

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

const UserSignup = ({ handleSignupInput, handleSignupSubmit, formSignup }) => {
  const classes = useStyles();
  const theme = useTheme();
  const { username, firstName, lastName, email, title } = formSignup;

  const [personName, setPersonName] = React.useState([]);
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
          <i className="fas fa-user-plus"></i> Sign up
        </Typography>

        <TextField
          className={classes.textField}
          value={username}
          onChange={handleSignupInput}
          required={true}
          type="text"
          name="username"
          label="Username"
        />
        <TextField
          className={classes.textField}
          value={firstName}
          onChange={handleSignupInput}
          required={true}
          type="text"
          name="firstName"
          label="First name"
        />
        <TextField
          className={classes.textField}
          value={lastName}
          onChange={handleSignupInput}
          required={true}
          type="text"
          name="lastName"
          label="Last name"
        />
        <TextField
          className={classes.textField}
          value={email}
          onChange={handleSignupInput}
          required={true}
          type="email"
          name="email"
          label="Email address"
        />
        <TextField
          className={classes.textField}
          onChange={handleSignupInput}
          required={true}
          type="password"
          name="password"
          label="Password"
        />
        <FormControl className={classes.textField}>
          <InputLabel id="user-title">
            Are you Teacher? Select type here
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
          <Snackbar type="Signup" />
        </div>

        <Typography display="block" variant="subtitle1" color="textSecondary">
          Already have an account? {/* <Link to='/login'>login</Link> */}
          <Link className={classes.link} to="/login">
            <span className={classes.link}>
              {' '}
              <i className="far fa-arrow-alt-circle-right"></i> Login
            </span>
          </Link>
        </Typography>
        <footer>
          <Divider />
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
        </footer>
      </form>
    </div>
  );
};

export default UserSignup;
