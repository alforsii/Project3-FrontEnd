import React from 'react'
import { Link } from 'react-router-dom';

export default function UsersList({users, updateState}) {
    return (
        <React.Fragment>
            <div className="users-div t-users">
              {users?.map(user => {
                const { _id, path, username } = user;
                return (
                  <div key={_id} className="dropdown user-user-list">
                    <div className="user-image-div">
                      <img
                        className="user-image dropbtn"
                        src={path}
                        alt={username}
                      />
                    </div>
                    <div className="dropdown-content">
                      <Link
                        to={`/message-board/${_id}`}
                        onClick={() =>
                          updateState(prevState => ({
                            messageBoard: {
                              ...prevState.messageBoard,
                              receiver: user,
                            },
                          }))
                        }
                      >
                        Send message
                      </Link>
                      <Link to="/create-class">Add to class</Link>
                    </div>
                  </div>
                );
              })}
            </div>
        </React.Fragment>
    )
}
