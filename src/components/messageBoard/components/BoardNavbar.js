import React from 'react';
import { Link } from 'react-router-dom'

export default function BoardNavbar(props) {
  const { message,user} = props
  return (
    <div>
      <div className="user-div">
        <div className="user">
          <Link to="/message-board">
            <div className="user-image-div">
              <img className="user-image" src={user?.path} alt="" />
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
