import React from 'react';
import { useSnackbar } from 'notistack';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {AuthContext} from '../../myContext/AuthProvider'

const useStyles = makeStyles((theme) => ({

  button: {
    backgroundColor: '#0794f3',
    "&:hover": {
      backgroundColor: "#0794f3  !important"
      }
  },
}));

export default function MySnackbar() {

  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

 
return (
  <AuthContext.Consumer>
    { context => {

      const user  = context?.state.user
      const message  = context?.state.message
      const errMessage  = context?.state.errMessage
      const handleClickVariant = () => () => {

        // variant could be success, error, warning, info, or default

        if(!user){
          enqueueSnackbar(errMessage, { variant: 'error' });
        }
        if(user) {
          enqueueSnackbar(`${message} Welcome ${user.firstName} ${user.firstName} to the board!`, { variant: 'success' });
        }
      return context?.updateState({message: '', errMessage: ''})
      };

    
 return (
  <React.Fragment>
      <Button
      variant="contained"
      color="primary"
      type='submit'
      className={classes.button}
      onClick={ handleClickVariant()}
    >
      Login
    </Button>
    {/* <Button onClick={handleClickVariant('success')}>Add to class</Button> */}
  </React.Fragment>
);
    }}
  </AuthContext.Consumer>
)
 
}

