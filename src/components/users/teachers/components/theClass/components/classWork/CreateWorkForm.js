import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';

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
  InputAdornment,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import DatePickers from './DatePickers'
import { AUTH_CLASSES } from '../../../../../../../services/classesAuth/ClassesAuth'
import './CreateWorkForm.css';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      // margin: theme.spacing(1),
      width: '400px',
      color: '#068ce6',
    },
  },
  textField: {
    width: '100%',
    margin: '2px'
  },
  buttonGroup: {
    display:'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
        '& > *': {
          margin: theme.spacing(1),
          width: '300px',
          borderRadius: '30px'
        },
      }
}));

export default function CreateWorkForm({
  currClass,
  classrooms,
  students,
  displayForm,

}) {
  const classes = useStyles();
  const [anchorElTopic, setAnchorElTopic] = useState(null);
  const [anchorElSchedule, setAnchorElSchedule] = useState(null);
  const openTopic = Boolean(anchorElTopic);
  const openSchedule = Boolean(anchorElSchedule);

  const ITEM_HEIGHT = 48;
  const handleClickTopic = event => {
    setAnchorElTopic(event.currentTarget);
  };
  const handleClickSchedule = event => {
    setAnchorElSchedule(event.currentTarget);
  };

  const handleCloseTopic = () => {
    setAnchorElTopic(null);
  };
  const handleCloseSchedule = () => {
    setAnchorElSchedule(null);
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
  //Set schedule for notification
  const [schedule, setSchedule] = useState('');
  console.log("Output for: schedule", schedule)
  //Set topic button
  const [topic, setTopic] = useState(defaultTopic);
  //Classwork
  const [classwork, setClasswork] = useState({
    currClass: currClass?._id ,
    title: '',
    description: '',
    topic: '',
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
  const handleWorkSubmit = async event => {
    event.preventDefault();
    if (!classwork.title) {
      return setMessage('Please enter you classwork title*');
    }
    if (classwork.students.length === 0) {
      const studentsIds = students.map(student => student._id)
      // console.log({ ...classwork, students: students });
      const { data: { classworkFromDB}} = await AUTH_CLASSES.createClasswork({ ...classwork, schedule, students: studentsIds }, currClass._id)
      // console.log("Output for: classworks", classworkFromDB)
    } else {
      const studentsIds = classwork.students.map(student => student._id)
      const { data: { classworkFromDB}} = await AUTH_CLASSES.createClasswork({...classwork, schedule, students: studentsIds}, currClass._id)
      // console.log("Output for: classworks", classworkFromDB)
    }
    displayForm('#classwork-form');
    setClasswork({
      ...classwork,
      title: '',
      description: '',
      topic: '',
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
        <div id='x-close-icon'>
          <h2>Classwork</h2>
          <IconButton
            aria-label="close"
            color="inherit"
            onClick={() => {
              displayForm('#classwork-form');
              setMessage('')
            }}
          >
            <CloseIcon  className="close-classwork-form-btn" color="inherit" />
          </IconButton>
        </div>

          <TextField
          disabled
          id="standard-disabled"
          label="Classroom"
          defaultValue={`${currClass?.name}, grade ${currClass?.grade}`}
        />
        <Autocomplete
          multiple
          id="fixed-tags-demo"
          size="small"
          limitTags={2}
          value={
            classwork?.students.length > 0
              ? classwork.students
              : [defaultStudents]
          }
          onChange={handleStudents}
          options={students}
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
          label='Title'
          required={true}
          className={classes.textField}
          placeholder='Title(required)'
          variant="standard"
          value={classwork.title}
          onChange={handleWorkInput}
        />
        <TextField
          name="description"
          label="Description"
          className={classes.textField}
          placeholder="Description(optional)"
          multiline
          rows={4}
          variant="filled"
          value={classwork.description}
          onChange={handleWorkInput}
        />
       
        {topic !== 'create topic' ? (
          <Button onClick={handleClickTopic} className={classes.textField} variant="outlined">
            {`${topic.name} ${topic.grade}`}
          </Button>
        ) : (
          <React.Fragment>
        <FormControl >
          <InputLabel htmlFor="create-topic">Create Topic</InputLabel>
          <Input className={classes.textField}
            id="create-topic"
            name="topic"
              label="Create Topic"
            value={classwork?.topic?.name}
            onChange={handleWorkInput}
            endAdornment={
              <InputAdornment position="end">
                 <IconButton
              aria-label="close"
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
        
        {schedule? <DatePickers 
        schedule={true}
        setSchedule={setSchedule}/>
        :<Button className={classes.textField}
       
         onClick={handleClickSchedule} variant="outlined">
        { 'Schedule'}
      </Button>}

      <Menu
          onClose={handleCloseSchedule}
          id="long-menu"
          anchorEl={anchorElSchedule}
          keepMounted
          open={openSchedule}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: '45ch',
            },
          }}
        >
          <div>
        <DatePickers setSchedule={setSchedule} handleCloseSchedule={handleCloseSchedule}/>
        </div>

          </Menu>

        <Menu
          onClose={handleCloseTopic}
          id="long-menu"
          anchorEl={anchorElTopic}
          keepMounted
          open={openTopic}
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
              handleCloseTopic();
              handleTopic(defaultTopic);
            }}
          >
            No Topic
          </MenuItem>
          <MenuItem
            selected={topic.name === topic.name}
            onClick={() => {
              handleCloseTopic();
              handleTopic('create topic');
            }}
          >
            Create topic
          </MenuItem>
          <Divider style={{ width: '100%' }} />
          {classrooms?.map(topic => (
            <MenuItem
              key={topic._id}
              onClick={() => {
                handleCloseTopic();
                handleTopic(topic);
              }}
            >
              {topic.name}
            </MenuItem>
          ))}
        </Menu>

              <div  className={classes.buttonGroup} >
                <Button type="submit">Create</Button>
                <Button variant='outlined' disabled={ classwork.title ? false:true} type="submit">Create & Post</Button>
              </div>

       
      </form>
    </div>
  );
}
