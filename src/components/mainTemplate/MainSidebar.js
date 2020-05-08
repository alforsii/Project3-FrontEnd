import React from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import LockIcon from '@material-ui/icons/Lock';
import SettingsIcon from '@material-ui/icons/Settings';
import DashboardIcon from '@material-ui/icons/Dashboard';
import SchoolIcon from '@material-ui/icons/School';
import MessageIcon from '@material-ui/icons/Message';
import GitHubIcon from '@material-ui/icons/GitHub';

import ClassSideNavbar from '../users/teachers/components/theClass/components/classSidebar/ClassSidebar';
import MessageSidebar from '../messageBoard/components/messageSidebar/MessageSidebar'  
import SettingsSidebar from '../settings/SettingsSidebar'
// import Account from '../account/Account'
import './MainSidebar.css';

const useStyles = makeStyles({
  list: {
    width: 400,
    height: '100vh',
  },
  fullList: {
    width: 'auto',
  },
  link: {
    textDecoration: 'none',
    color: '#333',
    padding: 1,
    margin: 0
  },
  hover: {
    transition: 'all 1s linier',
    fontSize: '30px',
    "&:hover": {
      color: "purple  !important",
      }
  },
  columnDiv: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    overflow: 'hidden',
  },
  iconsDiv: {
    width: '70px',
    height: '100vh',
  },
});

export default function TemporaryDrawer({ user, isUserLoggedIn, handleDrawerOpen, setWebPage }) {
  const classes = useStyles();

  return (
    <div className={(classes.list, 'mu-sidebar')}>
      <List className={classes.iconsDiv}>
        <Link onClick={() => setWebPage('Dashboard')} className={classes.link} to="/dashboard">
          <ListItem button >
            <ListItemIcon >
              <DashboardIcon className={classes.hover} />
            </ListItemIcon>
          </ListItem>
        </Link>
        <Link onClick={() => {
          handleDrawerOpen()
          setWebPage('Chatroom')
        }} className={classes.link} to="/message-board">
          <ListItem button >
            <ListItemIcon >
              <MessageIcon className={classes.hover} />
            </ListItemIcon>
          </ListItem>
        </Link>
        <Link onClick={() => setWebPage('Classrooms')} className={classes.link} to="/class">
          <ListItem button >
            <ListItemIcon >
              <SchoolIcon className={classes.hover}/>
            </ListItemIcon>
          </ListItem>
        </Link>
        <Link onClick={() => setWebPage('Account')} className={classes.link} to="/account">
          <ListItem button >
            <ListItemIcon >
              <LockIcon className={classes.hover} />
            </ListItemIcon>
          </ListItem>
        </Link>
        <Link onClick={() => setWebPage('Settings')} className={classes.link} to="/settings">
          <ListItem button >
            <ListItemIcon >
              <SettingsIcon className={classes.hover} />
            </ListItemIcon>
          </ListItem>
        </Link>

        <Divider />
        <a className={classes.link} href="https://github.com/alforsii">
          <ListItem button >
            <ListItemIcon className={classes.hover}>
              <GitHubIcon />
            </ListItemIcon>
          </ListItem>
        </a>
      </List>
      <Divider orientation="vertical" flexItem />
      <div className="dynamic-sidebars">
        <Switch>
          <Route exact strict path='/message-board' component={MessageSidebar}/>
          <Route exact strict path='/message-board/:id' component={MessageSidebar}/>
          <Route exact strict path='/class/:classId' component={ClassSideNavbar}/>
          {/* <Route exact strict path='/account' render={props => <Account {...props} user={user}/>}/> */}
          <Route exact strict path='/dashboard' render={props => <SettingsSidebar {...props} user={user} isUserLoggedIn={isUserLoggedIn} />}/>
        </Switch>

      </div>
    </div>
  );
}
