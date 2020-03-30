import React, { Component } from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import BoardNavbar from './BoardNavbar';
import Loader from '../loader/Loader'
import moment from 'moment';
import './MessageBoard.css';
// import axios from 'axios'
import { AUTH_MESSAGES } from '../../services/messagesAuth/MessagesAuth';

export class MessageBoard extends Component {
  timer = 0;
  //=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  state = {
    user: this.props.user,
    users: this.props.users,
    receiver: undefined,
    message: '',
    messages: false,
    newMessages: false,
    userBoards: undefined,
    receivers: undefined,
    isLoading: false,
    isNewBoard: false
  };

  //=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  //Handle Submit - Send message
  //=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  handleMessageSubmit = async e => {
    e.preventDefault();
    //  await axios.post(`/api/messages/add-new-message`, {
    //   otherUser: this.state.receiver,
    //   message: this.state.message
    // })
    this.setState({ message: '' });
    console.log("this.state.receiver", this.state.receiver)
    await AUTH_MESSAGES.addNewMessage({
      otherUser: {
        _id: this.state.receiver._id,
        username: this.state.receiver.username
      },
      message: this.state.message,
    });
    this.getUserBoards() // to update message history list
    this.updateMessageBoard()
    this.setState({ isNewBoard: true })
  };

  //=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  //Handle input change
  //=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  handleMessage = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  //=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  //Update message history list (left side with user image and las message and time)
  //=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  updateMessageBoard = async (delay) => {
    if (this.state.receiver) {
      // const res = await axios.post('/api/messages/board', {id: this.state.receiver})
      const res = await AUTH_MESSAGES.updateUserBoard({
        id: this.state.receiver._id,
      });
      const { messages, newMessages} = res.data
      setTimeout(() => {
        this.setState({ messages, newMessages });
      }, 300);
    }
  };

 //=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  //Scroll down messages on load or when new message
  //=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  scrollMessagesDown = () => {
    setTimeout(() => {
      const chatMessages = document.querySelector('.message-board-body');
      if (chatMessages) {
        chatMessages.scrollTop = chatMessages.scrollHeight;
      }
    }, 100);
  }
  UNSAFE_componentWillUpdate(nextProps, nextState) {
    if (nextState.isNewBoard === true && this.state.isNewBoard === false) {
      setTimeout(()=> {
        this.scrollMessagesDown()
      this.setState({ isNewBoard: false })
      },500)
    }
  }
  //=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  //Switch Chat board user
  //=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  switchUser = receiver => {
    this.setState({ 
      receiver, isLoading: true , 
      messages: false, newMessages: false, isNewBoard: true 
    });
    setTimeout(()=> {
      this.scrollMessagesDown()
    },1500 )
    // this.updateMessageBoard();
  };
  //=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  //Get User boards to get messages
  //=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  getUserBoards = async () => {
    const res = await AUTH_MESSAGES.getMessages();
    // const res = await axios.get(`/api/messages`)
    setTimeout(() => {
      this.setState({ userBoards: res.data, isLoading: false });
    }, 300);
  };

  //=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  //Get Users, that who had messaging history with current user, for display
  //=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  getReceivers = userBoards => {
    return userBoards
      .map(board => {
        const receiverObj = board.newMessages[0].receiverID;
        const createdAt = board.newMessages[board.newMessages.length - 1].createdAt;
        receiverObj.createdAt = moment(createdAt).calendar();
        receiverObj.lastMessage = board.newMessages[board.newMessages.length - 1];
        return receiverObj;
      })
      .sort((a, b) => (b.createdAt > a.createdAt ? -1 : 1));
  };

  //=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  //=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  componentDidMount = () => {
    this.setState({ isLoading: true });
    this.timer = setInterval(() => {
      this.getUserBoards();
      this.updateMessageBoard();
    }, 3000);
  };

  //=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  //=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  componentWillUnmount() {
    console.log('========  component UNMOUNTED! ========');
    clearInterval(this.timer); // !!!
  }

  //=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  //=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  // showLoading() {
  //   document.querySelector('.loader').classList.add('show');
  //  }
  //   removeLoading() {
  //   document.querySelector('.loader').classList.remove('show');
  //  }

  render() {
    const { messages, newMessages, users, userBoards, message, isLoading } = this.state;

    return (
      <div>
        <div className="main-message-board">
          <div className="nav-sidebar">
            <div className="sidebar-icons">
              <Link to="/" className="">
                <span>
                  <i className="fas fa-feather-alt"></i>
                </span>
              </Link>
              <Link to="/" className="">
                <span>
                  <i className="fas fa-dove"></i>
                </span>
              </Link>
              <Link to="/" className="">
                <span>
                  <i className="fas fa-edit"></i>
                </span>
              </Link>
              <Link to="/" className="">
                <span>
                  <i className="fas fa-user"></i>
                </span>
              </Link>
              <Link to="/" className="">
                <span>
                  <i className="fab fa-dropbox"></i>
                </span>
              </Link>
              <Link to="/message-board" className="">
                <span className="fas fa-comment-dots"></span>
              </Link>
              <Link to="/" className="">
                <span>
                  <i className="fas fa-award"></i>
                </span>
              </Link>
              <Link to="/" className="">
                <span>
                  <i className="fas fa-crop"></i>
                </span>
              </Link>
              <Link to="/" className="">
                <span>
                  <i className="fas fa-cog"></i>
                </span>
              </Link>
            </div>
          </div>

          <div className="users-list">
            <div id="search-div">
              <input
                type="search"
                name="search"
                id="search-user"
                placeholder="Search user..."
              />
              <span id="search-icon">
                <i className="fas fa-search"></i>
              </span>
            </div>

            {/* users list */}
            <div className="users-div">
              {users.map(user => {
                const { _id, path, username } = user;
                return (
                  <div key={_id} className="user-user-list">
                    <Link
                      to={`/message-board/${_id}`}
                      onClick={() => this.switchUser(user)}
                    >
                      <div className="user-image-div">
                        <img className="user-image" src={path} alt={username} />
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
            {/* messaging history with user image*/}
            <div className="messages-history">
              {userBoards
                ? this.getReceivers(userBoards).map(user => {
                    // console.log("receiver-> user", user)
                    const {
                      _id,
                      path,
                      username,
                      firstName,
                      lastName,
                      lastMessage,
                      createdAt,
                    } = user;
                    const yourId = this.state.user._id;
                    // const users = [lastMessage.receiverID._id, lastMessage.author._id]
                    const theUser =
                      lastMessage.receiverID._id.toString() !==
                      yourId.toString()
                        ? lastMessage.receiverID
                        : lastMessage.author._id.toString() !==
                          yourId.toString()
                        ? lastMessage.author
                        : '';
                    const theUserId = theUser._id;
                    const theUserPath = theUser.path;
                    const theUserName = theUser.firstName;
                    const theUserLastName = theUser.lastName;

                    // const lastMessage = messages[messages.length -1]
                    return (
                      <div key={_id}>
                        {_id.toString() === yourId.toString() ? (
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
                        ) : (
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
                                    alt={username}
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
                        )}
                      </div>
                    );
                  })
                : ''}
            </div>
          </div>

          <div id='"message-board' className="message-board">
            <div className="message-board-nav">
              <Switch>
                <Route
                  exact
                  strict
                  path="/message-board/:id"
                  render={props => <BoardNavbar {...props} users={users} />}
                />
              </Switch>
              <div>
                <span id="search-icon2">
                  <i className="fas fa-search"></i>
                </span>
                <span>
                  <i className="fas fa-user-plus"></i>
                </span>
                {/* <span><i class="fas fa-ellipsis-v"></i></span> */}
                <span>
                  <i className="fas fa-ellipsis-h"></i>
                </span>
              </div>
            </div>

            <div id="message-board-body" className="message-board-body">
              <div id="messageBoardUsers">
                {/* all messages goes here */}
                <div className="conversation-div">
                  { newMessages? (
                      newMessages.map(msg => {
                        return msg.author.username !== msg.sender ? (
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
                        ) : (
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
                        );
                      })

                  ) : isLoading? <Loader/>
                  : '' }
                </div>
              </div>
            </div>

            <form
              onSubmit={this.handleMessageSubmit}
              id="message-form"
              className="message-board-footer"
            >
              <input
                id="message-input"
                onChange={this.handleMessage}
                value={message}
                name="message"
                type="text"
                placeholder="Type your message..."
              />

              <span className="icons message-icon">
                <i className="fas fa-smile"></i>
              </span>
              <span className="icons message-icon">
                <i className="fas fa-paperclip"></i>
              </span>
              <span className="icons message-icon" role="button" type="submit">
                <i className="fab fa-telegram"></i>
              </span>
              {/* <span className="icons telegram"><i className="fas fa-microphone"></i></span>
                <span className="icons telegram"><i className="fas fa-microphone-slash"></i></span> */}
              <button className="icons">
                <i className="fab fa-telegram"></i>Send
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default MessageBoard;
