import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

import { AUTH_SERVICE } from '../../services/auth/AuthServices'
import ProgressBar from '../auth/progressBar/ProgressBar'
// import moment from 'moment'
import './Account.css';

export class Account extends Component {
    state = {
        successMessage: '',
        errorMessage: '',
        isLoading: false,
        userForm: {
            email: '',
            password: '',
        }
    }
    componentDidMount = () => {
      const user = this.props?.user
      this.setState(prevState => ({
        userForm: {
          ...prevState.userForm,
          ...user
        }
      }))
    }

//=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=
//=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=
    handleFormInput = e => {
      const {name, value} = e.target
        this.setState(prevState => ({
          userForm: {
            ...prevState.userForm,
            [name]: value,
          },
        }))
    }
//=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=
//=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=
    handleFormSubmit = async e => {
        try {
          e.preventDefault()
          this.setState({ isLoading: true })
        await AUTH_SERVICE.updateAccount(this.state.userForm)
      
        this.setState(prevState => ({
          ...prevState,
          successMessage: 'Thanks! Successfully updated',
          userForm: {
            email: '',
            password: ''
          }
        }));

        this.props.context.isUserLoggedIn()
        this.setState({ isLoading: false })
        } catch (err) {
          this.setState({ errorMessage: 'Sorry 😌, something went wrong. Please, try later!'})
          this.setState({ isLoading: false })
        }
    }
//=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=
//=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=
  render() {
    const { successMessage, errorMessage, userForm, isLoading} = this.state
    const styleColor = successMessage? 'green': errorMessage? 'red':''
    return (
      <>
      <div className="main-settings">
      <h2><i style={{color: `${styleColor}`}}> { successMessage? 
      successMessage
      : errorMessage? errorMessage : 'Update account password here'} </i></h2>
      <ProgressBar isLoading={isLoading} strengthValue={0}/>
      <UpdateUserDetails 
      userForm={userForm}
      handleFormSubmit={this.handleFormSubmit}
      handleFormInput={this.handleFormInput}
      />
      </div>
      <Divider/>
      </>
    );
  }
}
export default Account;

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
    minWidth: '300px',
    padding: 5
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
    width: '200px',
    color: '#068ce6'
  }
}));

 function UpdateUserDetails({  handleFormSubmit, handleFormInput, userForm }) {
  const classes = useStyles();
  const { email,password} = userForm;

  return (
    <form onSubmit={handleFormSubmit} className={classes.root} noValidate autoComplete="off">
      <div className={classes.rows}>
        <TextField className={classes.textField} onChange={handleFormInput} type='email' variant="filled" id="email" name='email'  value={email} label="Email address" />
        <TextField className={classes.textField} onChange={handleFormInput} type='password' variant="filled" id="password" name='password' value={password} label="Password" />
      </div>
      <Button className={classes.button}  type='submit'>
        Save changes
      </Button>
    </form>
  );
}
