import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import { AUTH_SERVICE } from '../../services/auth/AuthServices';
import ProgressBar from '../auth/progressBar/ProgressBar';
// import moment from 'moment'
import './UpdateProfile.css';

export class UpdateProfile extends Component {
  state = {
    successMessage: '',
    errorMessage: '',
    isLoading: false,
    userForm: {
      username: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      phone: '',
      city: '',
      state: '',
      country: '',
    },
  };
  componentDidMount = () => {
    const user = this.props.context.state.user;
    this.setState((prevState) => ({
      userForm: {
        ...prevState.userForm,
        ...user,
      },
    }));
  };

  //=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=
  //=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=
  handleFormInput = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      userForm: {
        ...prevState.userForm,
        [name]: value,
      },
    }));
  };
  //=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=
  //=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=
  handleFormSubmit = async (e) => {
    try {
      e.preventDefault();
      this.setState({ isLoading: true });
      const { firstName, lastName, email, password } = this.state.userForm;
      if (!firstName || !lastName || !email || !password) {
        this.setState({
          errorMessage:
            'First name, last name, email and password are require!',
        });
        return;
      }
      await AUTH_SERVICE.updateProfile(this.state.userForm);

      this.setState((prevState) => ({
        ...prevState,
        successMessage: 'Thanks! Successfully updated',
        userForm: {
          username: '',
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          phone: '',
          city: '',
          state: '',
          country: '',
        },
      }));

      this.props.context.isUserLoggedIn();
      this.setState({ isLoading: false });
    } catch (err) {
      const msg = this.props.context.displayError(err);
      this.setState({ errorMessage: msg });
      // this.setState({ errorMessage: 'Sorry 😌, something went wrong. Please, try later!'})
      this.setState({ isLoading: false });
    }
  };
  //=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=
  //=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=
  render() {
    const { successMessage, errorMessage, userForm, isLoading } = this.state;

    const styleColor = successMessage ? 'green' : errorMessage ? 'red' : '';
    return (
      <>
        <div className="main-settings">
          <Typography
            style={{ textAlign: 'center' }}
            variant="h5"
            component="h5"
          >
            <i style={{ color: `${styleColor}`, textAlign: 'center' }}>
              {' '}
              {successMessage
                ? successMessage
                : errorMessage
                ? errorMessage
                : 'Update your account details here'}{' '}
            </i>
          </Typography>
          <ProgressBar isLoading={isLoading} strengthValue={100} />
          <UpdateUserDetails
            userForm={userForm}
            handleFormSubmit={this.handleFormSubmit}
            handleFormInput={this.handleFormInput}
          />
        </div>
        <Divider />
        <p className="footer-mark">
          &copy; IronSchool App 2020 - final project at Ironhack by
          A.Kurbonaliev [web-dev oct 2019]!
        </p>
      </>
    );
  }
}
export default UpdateProfile;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    '& > *': {
      margin: theme.spacing(1),
      // width: '25ch',
    },
  },
  textField: {
    minWidth: '400px',
    padding: 5,
  },
  rows: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexWrap: 'wrap',
    width: '100%',
  },
  button: {
    // backgroundColor: '#0794f3',
    width: '300px',
    color: '#068ce6',
  },
}));

function UpdateUserDetails({ handleFormSubmit, handleFormInput, userForm }) {
  const classes = useStyles();
  const {
    username,
    firstName,
    lastName,
    email,
    password,
    phone,
    city,
    state,
    country,
  } = userForm;

  return (
    <form
      onSubmit={handleFormSubmit}
      className={classes.root}
      noValidate
      autoComplete="off"
    >
      <div className={classes.rows}>
        <TextField
          className={classes.textField}
          onChange={handleFormInput}
          required={true}
          type="text"
          variant="filled"
          id="firstName"
          name="firstName"
          value={firstName}
          label="First Name"
        />
        <TextField
          className={classes.textField}
          onChange={handleFormInput}
          required={true}
          type="text"
          variant="filled"
          id="lastName"
          name="lastName"
          value={lastName}
          label="Last Name"
        />
      </div>
      <div className={classes.rows}>
        <TextField
          className={classes.textField}
          onChange={handleFormInput}
          required={true}
          type="email"
          variant="filled"
          id="email"
          name="email"
          value={email}
          label="Email address"
        />
        <TextField
          className={classes.textField}
          onChange={handleFormInput}
          type="number"
          variant="filled"
          id="phone"
          name="phone"
          value={phone}
          label="Phone number"
          placeholder="(305)555-5555"
        />
        <TextField
          className={classes.textField}
          onChange={handleFormInput}
          required={true}
          type="password"
          variant="filled"
          id="password"
          name="password"
          value={password}
          label="Password"
        />
      </div>
      <div className={classes.rows}>
        <TextField
          className={classes.textField}
          onChange={handleFormInput}
          type="text"
          variant="filled"
          id="username"
          name="username"
          value={username}
          label="Username"
        />
        <TextField
          className={classes.textField}
          onChange={handleFormInput}
          type="text"
          variant="filled"
          id="city"
          name="city"
          value={city}
          label="City"
        />
      </div>
      <div className={classes.rows}>
        <TextField
          className={classes.textField}
          onChange={handleFormInput}
          type="text"
          variant="filled"
          id="state"
          name="state"
          value={state}
          label="State"
        />
        <TextField
          className={classes.textField}
          onChange={handleFormInput}
          type="text"
          variant="filled"
          id="country"
          name="country"
          value={country}
          label="Country"
        />
      </div>
      <Button className={classes.button} type="submit">
        Save changes
      </Button>
    </form>
  );
}
