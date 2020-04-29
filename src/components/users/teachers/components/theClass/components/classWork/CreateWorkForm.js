import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import {
  FormControl,
  MenuItem,
  Menu,
  Button,
  TextField,
  Divider,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
// import { withStyles } from '@material-ui/core/styles'

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
}) {
  const classes = useStyles();
  const [newWork, setNewWork] = useState({ name:'', description:'',topic:'', students: [], class: currClass });
  console.log("Output for: newWork", newWork)
  const [students, setStudents] = useState([]);
  const [defaultStudents] = useState({
    _id: 'secret-id-students',
    firstName: 'For all students',
    lastName: '',
  });
  useEffect(() => {
    setNewWork({ ...newWork, students: filteredStudents })
  }, [])
  const [defaultTopic] = useState({
    _id: 'secret-id-topic',
    name: 'no topic',
    grade: '',
  });
  const [topic, setTopic] = useState(defaultTopic);
  const [newTopic, setNewTopic] = useState({});

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const ITEM_HEIGHT = 48;
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  console.log('Output for: students', students);

  //Handle topic
  const handleTopic = newValue => {
    setTopic(newValue);
    setNewWork({ ...newWork, topic: newValue});
  };
  // //Handle Create new topic
  const handleCreateTopic = event => {
    setNewTopic({ name: event.target.value });
    setNewWork({ ...newWork, topic: event.target.value });
  };
  //Handle students
  const handleStudents = (event, newValue) => {
    newValue = newValue.filter(
      val =>
        val.firstName !== defaultStudents.firstName &&
        val._id !== defaultStudents._id
    );
    if(students.length === 0) {
      setNewWork({ ...newWork, students: filteredStudents});
    }
    else setStudents([...newValue]);
    setNewWork({ ...newWork, students: [ ...students, ...newValue]});
    console.log("students", newWork)
  };
  //Handle other inputs
  const  handleChange =   (event) => {
    setNewWork({
      ...newWork,
      [event.target.name]: event.target.value
    });
    console.log("Output for: handleChange -> event.target.name", event.target.name)
  };
const handleWorkSubmit = event => {
event.preventDefault()
console.log(newWork)
setNewWork({ name:'', description:'', topic:'' })
}
  return (
    <div>
      <form onSubmit={handleWorkSubmit} className={classes.root} noValidate autoComplete="off">
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
          value={students.length > 0 ? students : [defaultStudents]}
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
          name="name"
          label="Title"
          placeholder="Title"
          // value={newWork.name}
          onChange={handleChange}
        />
        <TextField
          name="description"
          label="Description"
          placeholder="Description"
          multiline
          rowsMax={4}
          // value={newWork.description}
          onChange={handleChange}
        />

        {topic !== 'create topic' ? (
          <Button onClick={handleClick}>
            {`${topic.name} ${topic.grade}`}
          </Button>
        ) : (
          <React.Fragment>
            <div>
              <TextField
                label="Create Topic"
                placeholder="Type new topic"
                multiline
                rowsMax={2}
                value={newTopic.name}
                style={{ width: '100%' }} 
                onChange={handleCreateTopic}
              />
              <CloseIcon onClick={() => handleTopic(defaultTopic)} />
            </div>
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
              // padding: '20px'
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
              // handleClose()
              handleTopic('create topic');
              handleClose();
              // handleTopic(topic)
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

        <Button  type="submit">
          Post
        </Button>
      </form>
    </div>
  );
}
