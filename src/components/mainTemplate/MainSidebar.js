import React from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import LockIcon from '@material-ui/icons/Lock';
import SettingsIcon from '@material-ui/icons/Settings';
import DashboardIcon from '@material-ui/icons/Dashboard';
import SchoolIcon from '@material-ui/icons/School';
import MessageIcon from '@material-ui/icons/Message';
import GitHubIcon from '@material-ui/icons/GitHub';

import ClassSideNavbar from '../users/teachers/components/theClass/components/classSidebar/ClassSidebar';
import MessageSidebar from '../messageBoard/components/messageSidebar/MessageSidebar'  
import SettingsSidebar from '../settings/SettingsSidebar'
// import Avatar from '../auth/avatar/Avatar';
import './MainSidebar.css';
const useStyles = makeStyles({
  list: {
    width: 400,
    height: '100vh',
    // display: 'flex',
    // flexDirection: 'row',
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
    // color: "#0794f3  !important",
    transition: 'all 1s linier',
    fontSize: '30px',
    "&:hover": {
      color: "#0794f3  !important",
      }
  },
  columnDiv: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    // width: '350px',
    overflow: 'hidden',
  },
  iconsDiv: {
    width: '70px',
    height: '100vh',
  },
});

export default function TemporaryDrawer({ user, isUserLoggedIn }) {
  const classes = useStyles();
  const [comp, setComp] = React.useState('')

  return (
    <div className={(classes.list, 'mu-sidebar')}>
      <List className={classes.iconsDiv}>
        <Link onClick={() => setComp('dashboard') } className={classes.link} to="/dashboard">
          <ListItem button >
            <ListItemIcon >
              <DashboardIcon className={classes.hover} />
            </ListItemIcon>
          </ListItem>
        </Link>
        <Link onClick={() => setComp('message-board') } className={classes.link} to="/message-board">
          <ListItem button >
            <ListItemIcon >
              <MessageIcon className={classes.hover} />
            </ListItemIcon>
          </ListItem>
        </Link>
        <Link onClick={() => setComp('class') } className={classes.link} to="/class">
          <ListItem button >
            <ListItemIcon >
              <SchoolIcon className={classes.hover}/>
            </ListItemIcon>
          </ListItem>
        </Link>
        <Link onClick={() => setComp('settings') } className={classes.link} to="/settings">
          <ListItem button >
            <ListItemIcon >
              <LockIcon className={classes.hover} />
            </ListItemIcon>
          </ListItem>
        </Link>
        <Link onClick={() => setComp('settings') } className={classes.link} to="/settings">
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
        { comp === 'message-board' && <MessageSidebar/>}
        <Switch>
          <Route exact strict path='/class/:classId' component={ClassSideNavbar}/>
          <Route exact strict path='/dashboard' render={props => <SettingsSidebar {...props} user={user} isUserLoggedIn={isUserLoggedIn} />}/>
        </Switch>

      </div>
    </div>
  );
}
