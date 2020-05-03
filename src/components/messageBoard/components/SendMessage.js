import React from 'react'
import {Button} from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';

import './SendMessage.css'
const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
    //   margin: theme.spacing(1),
      width: '100%',
},
},
textField: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    backgroundColor: '#0794f3'
  },
}));

// import Emojis from './Emojis'

export default function SendMessage({ handleMessageSubmit, message,
    handleMessage }) {
        const classes = useStyles();

    return (
        <form className={classes.root} noValidate autoComplete="off"
        onSubmit={handleMessageSubmit}
      >
            <Divider />
      <div className={classes.textField}>
      <TextField
          id="standard-multiline-flexible"
          label="Send message"
          multiline
          rowsMax={4}
        //   variant="outlined"
          name='message'
          value={message}
          onChange={handleMessage}
        />
        <Button
        variant="contained"
        color="primary"
        type='submit'
        className={classes.button}
        endIcon={<SendIcon>send</SendIcon>}
      >
        Send
      </Button>
      </div>
      </form>
    )
}
