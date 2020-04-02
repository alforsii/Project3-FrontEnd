import React from 'react';
import { Link } from 'react-router-dom'

export default function UserConversation(props) {
   const { match:{params: {id}}, users } = props
   const user = users?.filter(user => user._id.toString() === id)[0]
   //note! - here _doc is when u make from DB copy of collections it returns diff array of users where each user will be inside _doc prop
  return (
    <div>
      <div className="user-div">
        <div className="user">
          <Link to="/message-board">
            <div className="user-image-div">
              <img className="user-image" src={user.path} alt="" />
            </div>
          </Link>
          <div>
            <h5 className="username">
              {user.firstName} {user.lastName}
            </h5>
            <p>Some message will be here...</p>
          </div>
        </div>
      </div>
    </div>
  );
}
