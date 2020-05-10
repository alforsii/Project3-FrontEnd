import React, {useState} from 'react';
import { Switch, Route, Redirect} from 'react-router-dom'

import ProtectedRoute from '../protectedRoute/ProtectedRoute'
import TeacherPage from '../users/teachers/TeacherPage'
import TheClass from '../users/teachers/components/theClass/TheClass'
import MessageBoard from '../messageBoard/MessageBoard';
import UpdateProfile from '../settings/UpdateProfile'
import MainSidebar from './MainSidebar'
import MainNavbar from './MainNavbar'
import CreateFormTemplate from '../users/teachers/components/create-class-form/CreateFormTemplate'
import CreateWokTemplate from '../users/teachers/components/theClass/components/classWork/CreateWokTemplate'
import UpcomingPageMessage from '../upcomingPage/UpcomingPageMessage'

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

export default function MiniDrawer({ user, isUserLoggedIn,
updateState }) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [webPage, setWebPage] = useState('Dashboard')

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
      webPage={webPage}
       open={open}
       user={user}
       updateState={updateState}
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
        setWebPage={setWebPage}
        open={open}
        handleDrawerOpen={handleDrawerOpen}
        isUserLoggedIn={isUserLoggedIn} 
        user={user}/>
      </Drawer>
      <main className={classes.content}>
        {/* ["xs","sm","md","lg","xl",false]. */}
        <Container style={{maxWidth: '1100px'}}>
        <Switch>
            <ProtectedRoute exact path="/dashboard" component={TeacherPage} />

            <Route exact path="/classwork/create" component={CreateWokTemplate} />
            <Route exact path="/classwork/update" component={CreateWokTemplate} />

            <ProtectedRoute exact path="/new-class/add" component={CreateFormTemplate} />
            <ProtectedRoute exact path="/update-class/edit" component={CreateFormTemplate} />
            <ProtectedRoute exact path="/class/:classId"
              handleDrawerOpen={handleDrawerOpen}
             component={TheClass} />

            <ProtectedRoute exact path="/message-board" component={MessageBoard}/>
            <ProtectedRoute exact path="/message-board/:id" component={MessageBoard}/>
            <ProtectedRoute exact path="/class" component={UpcomingPageMessage}/>
            <ProtectedRoute exact path="/account" component={UpcomingPageMessage}/>

            <ProtectedRoute exact path="/settings" component={UpdateProfile}/>
            <Route path='/' render={props => <Redirect to='/dashboard' />} />
          </Switch>
      </Container>
      </main>
    </div>
  );
}
