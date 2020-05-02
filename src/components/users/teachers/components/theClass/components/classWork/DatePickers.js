import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import {  IconButton, } from '@material-ui/core'
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'relative',
    '& > *': {
      width: '150px',
    },
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

export default function MaterialUIPickers({schedule,setSchedule, handleCloseSchedule}) {
  const classes = useStyles();
  // The first commit of Material-UI
  const [selectedDate, setSelectedDate] = React.useState();
  
  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSchedule(date)
    if(!schedule) handleCloseSchedule()
  };

  return (

    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid className={classes.root} container justify="space-around">
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="Due date"
          format="MM/dd/yyyy"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        <KeyboardTimePicker
          margin="normal"
          id="time-picker"
          label="Time(optional)"
          defaultValue={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        />
      <span style={{position: 'absolute', right: '-100px', top:'0px'}}>
      <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                handleCloseSchedule && handleCloseSchedule()
                setSchedule('')
              }}
            >
              <CloseIcon fontSize="inherit" color='error' />
            </IconButton>
      </span>
      </Grid>
    </MuiPickersUtilsProvider>
  );
}
