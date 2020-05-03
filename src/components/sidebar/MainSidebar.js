import React from 'react';
import { Link } from 'react-router-dom'
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SwitchModeButton from './switchModeButton/SwitchButton'
import Avatar from '../auth/avatar/Avatar'
import './MainSidebar.css'
const useStyles = makeStyles({
  list: {
    width: 250,
    height: '100vh'
  },
  fullList: {
    width: 'auto',
  },
  link: {
    textDecoration: 'none',
    color: '#333'
  },
});


export default function TemporaryDrawer({user, userLogout}) {
  const classes = useStyles();

  return (
    <div className={classes.list, 'mu-sidebar'}>
         <List>
          <ListItem button >
            <ListItemIcon> 
                <Avatar  src={user?.path} alt={user?.firstName} size='large'/>
            </ListItemIcon>
            <ListItemText primary={`${user?.firstName} ${user?.lastName}`} />
          </ListItem>
      </List>
      <List>
          <ListItem button >
            <ListItemIcon> 
                <SwitchModeButton/>
            </ListItemIcon>
            <ListItemText primary={`Switch mode`} />
          </ListItem>
      </List>
      <Divider />
      <List>
        {[['/home','Dashboard'], ['/message-board','Messages'], ['/class','Classrooms'], ['/settings/update-profile','Settings'], ['/settings/update-profile','Account']].map((text, index) => (
            <Link className={classes.link} to={text[0]} key={text[0]}>
          <ListItem button >
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text[1]} />
          </ListItem>
            </Link>
        ))}
      </List>
      <Divider />
      <List>
        {[['/logout','Logout']].map((text, index) => (
          <ListItem button key={text[0]}
          onClick={() => {
            userLogout()
          }}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text[1]} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}



// import React, { Component } from 'react'
// import { Link } from 'react-router-dom';

// import SwitchModeButton from './switchModeButton/SwitchButton'
// import './SideBar.css'

// export class SideBar extends Component {

//     render() {
//         // const { firstName, lastName, path} = this.props.user
//         const { user, userLogout, loggedIn} = this.props
//         return (
//            <>
//                 {/* <div id='main-sidebar' className='main-sidebar'></div> */}
//                 <div id='side-bar2' className='side-bar'>
//                 {loggedIn && 
//                 <div className='user-sidebar'>
//                     {/* <img className='profile-pic' src={user?.path} alt={user?.firstName}/> */}
//                     <h4> {user?.firstName} {user?.lastName} </h4>
//                     <h4>Switch mode<SwitchModeButton/></h4>
//                     <hr/>
//                 </div>
//                 }
//                 <div className='sections'>
//                     <ul>
//                         { loggedIn?<>
//                         <Link to='/'><li><span className='fas fa-chalkboard-teacher'></span><span>Dashboard</span></li></Link> 
//                         <Link to='/'><li><span className='fas fa-users'></span><span>Teachers</span></li></Link>
//                         <Link to='/'><li><span className='fas fa-users'></span><span>Parents</span></li></Link>
//                         <Link to='/'><li><span className='fas fa-users'></span><span>Students</span></li></Link>
//                         <Link to='/'><li><span className='fas fa-lock'></span><span>Authentication</span></li></Link>
//                         <Link to='/'><li><span className='fas fa-user'></span><span>Account</span></li></Link>
//                         <Link to='/settings/update-profile'><li><span className='fas fa-cog'></span><span>Settings</span></li></Link>
//                         <Link to='/' onClick={userLogout}><li><span className='fas fa-sign-out-alt'></span><span>Logout</span></li></Link>
//                         </>:
//                         <>
//                         <Link to='/login'><li><span className='fas fa-sign-in-alt'></span><span>Login</span></li></Link>
//                         <Link to='/'><li><span className='fas fa-user-plus'></span><span>Signup</span></li></Link>
//                         </>
//                         }
//                     </ul>
//                 </div>
//             </div>
//            </>
            
//         )
//     }
// }



// export default SideBar
