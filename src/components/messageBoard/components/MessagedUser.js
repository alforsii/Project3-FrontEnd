import React from 'react';
import { Link } from 'react-router-dom';

export default function MessagedUser(props) {
    const { lastMessage, state, createdAt, switchUser,
      status } = props
    const { _id, path,firstName, lastName } = props.user
      const myStyle = status? {backgroundColor: 'green', width: '7px', height: '7px', borderRadius: '50%'} : {}
  return (
    <Link
      to={`/message-board/${_id}`}
      onClick={ () => switchUser(props.user) }
    >
      <div className="user-div">
        <div className="user user1">
          <div className="user-image-div">
            <img className="user-image" src={path} alt={firstName} />
          </div>
          <div>
            <h5 className="username">
              {firstName} {lastName}
            </h5>
            <p>
              {lastMessage.author._id.toString() ===
              state.user?._id.toString() ? (
                <span className="message-you"> {'You: '} </span>
              ) : (
                <span className="message-other">
                  {' '}
                  {lastMessage.author.firstName + ': '}{' '}
                </span>
              )}
              {lastMessage.message.length > 25
                ? lastMessage.message.slice(0, 25) + '...'
                : lastMessage.message}
            </p>
          </div>
          <span id="msg-created-time"> {createdAt}</span>
          <span id="user-online" style={myStyle} ></span>
        </div>
      </div>
    </Link>
  );
}
