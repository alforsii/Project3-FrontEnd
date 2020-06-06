import React from 'react';
import { Link } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import ListItem from '@material-ui/core/ListItem';

import Avatar from '../../../auth/avatar/Avatar';
import MessageHistory from './MessageHistory';
import { MessageContext } from '../../../../myContext/MessageProvider';
import './MessageSidebar.css';

export default function MessageSidebar() {
  return (
    <MessageContext.Consumer>
      {(msgContext) => {
        const { users } = msgContext.state;
        const { message, userBoards } = msgContext.messageState;
        const { getReceivers, switchUser } = msgContext;

        return (
          <div>
            <div className="users-list">
              <div className="users-div">
                {users?.map((user) => {
                  const { _id, path, username } = user;
                  return (
                    <div key={_id} className="user-user-list">
                      <Link
                        to={{
                          pathname: `/message-board/${_id}`,
                          state: {
                            user,
                            message,
                          },
                        }}
                        onClick={() => switchUser(user)}
                      >
                        <div className="user-image-div">
                          <Avatar src={path} alt={username} size="large" />
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>

              <div className="messages-history">
                <h2 style={{ textAlign: 'center' }}>
                  <ListItem>
                    <MailOutlineIcon />
                  </ListItem>
                  Messages{' '}
                </h2>
                <Divider />
                {userBoards && (
                  <MessageHistory
                    state={msgContext.state}
                    getReceivers={getReceivers(userBoards)}
                    switchUser={(user) => switchUser(user)}
                  />
                )}
              </div>
            </div>
          </div>
        );
      }}
    </MessageContext.Consumer>
  );
}
