import React from 'react';
import { Link } from 'react-router-dom'
import Avatar from '../../auth/avatar/Avatar';

export default function BoardNavbar(props) {
  const { message,user} = props.location.state
  return (
    <div>
      <div className="user-div">
        <div className="user2">
          <Link to="/message-board">
            <div className="user-image-div large">
              <Avatar src={user?.path} alt={user?.firstName} size={'medium'}/>
            </div>
          </Link>
          <div>
            <h5 className="username">
              {user?.firstName} {user?.lastName}
            </h5>
          {message? 
            <p style={{color:'red'}}>{message}</p>
            :<p>Some message will be here...</p>}
          </div>
        </div>
      </div>
    </div>
  );

}
