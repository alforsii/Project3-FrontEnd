import React from 'react';
import Message from './Message';
import MessageTemp from './MessageTemp';
import Loader from './loader/Loader';

export default function BoardBody({ newMessages, isLoading, state }) {
  return (
    <div>
      <div className="conversation-div">
        {newMessages ? (
          newMessages.map((msg) => {
            return msg.author.username !== msg.sender ? (
              <Message
                key={msg._id}
                receiver={msg.author}
                currUser={state.user}
                msg={msg}
                user={msg.receiverID}
                path={msg.receiverID.path}
                firstName={msg.receiverID.firstName}
                lastName={msg.receiverID.lastName}
              />
            ) : (
              <Message
                key={msg._id}
                receiver={msg.receiverID}
                currUser={state.user}
                msg={msg}
                user={msg.author}
                path={msg.author.path}
                firstName={msg.author.firstName}
                lastName={msg.author.lastName}
              />
            );
          })
        ) : isLoading ? (
          <Loader />
        ) : (
          <MessageTemp />
        )}
      </div>
    </div>
  );
}
