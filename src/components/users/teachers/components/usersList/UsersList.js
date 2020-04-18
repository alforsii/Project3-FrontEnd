import React from 'react'
import { Link } from 'react-router-dom';

export default function UsersList({users, updateState}) {
    return (
        <React.Fragment>
            <div className="users-div t-users">
              {users?.map(user => {
                const { _id, path, username } = user;
                return (
                  <div key={_id} className="user-user-list">
                    <div className="user-image-div">
                      <img
                        className="user-image"
                        src={path}
                        alt={username}
                      />
                    </div>
                    <div className="">
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
                    </div>
                  </div>
                );
              })}
            </div>
        </React.Fragment>
    )
}
