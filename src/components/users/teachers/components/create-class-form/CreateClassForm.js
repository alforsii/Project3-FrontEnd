import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
     
    //   flexDirection: 'row',
    //   flexWrap: 'wrap',
      width: '100%',
    //   flexFlow: 1,
      '& > *': {
        // margin: theme.spacing(1),
        // width: '25ch',
      },
    },
    textField: {
        width: '600px',
      padding: 5,
    },
    columns: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    rows: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      flexWrap: 'wrap',
      width: '100%',
    },
    button: {
      backgroundColor: '#0794f3',
      width: '200px',
    }
  }));
  
  export function CreateClassForm(props) {
      const {createForm, handleChange, image} = props
    const classes = useStyles();
    const { name, grade, description, schoolYearStart, schoolYearEnd} = createForm

    return (
      <form className={classes.root} noValidate autoComplete="off">
         
          <Container className={classes.columns}>
        {/* <img className='cover-image-md' src={image? image:'/images/school-class.jpg'} alt='School cover image' /> */}

        <div className={classes.columns}>
          <TextField className={classes.textField} onChange={handleChange} type='text' variant="filled" id="name" name='name'  value={name} label="Class Name" />
          <TextField className={classes.textField} onChange={handleChange} type='text' variant="filled" id="grade" name='grade' value={grade} label="Class Grade" />
          <TextField className={classes.textField} onChange={handleChange} type='text' variant="filled" id="description" name='description' value={description} label="Class Description" />
          <TextField className={classes.textField} onChange={handleChange} type='date' variant="filled" id="schoolYearStart" name='schoolYearStart' value={schoolYearStart} label="School Starts" />
          <TextField className={classes.textField} onChange={handleChange} type='date' variant="filled" id="schoolYearEnd" name='schoolYearEnd' value={schoolYearEnd} label="School Ends" />
        </div>
        </Container>
      </form>
    );
  }

  export default CreateClassForm