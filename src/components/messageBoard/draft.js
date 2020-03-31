<div
                            key={msg._id}
                            className="receiver each-user-msg-div"
                          >
                            <div className="chat-message">
                              <div className="parent-msg-div">
                                <span className="hideBtn">
                                  <i className="fas fa-eye-slash"></i>
                                </span>
                                <div className="msg-div">
                                  <span>{msg.message} </span>
                                </div>
                              </div>
                              <div className="user-in-chat">
                                <div>
                                  <Link to="/profile/user-details">
                                    {/* {msg.receiverID.firstName+': '} */}
                                    <img
                                      className="user-image"
                                      src={msg.receiverID.path}
                                      alt={msg.receiverID.firstName}
                                    />
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>

<div
key={msg._id}
className="current-user each-user-msg-div"
>
<div className="chat-message">
  <div className="user-in-chat">
    <div>
      <Link to="/profile/user-details"> 
      {/* {'You: '} */}
        <img
          className="user-image"
          src={msg.author.path}
          alt={msg.author.firstName}
        />
      </Link>
    </div>
  </div>
  <div className="parent-msg-div">
    <div className="msg-div">
      <span>{msg.message}</span>
    </div>
    <span className="deleteMsgBtn">
      <i className="far fa-trash-alt"></i>
    </span>
  </div>
</div>
</div>

<Link
to={`/message-board/${_id}`}
onClick={() => this.switchUser(user)}
>
<div className="user-div">
  <div className="user user1">
    <div className="user-image-div">
      <img
        className="user-image"
        src={path}
        alt={firstName}
      />
    </div>
    <div>
      <h5 className="username">
        {firstName} {lastName}
      </h5>
      {/* <p>{lastMessage.author._id.toString() === this.state.user._id.toString() ? <span className='message-you'> {'You: '} </span> : <span className='message-other'> {lastMessage.author.firstName + ': '} </span>}  */}
      <p>
        {lastMessage.author._id.toString() ===
        this.state.user._id.toString() ? (
          <span className="message-you">
            {' '}
            {'You: '}{' '}
          </span>
        ) : (
          <span className="message-other"> </span>
        )}
        {lastMessage.message.length > 25
          ? lastMessage.message.slice(0, 25) + '...'
          : lastMessage.message}
      </p>
    </div>
    <span id="msg-created-time"> {createdAt}</span>
  </div>
</div>
</Link>

<Link
                            to={`/message-board/${theUserId}`}
                            onClick={() => this.switchUser(theUser)}
                          >
                            <div className="user-div">
                              <div className="user user1">
                                <div className="user-image-div">
                                  <img
                                    className="user-image"
                                    src={theUserPath}
                                    alt={theUserName}
                                  />
                                </div>
                                <div>
                                  <h5 className="username">
                                    {theUserName} {theUserLastName}
                                  </h5>
                                  <p>
                                    {lastMessage.author._id.toString() ===
                                    this.state.user._id.toString() ? (
                                      <span className="message-you">
                                        {' '}
                                        {'You: '}{' '}
                                      </span>
                                    ) : (
                                      <span className="message-other">
                                        {' '}
                                        {lastMessage.author.firstName +
                                          ': '}{' '}
                                      </span>
                                    )}
                                    {lastMessage.message.length > 25
                                      ? lastMessage.message.slice(0, 25) + '...'
                                      : lastMessage.message}
                                  </p>
                                </div>
                                <span id="msg-created-time"> {createdAt}</span>
                              </div>
                            </div>
                          </Link>