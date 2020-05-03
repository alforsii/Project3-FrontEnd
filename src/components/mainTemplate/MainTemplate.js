import React from 'react';
import { Switch} from 'react-router-dom'

import PublicRoute from '../protectedRoute/PublicRoutes'
import ProtectedRoute from '../protectedRoute/ProtectedRoute'
import TeacherPage from '../users/teachers/TeacherPage'
import TheClass from '../users/teachers/components/theClass/TheClass'
import AddNewClass from '../users/teachers/components/create-class-form/ClassForm'
import MessageBoard from '../messageBoard/MessageBoard';
import UpdateProfile from '../update-upload/UpdateProfile'
import LoginForm from '../auth/LoginForm';
import Home from '../home/Home';
import LandingPage from '../home/LandingPage';
import MainSidebar from './MainSidebar'
import MainNavbar from './MainNavbar'

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
    flexGrow: 1,
    padding: theme.spacing(2),
  },
}));

export default function MiniDrawer() {
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
      
      <MainNavbar handleDrawerOpen={handleDrawerOpen}
       open={open}
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
        <MainSidebar />
      </Drawer>
      <main className={classes.content}>
        {/* <div className={classes.toolbar} /> */}
        {/* ["xs","sm","md","lg","xl",false]. */}
        <Container maxWidth="xl">
        {/* <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '100vh' }} /> */}
        <Switch>
            <PublicRoute exact path="/" component={LandingPage} />
            <ProtectedRoute exact path="/home" component={Home} />
            <PublicRoute exact path="/login" component={LoginForm} />
            <ProtectedRoute exact path="/class" component={TeacherPage} />
            <ProtectedRoute exact path="/class/new" component={AddNewClass} />
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
