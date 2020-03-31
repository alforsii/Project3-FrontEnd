import React from 'react';
import { Link } from 'react-router-dom';
import './Message.css'

// eslint-disable-next-line
export default function Message({  message, path, firstName, lastName, currUser, user }) {
    const isCurrentUser = currUser._id.toString() === user._id.toString()
    // const myStyle = !isCurrentUser? {display: 'flex', flexDirection: 'row-reverse', justifyContent: 'flex-end', alignItems: 'flex-end'} : {}
    // const myStyle2 = !isCurrentUser? {display: 'flex', flexDirection: 'row-reverse', justifyContent: 'flex-start', alignItems: 'center'} : {}
  return (
    <div
      className={`${isCurrentUser ? 'current-user' : 'receiver'} each-user-msg-div`}
    >
      <div className="chat-message"  >
        <div className="user-in-chat">
            <Link to="/profile/user-details">
              {isCurrentUser? 'You' : firstName} 
              {/* <img className="user-image" src={path} alt={firstName} />  */}
            </Link>
        </div>

        <div className="parent-msg-div"  >
            <div className="msg-div">
                <span>{message} </span>
            </div>
          <span className={`${isCurrentUser ? 'deleteMsgBtn' : 'hideBtn'} icon-dlt-hide`}>
            <i
              className={isCurrentUser ? 'far fa-trash-alt' : 'fas fa-eye-slash'}
            ></i>
          </span>
        </div>
      </div>
    </div>
  );
}
