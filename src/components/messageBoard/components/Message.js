import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '../../auth/avatar/Avatar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '70ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

export default function Message({
  message,
  path,
  firstName,
  // lastName,
  // currUser,
  // user,
  msg,
  // receiver
}) {
  const classes = useStyles();

  return (
    <List className={classes.root}>

      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt={firstName} src={path} />
        </ListItemAvatar>
        <ListItemText
          primary={msg.createdAt}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                {/* to {receiver.firstName} */}
              </Typography>
                { " - " + message }
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />

    </List>
  );
}


// import React from 'react';
// import { Link } from 'react-router-dom';
// import './Message.css';

// // eslint-disable-next-line
// export default function Message({
//   message,
//   path,
//   firstName,
//   lastName,
//   currUser,
//   user,
// }) {
//   const isCurrentUser = currUser?._id.toString() === user?._id.toString();
//   // const myStyle = !isCurrentUser? {display: 'flex', flexDirection: 'row-reverse', justifyContent: 'flex-end', alignItems: 'flex-end'} : {}
//   // const myStyle2 = !isCurrentUser? {display: 'flex', flexDirection: 'row-reverse', justifyContent: 'flex-start', alignItems: 'center'} : {}
//   return (
//     <div
//       className={`${isCurrentUser ? 'current-user' : 'receiver'} each-user-msg-div`}
//     >
//       <div className="chat-message"  >
//         <div className="user-in-chat">
//             <Link to="/profile/user-details">
//               {isCurrentUser? 'You' : firstName}
//               {/* <img className="user-image" src={path} alt={firstName} />  */}
//             </Link>
//         </div>

//         <div className="parent-msg-div"  >
//             <div className="msg-div">
//                 <span>{message} </span>
//             </div>
//           <span className={`${isCurrentUser ? 'deleteMsgBtn' : 'hideBtn'} icon-dlt-hide`}>
//             <i
//               className={isCurrentUser ? 'far fa-trash-alt' : 'fas fa-eye-slash'}
//             ></i>
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// }
