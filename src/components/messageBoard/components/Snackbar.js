import React from 'react';
import { SnackbarProvider, useSnackbar } from 'notistack';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import {MessageContext} from '../../../myContext/MessageProvider'

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
  <MessageContext.Consumer>
    { msgContext => {
      const { messageInputs, receiver } = msgContext.messageState
      const handleClickVariant = () => () => {

        // variant could be success, error, warning, info, or default
        if(!receiver){
          enqueueSnackbar('User not selected. Please select a user first!', { variant: 'error' });
        }
        else if(!messageInputs.message){
          enqueueSnackbar('Please type a message.', { variant: 'error' });
        }
        else enqueueSnackbar(`Message Sent to ${receiver.firstName} ${receiver.firstName}: ${messageInputs.message}`, { variant: 'success' });
      };
    
 return (
  <React.Fragment>
      <Button
      variant="contained"
      color="primary"
      type='submit'
      className={classes.button}
      onClick={handleClickVariant()}
      endIcon={<SendIcon>send</SendIcon>}
    >
      Send
    </Button>
    {/* <Button onClick={handleClickVariant('success')}>Add to class</Button> */}
  </React.Fragment>
);
    }}
  </MessageContext.Consumer>
)
 
}

// export default function IntegrationNotistack() {
//   return (
//     <SnackbarProvider maxSnack={3}>
//       <MySnackbar/>
//     </SnackbarProvider>
//   );
// }
