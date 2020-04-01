import React, { Component } from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import socketIOClient from "socket.io-client";
import moment from 'moment';
// import axios from 'axios'

import { AUTH_MESSAGES } from '../../services/messagesAuth/MessagesAuth';
import { AuthContext} from '../../myContext/AuthProvider'
import BoardNavbar from './components/BoardNavbar';
import MessagedUser from './components/MessagedUser';
import Message from './components/Message';
import Loader from './components/loader/Loader';
import './MessageBoard.css';

const socket = socketIOClient('http://127.0.0.1:3001');
export class MessageBoard extends Component {
  timer = 0;
  //=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  state = {
    user: this.context.state.user,
    users: this.context.state.users,
    receiver: undefined,
    message: '',
    messages: false,
    newMessages: false,
    readMessage: false,
    userBoards: undefined,
    receivers: undefined,
    isLoading: false,
    status: false
  };

 
    //=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    //1. Component did mount - then getUserBoards and updateMessageBoard
  //=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  componentDidMount = () => {
    if (!this.context.state.loggedIn) {
      return this.props.history.push('/');
    }
    this.setState({ isLoading: true });

    socket.emit('greeting', {
      user: this.state.user.firstName
    })

    socket.on('output', data => {
      if(data){
        this.setState(prevState => ({
          newMessages: data
        }))
      }
    })
    socket.on('message', message => {
    console.log("message", message)
    })
    socket.on('status', online => {
    console.log("online", online)
    this.setState({ status: online})
    })

    //check for new updates
    this.timer = setInterval(() => {
      this.getUserBoards();
      this.updateMessageBoard();
    }, 3000);
  };
  //==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
checkForNewMessage = () => {


}
   //=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  //2.Switch Chat board user - get user Chat board  if clicked
  //=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

  switchUser = receiver => {
    this.setState({
     receiver,
     isLoading: true,
     messages: false,
     newMessages: false,
     readMessage: true,
   });
   socket.emit("get-user-messages", [this.state.user._id, receiver._id ]);
  //  this.updateStatus(receiver)
   setTimeout(() => {
     this.scrollMessagesDown();
     //here will call to update new msg unread/read status
   }, 2000);
 };

  //=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  //Updates user status (online? true:false) and  messages status/read
  //=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- 
  updateStatus = (theUser) => {
    console.log(" theUser", theUser)
    socket.emit('update-status', [
       this.state.user._id,
      theUser._id,
     ])
}

 //=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  //3.Handle input change - if typing
  //=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  handleMessage = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  //=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  //4. Handle Submit - Send message if submitted
  //=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  handleMessageSubmit = async e => {
    e.preventDefault();
    //  await axios.post(`/api/messages/add-new-message`, {
    //   otherUser: this.state.receiver,
    //   message: this.state.message
    // })
    this.setState({ message: '' });
    await AUTH_MESSAGES.addNewMessage({
      otherUser: {
        _id: this.state.receiver._id,
        username: this.state.receiver.username,
      },
      message: this.state.message,
    });
    this.scrollMessagesDown()
  };

  
   //=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  //Get User boards to get messages
  //=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  getUserBoards = async () => {
    const res = await AUTH_MESSAGES.getUserBoards();
    // const res = await axios.get(`/api/messages/boards`)
    this.setState({ userBoards: res.data, isLoading: false });
  };

  //=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  //Updates message history list (left side with user image and las message and time)
  //=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  updateMessageBoard = async () => {
    if (this.state.receiver) {
      // const res = await axios.post('/api/messages/board', {id: this.state.receiver})
      const res = await AUTH_MESSAGES.updateUserBoard({
        id: this.state.receiver._id,
      });
      const { messages, newMessages } = res.data;
      this.setState({ messages, newMessages });
    }
  };

  //=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  //Scrolls down messages on load or when new message
  //=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  scrollMessagesDown = () => {
    setTimeout(() => {
      const chatMessages = document.querySelector('.message-board-body');
      if (chatMessages) {
        chatMessages.scrollTop = chatMessages.scrollHeight;
      }
      
    }, 2000);
  };

  //=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  //Get Users, that who had messaging history with current user, for display
  //=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  getReceivers = userBoards => {
    return userBoards
      .map(board => {
        const receiverObj = board.newMessages[0].receiverID;
        const createdAt =
          board.newMessages[board.newMessages.length - 1].createdAt;
        receiverObj.createdAt = moment(createdAt).calendar();
        receiverObj.lastMessage =
          board.newMessages[board.newMessages.length - 1];
        return receiverObj;
      })
      .sort((a, b) => (b.createdAt > a.createdAt ? -1 : 1));
  };

  //=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  //Last on component unmount - when page closed clear/stop  this.timer === setInterval
  //=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  componentWillUnmount() {
    console.log('========  component UNMOUNTED! ========');
    clearInterval(this.timer); // !!!
    socket.off("get-user-messages");
    socket.off("output");
  }

  //=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  //=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  render() {
    const {
      // eslint-disable-next-line
      messages,
      newMessages,
      users,
      userBoards,
      message,
      isLoading,
      status
    } = this.state;

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
                    const {
                      _id,
                      lastMessage,
                      createdAt,
                    } = user;

                    const yourId = this.state.user._id;
                    const theUser =
                      lastMessage.receiverID._id.toString() !==
                      yourId.toString()
                        ? lastMessage.receiverID
                        : lastMessage.author._id.toString() !==
                          yourId.toString()
                        ? lastMessage.author
                        : '';
                    return (
                      <div key={_id}>
                        {_id.toString() === yourId.toString() ? (
                          <MessagedUser
                            switchUser={user => this.switchUser(user)}
                            user={theUser}
                            lastMessage={lastMessage}
                            state={this.state}
                            createdAt={createdAt}
                            status={status}
                            currUser={this.state.user}
                          />
                        ) : (
                          <MessagedUser
                            switchUser={user => this.switchUser(user)}
                            user={user}
                            lastMessage={lastMessage}
                            state={this.state}
                            createdAt={createdAt}
                            status={status}
                            currUser={this.state.user}
                          />
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
                  {newMessages ? (
                    newMessages.map(msg => {
                      return msg.author.username !== msg.sender ? (
                        <Message
                          key={msg._id}
                          currUser={this.state.user}
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
                          currUser={this.state.user}
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

MessageBoard.contextType = AuthContext

export default MessageBoard;
