import React from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import LockIcon from '@material-ui/icons/Lock';
import SettingsIcon from '@material-ui/icons/Settings';
import DashboardIcon from '@material-ui/icons/Dashboard';
import SchoolIcon from '@material-ui/icons/School';
import MessageIcon from '@material-ui/icons/Message';
import GitHubIcon from '@material-ui/icons/GitHub';

import ClassSideNavbar from '../users/teachers/components/theClass/components/classSidebar/ClassSidebar';
import MessageSidebar from '../messageBoard/components/MessageSidebar'  
import Avatar from '../auth/avatar/Avatar';
import './MainSidebar.css';
const useStyles = makeStyles({
  list: {
    width: 400,
    height: '100vh',
    display: 'flex',
    flexDirection: 'row',
  },
  fullList: {
    width: 'auto',
  },
  link: {
    textDecoration: 'none',
    color: '#333',
  },
  columnDiv: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '350px',
    overflow: 'hidden',
  },
  iconsDiv: {
    width: '70px',
    height: '100vh',
  },
});

export default function TemporaryDrawer({ user, userLogout }) {
  const classes = useStyles();
  const [comp, setComp] = React.useState('')

  return (
    <div className={(classes.list, 'mu-sidebar')}>
      <List className={classes.iconsDiv}>
        <Link onClick={() => setComp('dashboard') } className={classes.link} to="/dashboard">
          <ListItem button>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
          </ListItem>
        </Link>
        <Link onClick={() => setComp('message-board') } className={classes.link} to="/message-board">
          <ListItem button>
            <ListItemIcon>
              <MessageIcon />
            </ListItemIcon>
          </ListItem>
        </Link>
        <Link onClick={() => setComp('class') } className={classes.link} to="/class">
          <ListItem button>
            <ListItemIcon>
              <SchoolIcon />
            </ListItemIcon>
          </ListItem>
        </Link>
        <Link onClick={() => setComp('settings') } className={classes.link} to="/settings">
          <ListItem button>
            <ListItemIcon>
              <LockIcon />
            </ListItemIcon>
          </ListItem>
        </Link>
        <Link onClick={() => setComp('settings') } className={classes.link} to="/settings">
          <ListItem button>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
          </ListItem>
        </Link>

        <Divider />
        <ListItem
          button
          className={classes.link}
          onClick={() => {
            userLogout();
          }}
        >
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
        </ListItem>
        <Link className={classes.link} to="https://github.com/alforsii">
          <ListItem button>
            <ListItemIcon>
              <GitHubIcon />
            </ListItemIcon>
          </ListItem>
        </Link>
      </List>
      <Divider orientation="vertical" flexItem />
      <div className="dynamic-sidebars">
        <Switch>
          <Route exact path='/class/:classId' component={ClassSideNavbar}/>
        </Switch>

        { comp === 'message-board' && <MessageSidebar/>}
      </div>
    </div>
  );
}
