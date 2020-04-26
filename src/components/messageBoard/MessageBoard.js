import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SendIcon from '@material-ui/icons/Send';
import {Button} from '@material-ui/core'
import Avatar from '../auth/avatar/Avatar'
// import socketIOClient from "socket.io-client";
import moment from 'moment';

import { AUTH_MESSAGES } from '../../services/messagesAuth/MessagesAuth';
import BoardNavbar from './components/BoardNavbar';
import MessageHistory from './components/MessageHistory'
import SideNavbar from './components/SideNavbar'
import BoardBody from './components/BoardBody'
import Emojis from './components/Emojis'
import './MessageBoard.css';

// const socket = socketIOClient('http://127.0.0.1:3001');
export class MessageBoard extends Component {
  timer = 0;
  //=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  state = {
    user: this.props.context.state.user,
    users: this.props.context.state.users,
    // receiver: undefined,
    receiver: this.props.context.state.messageBoard.receiver,
    message: '',
    errMessage: '',
    messages: false,
    newMessages: this.props.context.state.messageBoard.newMessages,
    readMessage: false,
    scroll: this.props.context.state.messageBoard.scroll,
    userBoards: undefined,
    receivers: undefined,
    isLoading: this.props.context.state.messageBoard.isLoading,
    status: false,
    file: null,
    tempImagesURL: []
  };

 
    //=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    //1. Component did mount - then getUserBoards and updateMessageBoard
  //=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  componentDidMount = () => {
    //check for new updates
    this.timer = setInterval(() => {
      this.getUserBoards();
      this.updateMessageBoard();

      if(this.state.scroll){
        this.scrollMessagesDown();
        this.props.context.updateState(prevState => ({
        messageBoard: {
          ...prevState.messageBoard,
          scroll: false
        }
      }))
      }
      if(!this.state.receiver) this.setState({newMessages: null})
    }, 2000);
  };

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
   this.props.context.updateState(prevState => ({
    messageBoard: {
      ...prevState.messageBoard,
      receiver,
      scroll: true
    }
  }))
  // //  this.updateStatus(receiver)
  // this.scrollMessagesDown();
 };

  //=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  //Updates user status (online? true:false) and  messages status/read
  //=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- 
  updateStatus = async (theUser) => {
    await AUTH_MESSAGES.updateStatus({otherUser: {_id: theUser._id}})
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
    try {
      await AUTH_MESSAGES.addNewMessage({
        otherUser: {
          _id: this.state.receiver._id,
          username: this.state.receiver.username,
        },
        message: this.state.message,
      });
      this.setState(prevState => ({
         message: '',
      }));
      this.props.context.updateState(prevState => ({
        messageBoard: {
          ...prevState.messageBoard,
          scroll: true
        }
      }))
    } catch (err) {
      this.displayError(err)
    }
  };

   //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  handleFileChange = e => {
    const { type, files} = e.target;
  if(type === 'file'){
      var fReader = new FileReader()
      fReader.readAsDataURL(files[0])
      fReader.onloadend = (e) => {
        this.setState(prevState => ({
          file: files[0],
          tempImagesURL: [...prevState.tempImagesURL, `${e.target.result}`]
        }))
      }
    }
  }
  //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  clearTempUrl = e => {}
   //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  displayError = err => {
    if (err.response && err.response.data) {
      this.setState(prevState => ({
        ...prevState,
        errMessage: err.response.data.message,
      }));
      setTimeout(() => {
        this.setState({
          errMessage: ''
        })
      },2000)
    } else {
      console.log(err);
    }
  };
  
   //=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  //Get User boards to get messages
  //=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  getUserBoards = async () => {
    const res = await AUTH_MESSAGES.getUserBoards();
    this.setState({ userBoards: res.data, isLoading: false });
  };

  //=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  //Updates message history list (left side with user image and las message and time)
  //=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  updateMessageBoard = async () => {
    if (this.state.receiver) {
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
    const chatMessages = document.querySelector('.message-board-body');
    if (chatMessages) {
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }
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

   openEmojis = (e) => {
    document.getElementById('emojis').style.display = 'block'
}

  //=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  //Last on component unmount - when page closed clear/stop  this.timer === setInterval
  //=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  componentWillUnmount() {
    console.log('========  component UNMOUNTED! ========');
    clearInterval(this.timer); // !!!
  }

  //=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  //=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  render() {
    const {
      newMessages,
      users,
      userBoards,
      message,
      errMessage,
      receiver,
      isLoading
    } = this.state;

    return (
      <div>
        <div className="main-message-board">
          <div className="nav-sidebar">
            <SideNavbar/>
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
                      to={{
                        pathname: `/message-board/${_id}`,
                        state: {
                           user
                        }
                      }}
                      onClick={() => this.switchUser(user)}
                    >
                      <div className="user-image-div">
                        {/* <img className="user-image" src={path} alt={username} /> */}
                        <Avatar src={path} alt={username} size='medium'/>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
            {/* messaging history with user image*/}
            <div className="messages-history">
              { userBoards 
              && <MessageHistory state={this.state} 
              getReceivers={this.getReceivers(userBoards)}
              switchUser={user => this.switchUser(user)}
              />}
            </div>
          </div>

          <div id='message-board' className="message-board">
            <div className="message-board-nav">
            {this.state.receiver && <BoardNavbar message={errMessage} user={this.state.receiver}/>}
              <div>
                <span id="search-icon2">
                  <i className="fas fa-search"></i>
                </span>
                <span>
                  <i className="fas fa-user-plus"></i>
                </span>
                {/* <span><i className="fas fa-ellipsis-v"></i></span> */}
                <span>
                  <i className="fas fa-ellipsis-h"></i>
                </span>
              </div>
            </div>

            <div id="message-board-body" className="message-board-body">
              <div id="messageBoardUsers">
                {/* all messages goes here */}
                  { receiver && <BoardBody isLoading={isLoading} newMessages={newMessages} state={this.state}/>}
              </div>
            </div>

            <form
              onSubmit={this.handleMessageSubmit}
              id="message-form"
              className="message-board-footer"
            >
              <textarea
                id="message-input"
                autoComplete='off'
                onChange={this.handleMessage}
                value={message}
                name="message"
                type="textarea"
                placeholder='Type your message...'
              />

              <span  className="icons message-icon">
                <i onClick={this.openEmojis}><i className="fas fa-smile"></i></i>
                <div id='emojis-container' className='emojis-container'>
                  <Emojis />
                </div>
              </span>
              <input style={{display:'none'}} type='file' 
              onChange={this.handleFileChange}
              ref={fileInput=> this.fileInput = fileInput}/>
              <span className="icons message-icon" onClick={()=> this.fileInput.click()}>
                <i className="fas fa-paperclip"></i>
              </span>
              <Button style={{color: '#0794f3'}} type='submit' >
                <SendIcon />
              </Button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default MessageBoard;
