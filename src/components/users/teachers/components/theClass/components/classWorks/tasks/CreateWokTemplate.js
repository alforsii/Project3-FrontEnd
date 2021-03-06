import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import AddIcon from '@material-ui/icons/Add';
import UpdateIcon from '@material-ui/icons/Update';

import { AUTH_CLASSES } from '../../../../../../../../services/classesAuth/ClassesAuth';
import { ClassworkContext } from '../../../../../../../../myContext/ClassworkProvider';
import CreateWorkForm from './CreateWorkForm';
import ProgressBar from '../../../../../../../auth/progressBar/ProgressBar';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
    backgroundColor: '#068ce6',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  content: {
    maxWidth: '1100px',
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export function FullScreenForm(props) {
  const classes = useStyles();
  const linkState = props.location.state;
  const openForm = linkState?.openForm;
  const [open, setOpen] = useState(openForm || false);

  //Set message for notification
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setLoading] = useState(false);

  const currClass = linkState?.currClass;

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  const handleClose = () => {
    setOpen(false);
    props.history.goBack();
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

  //Set schedule for notification
  const [schedule, setSchedule] = useState('');

  //Set topic button
  const [topic, setTopic] = useState(defaultTopic);
  //Classwork
  const [classwork, setClasswork] = useState({
    currClass: currClass?._id,
    title: '',
    description: '',
    topic: '',
    subject: '',
    students: [],
  });

  //Handle existing topic list
  const handleTopic = (newValue) => {
    setTopic(newValue);
    setClasswork({ ...classwork, topic: newValue.name });
  };
  //Handle students
  const handleStudents = (event, newValue) => {
    newValue = newValue.filter(
      (val) =>
        val.firstName !== defaultStudents.firstName &&
        val._id !== defaultStudents._id
    );
    setClasswork({ ...classwork, students: [...newValue] });
  };
  //Handle other inputs ( handles - title, desc and create new topic)
  const handleWorkInput = (event) => {
    if (errorMessage) setErrorMessage('');
    setClasswork({
      ...classwork,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <ClassworkContext.Consumer>
      {(classContext) => {
        const { students, classrooms } = classContext.classworkState;
        console.log('Output for: FullScreenForm -> classrooms', classrooms);
        console.log('Output for: FullScreenForm -> students', students);

        //Handle final Submit
        const handleWorkSubmit = async (event) => {
          setLoading(true);
          try {
            if (!classwork.title) {
              setErrorMessage('Please enter your classwork title*');
              setLoading(false);
              return;
            }
            setSuccessMessage('Creating a new classwork');
            if (classwork.students.length === 0 && students?.length !== 0) {
              const studentsIds = students.map((student) => student._id);
              await AUTH_CLASSES.createClasswork(
                { ...classwork, schedule, students: studentsIds },
                currClass._id
              );
            } else if (classwork.students.length === 0 && !students) {
              await AUTH_CLASSES.createClasswork(
                { ...classwork, schedule },
                currClass._id
              );
            } else {
              const studentsIds = classwork.students.map(
                (student) => student._id
              );
              await AUTH_CLASSES.createClasswork(
                { ...classwork, schedule, students: studentsIds },
                currClass._id
              );
            }

            setErrorMessage('');
            setSuccessMessage('');
            setClasswork({
              ...classwork,
              title: '',
              description: '',
              topic: '',
              students: [],
            });
            setTopic(defaultTopic);
            setLoading(false);
            handleClose();
          } catch (err) {
            console.log('FullScreenForm -> err', err);
          }
        };

        return (
          <div>
            <Dialog
              fullScreen
              open={open}
              onClose={handleClose}
              TransitionComponent={Transition}
            >
              <AppBar className={classes.appBar}>
                <Toolbar>
                  <IconButton
                    edge="start"
                    color="inherit"
                    onClick={handleClose}
                    aria-label="close"
                  >
                    <CloseIcon />
                  </IconButton>
                  <Typography variant="h6" className={classes.title}>
                    Classwork
                  </Typography>
                  <Button
                    autoFocus
                    color="inherit"
                    onClick={() => {
                      handleWorkSubmit();
                    }}
                  >
                    {linkState?.type.includes('Create') ? (
                      <>
                        <AddIcon /> Create
                      </>
                    ) : (
                      <>
                        Update
                        <UpdateIcon />
                      </>
                    )}
                  </Button>
                </Toolbar>
              </AppBar>
              <div className={classes.content}>
                {linkState?.type.includes('Create') ? (
                  <IconButton aria-label="addClass" color="inherit">
                    <AddIcon />
                  </IconButton>
                ) : (
                  <IconButton aria-label="addClass" color="inherit">
                    <UpdateIcon />
                  </IconButton>
                )}
                <DialogTitle
                  style={{ textAlign: 'center' }}
                  id="form-dialog-title"
                >
                  {linkState?.type}
                  {isLoading ? (
                    <ProgressBar isLoading={true} strengthValue={100} />
                  ) : (
                    <ProgressBar isLoading={false} strengthValue={100} />
                  )}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText style={{ textAlign: 'center' }}>
                    {successMessage ? (
                      <p style={{ color: '#00c853' }}>{successMessage}</p>
                    ) : errorMessage ? (
                      <p style={{ color: '#d50000' }}> {errorMessage} </p>
                    ) : (
                      ''
                    )}
                  </DialogContentText>

                  <CreateWorkForm
                    currClass={currClass}
                    classrooms={classrooms}
                    students={students}
                    topic={topic}
                    setSchedule={setSchedule}
                    schedule={schedule}
                    classwork={classwork}
                    defaultTopic={defaultTopic}
                    defaultStudents={defaultStudents}
                    handleTopic={handleTopic}
                    handleWorkSubmit={handleWorkSubmit}
                    handleWorkInput={handleWorkInput}
                    handleStudents={handleStudents}
                  />
                </DialogContent>
              </div>
              <DialogActions>
                <Button onClick={handleClose} color="inherit">
                  Cancel
                </Button>
                {linkState?.type.includes('Create') && (
                  <Button
                    variant="contained"
                    disabled={classwork?.title ? false : true}
                    type="submit"
                    onClick={handleClose}
                  >
                    Create & Post
                  </Button>
                )}
              </DialogActions>
            </Dialog>
          </div>
        );
      }}
    </ClassworkContext.Consumer>
  );
}

export default withRouter(FullScreenForm);
