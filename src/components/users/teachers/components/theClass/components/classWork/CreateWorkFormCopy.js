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
// import './CreateWorkForm.css';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    '& > *': {
      // margin: theme.spacing(1),
      // width: '100%',
      color: '#068ce6',
      margin: '10px'
    },
  },
  // form: {
  //   display: 'flex',
  //   justifyContent: 'space-between',
  //   alignItems: 'center',
  //   width: '100%'
  // },
  textField: {
    width: '700px',
    margin: '2px',
    flexGrow: 5
  },
  shortInputs: {
    width: '100%',
    margin: '2px',
  },
  buttonGroup: {
    // display:'flex',
    // justifyContent: 'space-around',
    // alignItems: 'center',
        '& > *': {
          // margin: theme.spacing(1),
          // width: '300px',
          // borderRadius: '30px'
        },
      }
}));

export default function CreateWorkForm({
  currClass,
  classrooms,
  students,
  topic,
  setSchedule,
  schedule,
  classwork,
  defaultTopic,
  defaultStudents,
  handleTopic,
  handleWorkSubmit,
  handleWorkInput,
  handleStudents

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

  return (
    <>
      <form 
        onSubmit={handleWorkSubmit}
        className={classes.root}
        noValidate
        autoComplete="off"
      >

          <div>
          <TextField
          disabled
          className={classes.textField}
          id="standard-disabled"
          label="Classroom"
          defaultValue={`${currClass?.name}, grade ${currClass?.grade}`}
        />
        <Autocomplete
          multiple
          className={classes.textField}
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
          rows={13}
          variant="filled"
          value={classwork.description}
          onChange={handleWorkInput}
        />
          </div>
          {/* end first form div */}
          <Divider orientation='vertical' flexItem/>
       <div>

        {topic !== 'create topic' ? (
          <Button onClick={handleClickTopic} className={classes.shortInputs} variant="outlined">
            {`${topic.name} ${topic.grade}`}
          </Button>
        ) : (
          <React.Fragment>
        <FormControl >
          <InputLabel htmlFor="create-topic">Create Topic</InputLabel>
          <Input className={classes.shortInputs}
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
        :<Button className={classes.shortInputs}
       
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
       </div>

              {/* <div  className={classes.buttonGroup} >
                <Button type="submit">Create</Button>
                <Button variant='outlined' disabled={ classwork.title ? false:true} type="submit">Create & Post</Button>
              </div> */}

       
      </form>
    </>
  );
}
