import React, { useState, useEffect } from 'react'
import {Button} from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Snackbar from './Snackbar'

import './SendMessage.css'
const useStyles = makeStyles((theme) => ({
  root: {
      padding: '10px',
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '100%',
      maxWidth: '200px'
},
},
textField: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flexWrap: 'wrap'
  },
  button: {
    backgroundColor: '#0794f3',
  },
}));

// import Emojis from './Emojis'

export default function SendMessage({ messageInputs, handleMessageSubmit, handleMessage }) {
        const classes = useStyles();
        const [messageFromContext, setMessageFromContext] = useState({})

        useEffect(() => {
            setMessageFromContext(messageInputs)
        },[messageInputs])

    return (
        <form className={classes.root} noValidate autoComplete="off"
        onSubmit={handleMessageSubmit}>
            <Divider />
      <div className={classes.textField}>
      {/* <div> */}
      <TextField
          id="standard-multiline-flexible"
          label="Title"
          placeholder='Your message title here'
          multiline
          rowsMax={4}
          name='title'
          value={messageFromContext?.title}
          onChange={handleMessage}
        />
      <TextField
          id="standard-multiline-flexible"
          label="Header"
          placeholder='Your message header here'
          multiline
          rowsMax={4}
          name='header'
          value={messageFromContext?.header}
          onChange={handleMessage}
        />
      <TextField
          id="standard-multiline-flexible"
          label="Message"
          placeholder='Your message goes here'
          multiline
          rowsMax={4}
          name='message'
          value={messageFromContext?.message}
          onChange={handleMessage}
        />

      {/* </div> */}
           <div>
            <Snackbar/>
           </div>
      </div>
      </form>
    )
}
