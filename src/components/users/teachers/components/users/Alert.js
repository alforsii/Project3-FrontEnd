import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function ColorAlerts({ message, time, updateState }) {
  const classes = useStyles();

setTimeout(() => {
  updateState(prevState => ({
    messages: prevState.messages.filter(msg => msg.msg !== message )
  }))
}, time)

  return (
    <div className={classes.root}>
        <Alert severity="success" color="info">
        { message }
      </Alert>
    </div>
  );
}
