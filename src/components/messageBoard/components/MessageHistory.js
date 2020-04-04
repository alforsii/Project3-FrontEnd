import React from 'react'
import MessagedUser from './MessagedUser'

export default function MessageHistory({state, getReceivers, switchUser}) {
    return (
        <div>
              {getReceivers?.map((user, i) => {
                    const {
                      _id,
                      lastMessage,
                      createdAt,
                    } = user;

                    const yourId = state.user._id;
                    const theUser =
                      lastMessage.receiverID._id.toString() !==
                      yourId.toString()
                        ? lastMessage.receiverID
                        : lastMessage.author._id.toString() !==
                          yourId.toString()
                        ? lastMessage.author
                        : '';
                    return (
                      <div key={_id + i}>
                        {_id.toString() === yourId.toString() ? (
                          <MessagedUser
                            switchUser={switchUser}
                            user={theUser}
                            lastMessage={lastMessage}
                            state={state}
                            createdAt={createdAt}
                            currUser={state.user}
                          />
                        ) : (
                          <MessagedUser
                            switchUser={switchUser}
                            user={user}
                            lastMessage={lastMessage}
                            state={state}
                            createdAt={createdAt}
                            currUser={state.user}
                          />
                        )}
                      </div>
                    );
                  })
                  }
        </div>
    )
}
