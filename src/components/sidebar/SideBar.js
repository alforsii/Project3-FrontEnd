// import React from 'react';
// import { Link } from 'react-router-dom'
// import clsx from 'clsx';
// import { makeStyles } from '@material-ui/core/styles';
// import Drawer from '@material-ui/core/Drawer';
// import List from '@material-ui/core/List';
// import Divider from '@material-ui/core/Divider';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemText from '@material-ui/core/ListItemText';
// import InboxIcon from '@material-ui/icons/MoveToInbox';
// import MailIcon from '@material-ui/icons/Mail';
// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';
// import SwitchModeButton from './switchModeButton/SwitchButton'
// import Avatar from '../auth/avatar/Avatar'
// const useStyles = makeStyles({
//   list: {
//     width: 250,
//   },
//   fullList: {
//     width: 'auto',
//   },
// });

// export default function TemporaryDrawer({user, userLogout}) {
//   const classes = useStyles();
//   const [state, setState] = React.useState({
//     top: false,
//     left: false,
//     bottom: false,
//     right: false,
//   });

//   const toggleDrawer = (anchor, open) => (event) => {
//     if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
//       return;
//     }

//     setState({ ...state, [anchor]: open });
//   };

//   const list = (anchor) => (
//     <div
//       className={clsx(classes.list, {
//         [classes.fullList]: anchor === 'top' || anchor === 'bottom',
//       })}
//       role="presentation"
      
//     >
//       <List>
//           <ListItem button >
//             <ListItemIcon> 
//                 <Avatar  src={user?.path} alt={user?.firstName} size='large'/>
//             </ListItemIcon>
//             <ListItemText primary={`${user?.firstName} ${user?.lastName}`} />
//           </ListItem>
//       </List>
//       <List>
//           <ListItem button >
//             <ListItemIcon> 
//                 <SwitchModeButton/>
//             </ListItemIcon>
//             <ListItemText primary={`Switch mode`} />
//           </ListItem>
//       </List>
//       <Divider />
//       <List>
//         {[['/home','Dashboard'], ['/message-board','Messages'], ['/class','Classrooms'], ['/settings/update-profile','Settings'], ['/settings/update-profile','Account']].map((text, index) => (
//             <Link to={text[0]} key={text[0]}>
//           <ListItem button 
//           onClick={toggleDrawer(anchor, false)}
//           onKeyDown={toggleDrawer(anchor, false)}>
//             <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
//             <ListItemText primary={text[1]} />
//           </ListItem>
//             </Link>
//         ))}
//       </List>
//       <Divider />
//       <List>
//         {[['/logout','Logout']].map((text, index) => (
//           <ListItem button key={text[0]}
//           onClick={() => {
//             toggleDrawer(anchor, false)
//             userLogout()
//           }}
//           onKeyDown={toggleDrawer(anchor, false)}>
//             <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
//             <ListItemText primary={text[1]} />
//           </ListItem>
//         ))}
//       </List>
//     </div>
//   );

//   return (
//     <div>
//         <React.Fragment key={'left'}>
//           <IconButton  className='nav-items' onClick={toggleDrawer('left', true)}>
//             <MenuIcon />     
//          </IconButton>
//           <Drawer anchor={'left'} open={state['left']} onClose={toggleDrawer('left', false)}>
//             {list('left')}
//           </Drawer>
//         </React.Fragment>
//     </div>
//   );
// }
