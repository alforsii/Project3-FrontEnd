// import React, { useState, useEffect } from 'react';
// import { Link, withRouter } from 'react-router-dom';
// import { makeStyles } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';
// import Dialog from '@material-ui/core/Dialog';
// import ListItemText from '@material-ui/core/ListItemText';
// import ListItem from '@material-ui/core/ListItem';
// import List from '@material-ui/core/List';
// import Divider from '@material-ui/core/Divider';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import IconButton from '@material-ui/core/IconButton';
// import Typography from '@material-ui/core/Typography';
// import CloseIcon from '@material-ui/icons/Close';
// import Slide from '@material-ui/core/Slide';
// import AddIcon from '@material-ui/icons/Add';
// import TextField from '@material-ui/core/TextField';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
// import DialogTitle from '@material-ui/core/DialogTitle';

// import { AUTH_CLASSES } from '../../../../../services/classesAuth/ClassesAuth';
// import Loader from '../../../../messageBoard/components/loader/Loader';
// import CreateClassForm from './CreateClassForm';

// const useStyles = makeStyles((theme) => ({
//   appBar: {
//     position: 'relative',
//     backgroundColor: '#068ce6',
//   },
//   title: {
//     marginLeft: theme.spacing(2),
//     flex: 1,
//   },
// }));

// const Transition = React.forwardRef(function Transition(props, ref) {
//   return <Slide direction="up" ref={ref} {...props} />;
// });

// export function FullScreenForm(props) {
//   const classes = useStyles();
//   const [open, setOpen] = React.useState(true);
//   const currClass = props.location.state?.currClass
//   const [message, setMessage] = useState('');
//   const [isLoading, setLoading] = useState(false);
//   const [createForm, setCreateForm] = useState({
//     name: props.location.state?.currClass.name,
//     grade: props.location.state?.currClass.grade,
//     description: props.location.state?.currClass.description,
//     schoolYearStart: props.location.state?.currClass.schoolYearStart,
//     schoolYearEnd: props.location.state?.currClass.schoolYearEnd,
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setCreateForm({ ...createForm, [name]: value });
//   };
//   const //proceed next step
//     handleSubmit = async (e) => {
//       console.log("handleSubmit")
//       // e.preventDefault();
//       try {
//         setLoading(true);
//         if (currClass) {
//           setMessage('Updating details! Please wait, it may take a moment...');
//           await AUTH_CLASSES.updateClass(currClass._id, createForm);
//         } else {
//           setMessage(
//             'Creating a new class.Please wait, it may take a moment...'
//           );
//           await AUTH_CLASSES.createClass(createForm);
//         }
//         //set current state
//         setLoading({ isLoading: false });
//         setMessage('');
//         //set parent state
//         setCreateForm({
//           name: '',
//           grade: '',
//           description: '',
//           schoolYearStart: '',
//           schoolYearEnd: '',
//         });
//         handleClose();
//         //redirect to the origin page
//         // props.history.push('/dashboard');
//       } catch (error) {
//         setMessage('Sorry something went wrong. Try again later!');
//         setLoading(false);
//       }
//     };

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   return (
//     <div>

//       <button onClick={handleClickOpen} className="click-btn">
//         <i className="fas fa-plus-circle"></i> Class
//       </button>

//       <Dialog
//         fullScreen
//         open={open}
//         onClose={handleClose}
//         TransitionComponent={Transition}
//       >
//         <AppBar className={classes.appBar}>
//           <Toolbar>
//             <IconButton
//               edge="start"
//               color="inherit"
//               onClick={handleClose}
//               aria-label="close"
//             >
//               <CloseIcon />
//             </IconButton>
//             <Typography variant="h6" className={classes.title}>
//               Create a new class here
//             </Typography>
//             <Button
//               autoFocus
//               color="inherit"
//               onClick={() => {
//                 handleSubmit();
//               }}
//             >
//               Save
//             </Button>
//           </Toolbar>
//         </AppBar>
//         <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
//         <DialogContent>
//           <DialogContentText>
//             To subscribe to this website, please enter your email address here.
//             We will send updates occasionally.
//           </DialogContentText>

//           <CreateClassForm
//             createForm={createForm}
//             image={props.location.state?.currClass.path || ''}
//             handleChange={handleChange}
//           />
   
//         </DialogContent>
    
//       </Dialog>
//     </div>
//   );
// }

// export default withRouter(FullScreenForm);
