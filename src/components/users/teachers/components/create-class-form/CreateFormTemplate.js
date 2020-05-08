import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
// import ListItemText from '@material-ui/core/ListItemText';
// import ListItem from '@material-ui/core/ListItem';
// import List from '@material-ui/core/List';
// import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import AddIcon from '@material-ui/icons/Add';
import UpdateIcon from '@material-ui/icons/Update';

import { AUTH_CLASSES } from '../../../../../services/classesAuth/ClassesAuth';
import CreateClassForm from './CreateClassForm';
import ProgressBar from '../../../../auth/progressBar/ProgressBar'

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
    // maxWidth: '800px',
    // display: 'flex',
    //  justifyContent: 'center',
    //  alignItems: 'center',
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export function FullScreenForm(props) {
  const classes = useStyles();
  const linkState = props.location.state;
  const currClass = linkState?.currClass;
  const openForm = linkState?.openForm;
  const [open, setOpen] = React.useState(openForm || false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [createForm, setCreateForm] = useState({
    name: linkState?.currClass?.name,
    grade: linkState?.currClass?.grade,
    description: linkState?.currClass?.description,
    schoolYearStart: linkState?.currClass?.schoolYearStart,
    schoolYearEnd: linkState?.currClass?.schoolYearEnd,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCreateForm({ ...createForm, [name]: value });
  };
  const //proceed next step
    handleSubmit = async (e) => {
      try {
        setLoading(true);
        if (currClass) {
          if(!createForm.name){
            setErrorMessage('Name of the classroom is required!')
            setLoading(false);
            return
          }
          setSuccessMessage('Updating details! Please wait, it may take a moment...');
          await AUTH_CLASSES.updateClass(currClass._id, createForm);
        } else {
          if (!createForm.name) {
            setErrorMessage('Name of the classroom is required!')
            setLoading(false);
            return;
          }

          setSuccessMessage(
            'Creating a new class.Please wait, it may take a moment...'
          );
          await AUTH_CLASSES.createClass(createForm);
        }
        //set current state
        setLoading(false);
        setSuccessMessage('');
        setErrorMessage('')
        //set parent state
        setCreateForm({
          name: '',
          grade: '',
          description: '',
          schoolYearStart: '',
          schoolYearEnd: '',
        });
        props.history.push('/dashboard');
      } catch (error) {
        setErrorMessage('Sorry something went wrong. Try again later!');
        setLoading(false);
      }
    };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    props.history.goBack();
  };

  return (
    <div>
      {/* <Link to="/new-class/add" onClick={handleClickOpen} className="click-btn"><i className='fas fa-plus-circle'></i> Class</Link> */}

      <button onClick={handleClickOpen} className="click-btn">
        <i className="fas fa-plus-circle"></i> Class
      </button>

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
              Create or Update 
            </Typography>
            {isLoading ? (
              <CircularProgress />
            ) : (
              <Button
                autoFocus
                color="inherit"
                onClick={() => {
                  handleSubmit();
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
            )}
            <Button onClick={handleClose} color="inherit">
              Cancel
            </Button>
          </Toolbar>
        </AppBar>
        {linkState?.type.includes('Create') ? (
          <IconButton aria-label="addClass" color="inherit">
            <AddIcon />
          </IconButton>
        ) : (
          <IconButton aria-label="addClass" color="inherit">
            <UpdateIcon />
          </IconButton>
        )}
        <DialogTitle style={{ textAlign: 'center' }} id="form-dialog-title">
          {linkState?.type}
          {isLoading ? <ProgressBar isLoading={true} strengthValue={100}/>
          : <ProgressBar isLoading={false} strengthValue={100}/>}
        </DialogTitle>
        <DialogContent className={classes.content}>
          <DialogContentText style={{ textAlign: 'center' }}>
          {successMessage? <p style={{color: '#00c853'}}>{successMessage}</p>
          :errorMessage? <p style={{color: '#d50000'}}> {errorMessage} </p>: ''}
          </DialogContentText>

          <CreateClassForm
            createForm={createForm}
            image={props.location.state?.currClass?.path || ''}
            handleChange={handleChange}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default withRouter(FullScreenForm);
