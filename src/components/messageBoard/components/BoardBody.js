import React from 'react'
import Message from './Message'
import Loader from './loader/Loader'

export default function BoardBody({newMessages, isLoading, state}) {
    return (
        <div>
            <div className="conversation-div">
                  {newMessages ? (
                    newMessages.map(msg => {
                      return msg.author.username !== msg.sender ? (
                        <Message
                          key={msg._id}
                          currUser={state.user}
                          msg={msg}
                          user={msg.receiverID}
                          id={msg._id}
                          message={msg.message}
                          isNew={msg.new}
                          path={msg.receiverID.path}
                          firstName={msg.receiverID.firstName}
                          lastName={msg.receiverID.lastName}
                        />
                      ) : (
                        <Message
                          key={msg._id}
                          currUser={state.user}
                          user={msg.author}
                          id={msg._id}
                          message={msg.message}
                          path={msg.author.path}
                          firstName={msg.author.firstName}
                          lastName={msg.author.lastName}
                        />
                      );
                    })
                  ) : isLoading ? (
                    <Loader />
                  ) : (
                    ''
                  )}
                </div>
        </div>
    )
}