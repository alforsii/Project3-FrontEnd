import React from 'react';
import { Switch} from 'react-router-dom'

import ProtectedRoute from '../protectedRoute/ProtectedRoute'
import TeacherPage from '../users/teachers/TeacherPage'
import TheClass from '../users/teachers/components/theClass/TheClass'
// import AddNewClass from '../users/teachers/components/create-class-form/ClassForm'
import MessageBoard from '../messageBoard/MessageBoard';
import UpdateProfile from '../settings/UpdateProfile'
import MainSidebar from './MainSidebar'
import MainNavbar from './MainNavbar'
import CreateFormTemplate from '../users/teachers/components/create-class-form/CreateFormTemplate'

import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Container from '@material-ui/core/Container';



const drawerWidth = 400;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 100,
    maxWidth: '1200px',
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(0),
  },
}));

export default function MiniDrawer({ user, isUserLoggedIn, handleLogout }) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <MainNavbar 
       open={open}
       user={user}
       handleLogout={handleLogout}
      handleDrawerOpen={handleDrawerOpen}
       />
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <MainSidebar 
        handleLogout={handleLogout}
        isUserLoggedIn={isUserLoggedIn} 
        user={user}/>
      </Drawer>
      <main className={classes.content}>
        {/* ["xs","sm","md","lg","xl",false]. */}
        <Container style={{maxWidth: '1100px'}}>
        <Switch>
            <ProtectedRoute exact path="/dashboard" component={TeacherPage} />

            <ProtectedRoute exact path="/new-class/add" component={CreateFormTemplate} />
            <ProtectedRoute exact path="/update-class/edit" component={CreateFormTemplate} />
            <ProtectedRoute exact path="/class/:classId" component={TheClass} />

            <ProtectedRoute exact path="/message-board" component={MessageBoard}/>
            <ProtectedRoute exact path="/message-board/:id" component={MessageBoard}/>

            <ProtectedRoute exact path="/settings" component={UpdateProfile}/>
          </Switch>
      </Container>
      </main>
    </div>
  );
}
