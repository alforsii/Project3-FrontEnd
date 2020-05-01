import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import Alert from '@material-ui/lab/Alert';
import {
  MenuItem,
  Menu,
  Button,
  TextField,
  Divider,
  IconButton,
  FormControl,
  InputLabel,
  Input,
  InputAdornment
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import './CreateWorkForm.css';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '45ch',
    },
  },
}));

export default function CreateWorkForm({
  currClass,
  classrooms,
  filteredStudents,
  displayForm,
}) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const ITEM_HEIGHT = 48;
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const defaultTopic = {
    _id: 'secret-id-topic',
    name: 'no topic',
    grade: '',
  };
  const defaultStudents = {
    _id: 'secret-id-students',
    firstName: 'For all students',
    lastName: '',
  };
  //Set message for notification
  const [message, setMessage] = useState('');
  //Set topic button
  const [topic, setTopic] = useState(defaultTopic);
  //Classwork
  const [classwork, setClasswork] = useState({
    currClass,
    title: '',
    description: '',
    topic: defaultTopic,
    students: [],
  });

  //Handle existing topic list
  const handleTopic = newValue => {
    setTopic(newValue);
    setClasswork({ ...classwork, topic: newValue.name });
  };
  //Handle students
  const handleStudents = (event, newValue) => {
    newValue = newValue.filter(
      val =>
        val.firstName !== defaultStudents.firstName &&
        val._id !== defaultStudents._id
    );
    setClasswork({ ...classwork, students: [...newValue] });
  };
  //Handle other inputs ( handles - title, desc and create new topic)
  const handleWorkInput = event => {
    if (message) setMessage('');
    setClasswork({
      ...classwork,
      [event.target.name]: event.target.value,
    });
  };
  //Handle final Submit
  const handleWorkSubmit = event => {
    event.preventDefault();
    if (!classwork.title) {
      return setMessage('Please enter you classwork title*');
    }
    if (classwork.students.length === 0) {
      console.log({ ...classwork, students: filteredStudents });
    } else {
      console.log(classwork);
    }
    displayForm('#classwork-form');
    setClasswork({
      ...classwork,
      title: '',
      description: '',
      topic: defaultTopic,
      students: [],
    });
    setTopic(defaultTopic);
  };
  return (
    <div id="classwork-form" className="classwork-form hide">
      <form
        onSubmit={handleWorkSubmit}
        className={classes.root}
        noValidate
        autoComplete="off"
      >
        <p style={{color: 'red', margin: 0, textAlign: 'center'}}>{message}</p>
        <div>
          <IconButton
            aria-label="more"
            aria-controls="long-menu"
            aria-haspopup="true"
            onClick={() => {
              displayForm('#classwork-form');
              setMessage('')
            }}
          >
            <CloseIcon className="close-classwork-form-btn" color="inherit" />
          </IconButton>
        </div>
        <TextField
          disabled
          id="standard-disabled"
          label="Classroom"
          defaultValue={`${currClass.name}, grade ${currClass.grade}`}
        />
        <Autocomplete
          multiple
          id="fixed-tags-demo"
          size="small"
          limitTags={2}
          value={
            classwork.students.length > 0
              ? classwork.students
              : [defaultStudents]
          }
          onChange={handleStudents}
          options={filteredStudents}
          getOptionLabel={student => `${student.firstName} ${student.lastName}`}
          renderInput={student => (
            <TextField
              {...student}
              label="Students"
              variant="standard"
              placeholder="Search for student"
            />
          )}
        />
        <TextField
          name="title"
          label={message? message:'Title'}
          required={true}
          placeholder={message? message:'Title(required)'}
          value={classwork.title}
          onChange={handleWorkInput}
        />
        <TextField
          name="description"
          label="Description"
          placeholder="Description(optional)"
          multiline
          rowsMax={4}
          value={classwork.description}
          onChange={handleWorkInput}
        />

        {topic !== 'create topic' ? (
          <Button onClick={handleClick}>
            {`${topic.name} ${topic.grade}`}
          </Button>
        ) : (
          <React.Fragment>
        <FormControl >
          <InputLabel htmlFor="standard-adornment-password">Create Topic</InputLabel>
          <Input
            id="standard-adornment-password"
            name="topic"
              label="Create Topic"
            value={classwork.topic?.name}
            onChange={handleWorkInput}
            endAdornment={
              <InputAdornment position="end">
                 <IconButton
              // aria-label="close"
              color="inherit"
              size="small"
              onClick={() => handleTopic(defaultTopic)}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
          </React.Fragment>
        )}

        <Menu
          onClose={handleClose}
          id="long-menu"
          anchorEl={anchorEl}
          keepMounted
          open={open}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: '45ch',
            },
          }}
        >
          <MenuItem
            selected={topic.name === topic.name}
            onClick={() => {
              handleClose();
              handleTopic(defaultTopic);
            }}
          >
            No Topic
          </MenuItem>
          <MenuItem
            selected={topic.name === topic.name}
            onClick={() => {
              handleClose();
              handleTopic('create topic');
            }}
          >
            Create topic
          </MenuItem>
          <Divider style={{ width: '100%' }} />
          {classrooms.map(topic => (
            <MenuItem
              key={topic._id}
              onClick={() => {
                handleClose();
                handleTopic(topic);
              }}
            >
              {topic.name}
            </MenuItem>
          ))}
        </Menu>

        <Button type="submit">Post</Button>
      </form>
    </div>
  );
}
