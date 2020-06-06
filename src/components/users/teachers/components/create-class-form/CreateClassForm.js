import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    '& > *': {},
  },
  textField: {
    width: '100%',
    padding: 5,
  },
  columns: {
    maxWidth: '500px',
  },
  rows: {},
  button: {},
}));

export function CreateClassForm(props) {
  const { createForm, handleChange, image } = props;
  const classes = useStyles();
  const {
    name,
    grade,
    description,
    schoolYearStart,
    schoolYearEnd,
  } = createForm;

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <img
        className="cover-image-md"
        src={image ? image : '/images/cartoon-kids.jpg'}
        alt="School cover"
      />

      <div className={classes.columns}>
        <TextField
          className={classes.textField}
          onChange={handleChange}
          type="text"
          variant="filled"
          id="name"
          name="name"
          value={name}
          label="Class Name(required)"
        />
        <TextField
          className={classes.textField}
          onChange={handleChange}
          type="text"
          variant="filled"
          id="grade"
          name="grade"
          value={grade}
          label="Class Grade"
        />
        <TextField
          className={classes.textField}
          onChange={handleChange}
          type="text"
          variant="filled"
          id="description"
          name="description"
          value={description}
          label="Class Description"
        />
        <TextField
          className={classes.textField}
          onChange={handleChange}
          type="date"
          variant="filled"
          id="schoolYearStart"
          name="schoolYearStart"
          value={schoolYearStart}
          label="School Starts"
        />
        <TextField
          className={classes.textField}
          onChange={handleChange}
          type="date"
          variant="filled"
          id="schoolYearEnd"
          name="schoolYearEnd"
          value={schoolYearEnd}
          label="School Ends"
        />
      </div>
    </form>
  );
}

export default CreateClassForm;
