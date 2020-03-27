import React, { Component } from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import UserConversation from './Nav';
import './MessageBoard.css';
import socketIOClient from "socket.io-client";
import axios from 'axios'

export class MessageBoard extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    user: this.props.user,
    users: this.props.users,
    receiver: null,
    message: '',
    messages: false,
  //   endpoint: "http://127.0.0.1:3001"
  }

  handleMessageSubmit = e => {
    e.preventDefault()
    const socket = socketIOClient();
   socket.emit("send-message", {
      user: this.state.user,
      message: this.state.message,
      receiver: this.state.receiver
    });
    this.setState({ message: ''})
  }

  handleMessage = e => {
    this.setState({message: e.target.value})
  }

  updateReceiver = (receiver) => {
    this.setState(({ receiver}))
    const socket = socketIOClient();
    socket.emit("get-user-messages", [this.state.user._id, receiver._id]);
  }
  updateState = (dataMessages) =>{
    this.setState((prevState) => {
      return { 
        response: prevState.messages? [...prevState.messages,...dataMessages] : prevState.messages= dataMessages
      };
    })
  }

  getMessages = () => {
    const { endpoint } = this.state;
    const socket = socketIOClient();
      socket.on("output", dataMessages => {
      console.log(" dataMessages", dataMessages)
        if(dataMessages){
          this.updateState(dataMessages)
        }
      });
  }
  componentDidMount = () => {
    this.getMessages()
    // this.timer = setInterval(this.getMessages, 4000);
    
  }
  componentWillUnmount() {
    console.log("========  is UNMOUNTED! ========");
    // clearInterval(this.timer); // !!!
}

  render() {
    const { messages, users} = this.state
    console.log(" this.state", this.state)
    return (
      <div>
        <div className="main-message-board">
          <div className="nav-sidebar">
            <div className="sidebar-icons">
              <Link to='/' className=''><span><i className="fas fa-feather-alt"></i></span></Link>
              <Link to='/' className=''><span><i className="fas fa-dove"></i></span></Link>
              <Link to='/' className=''><span><i className="fas fa-edit"></i></span></Link>
              <Link to='/' className=''><span><i className="fas fa-user"></i></span></Link>
              <Link to='/' className=''><span><i className="fab fa-dropbox"></i></span></Link>
              <Link to='/message-board' className=''><span className='fas fa-comment-dots'></span></Link>
              <Link to='/' className=''><span><i className="fas fa-award"></i></span></Link>
              <Link to='/' className=''><span><i className="fas fa-crop"></i></span></Link>
              <Link to='/' className=''><span><i className="fas fa-cog"></i></span></Link>
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
              { users.map(user => {
                const {_id, path, username,} = user
                  return (
                    <div key={_id} className="user-user-list">
                    <Link to={`/message-board/${_id}`} onClick={()=>this.updateReceiver(user)}>
                      <div className="user-image-div">
                        <img className="user-image" src={path} alt={username} />
                      </div>
                    </Link>
                  </div>
                  )
              })}
            </div>
            {/* messaging history */}
            <div className="messages-history">
              {users.map(user => {
                const {_id, path, username,firstName, lastName} = user
                return (
                  <Link key={_id} to={`/message-board/${_id}`} onClick={()=>this.updateReceiver(user)}>
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
                          <p>Some message will be here...</p>
                        </div>
                        <span id="msg-created-time">12:00 pm</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          <div id='"message-board' className="message-board">
            <div className="message-board-nav">
              <Switch>
                <Route exact strict
                  path="/message-board/:id"
                  render={props => (
                    <UserConversation {...props} users={users} />
                  )}
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

            <div className="message-board-body">
                <div id='messageBoardUsers'>
                  {/* all messages goes here */}
                    <div style={{ textAlign: "center" }}>
                      {messages
                          ? <p>
                            {messages.map(data => {
                             return data.receiver? (
                                <div className='receiver'> 
                                 <p>{data.receiver} {data.message} </p>
                                </div>
                              ) : (
                                <div className='current-user'> 
                                 <p>{data.sender} {data.message} </p>
                                </div>
                              )
                            })}
                          </p>
                          : <p>Loading...</p>}
                    </div>
                </div>
            </div>

            <form onSubmit={this.handleMessageSubmit} id='message-form' className="message-board-footer">
              <input id="message-input" onChange={this.handleMessage} type='text' placeholder="Type your message..." />

                <span className="icons message-icon"><i className="fas fa-smile"></i></span>
                <span className="icons message-icon"><i className="fas fa-paperclip"></i></span>
                <span className="icons message-icon" role="button" type="submit"><i className="fab fa-telegram"></i></span>
                {/* <span className="icons telegram"><i className="fas fa-microphone"></i></span>
                <span className="icons telegram"><i className="fas fa-microphone-slash"></i></span> */}
                <button className="icons"><i className="fab fa-telegram"></i>Send</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default MessageBoard;
