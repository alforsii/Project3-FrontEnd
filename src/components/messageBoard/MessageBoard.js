import React, { Component } from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import BoardNav from './Nav';
import moment from 'moment'
import './MessageBoard.css';

import axios from 'axios'

export class MessageBoard extends Component {

  state = {
    user: this.props.user,
    users: this.props.users,
    receiver: undefined,
    message: '',
    messages: false,
    userBoards: undefined,
    receivers: undefined,

  }

  //Handle Submit - Send message
  handleMessageSubmit = async e => {
    e.preventDefault()
    let res = await axios.post(`/api/messages/add-new-message`, {
      otherUser: this.state.receiver,
      message: this.state.message
    })
    console.log("New Message", res)
    this.setState(prevState => (
      {  messages: [...prevState.messages, res.data] }
    ))
    this.setState({ message: ''})
    this.getUserBoards() // to update message history list
  }

  //Handle input change
  handleMessage = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  //Update message history list (left side with user image and las message and time)
  updateMessageBoard = async (receiver) => {
    this.setState({ receiver})
    const res = await axios.post('/api/messages/board', receiver)
    this.setState({ messages: res.data})
  }

  //Get messages
  getUserBoards = async () => {
    // let res = await axios.get(`/api/messages`, { params: { id: this.state.user._id}})
    const res = await axios.get(`/api/messages`)
    this.setState({ userBoards: res.data})
    
  }

  getReceivers = (userBoards) => {
    return userBoards.map(board => {
      const receiverObj = board.messages[0].receiverID
      const createdAt = board.messages[board.messages.length -1].createdAt
      receiverObj.createdAt = moment(createdAt).calendar()
      receiverObj.lastMessage = board.messages[board.messages.length -1]

    return receiverObj 
      if(board.messages.length > 0){
      }
      return board.messages[0].receiverID
     }).sort((a,b) => b.createdAt > a.createdAt ? -1 : 1)
  }
  componentDidMount = () => {
    this.getUserBoards()
    // this.timer = setInterval(this.getUserBoards, 4000);
    
  }
  componentWillUnmount() {
    console.log("========  component UNMOUNTED! ========");
    // clearInterval(this.timer); // !!!
}

  render() {
    const { messages, users, userBoards, message} = this.state
    // console.log("Output receivers", receivers)
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
                    <Link to={`/message-board/${_id}`} onClick={()=> this.updateMessageBoard(user)}>
                      <div className="user-image-div">
                        <img className="user-image" src={path} alt={username} />
                      </div>
                    </Link>
                  </div>
                  )
              })}
            </div>
            {/* messaging history with user image*/}
            <div className="messages-history">
              {userBoards? this.getReceivers(userBoards).map(user => {
              // console.log("receiver-> user", user)
                const {_id, path, username,firstName, lastName, lastMessage, createdAt} = user
                // const lastMessage = messages[messages.length -1]
                 return (
                    <Link key={_id} to={`/message-board/${_id}`} onClick={()=>this.updateMessageBoard(user)}>
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
                            <p>{lastMessage.author._id.toString() === this.state.user._id.toString() ? 'You: ' : lastMessage.author.firstName + ': '} 
                            {lastMessage.message.length > 25? lastMessage.message.slice(0,25) : lastMessage.message}...</p>
                          </div>
                          <span id="msg-created-time"> {createdAt}</span>
                        </div>
                      </div>
                    </Link>
                  ) 

              }): ''}
            </div>
          </div>

          <div id='"message-board' className="message-board">
            <div className="message-board-nav">
              <Switch>
                <Route exact strict
                  path="/message-board/:id"
                  render={props => (
                    <BoardNav {...props} users={users} />
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
                    <div className='conversation-div'>
                      {messages
                          ? <div>
                            {messages.map(msg => {
                             return msg.author.username !== msg.sender? (
                                <div key={msg._id} className='receiver each-user-msg-div'> 
                                    <div className="chat-message" >
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
                                              <img className="user-image" src={msg.receiverID.path} alt={msg.receiverID.firstName} />
                                              </Link>
                                            </div>
                                            
                                          </div>
                                  </div>
                                </div>
                              ) : (
                                <div key={msg._id} className='current-user each-user-msg-div'> 
                                     <div className="chat-message">
                                    <div  className="user-in-chat">
                                        <div>
                                            <Link to="/profile/user-details">
                                            <img className="user-image" src={msg.author.path} alt={msg.author.firstName} />
                                            </Link>
                                        </div> 
                                    </div>
                                    <div className="parent-msg-div">
                                        <div className="msg-div">
                                            <span>{msg.message}</span>
                                        </div> 
                                          <span className="deleteMsgBtn" >
                                            <i className="far fa-trash-alt"></i>
                                          </span>
                                    </div>
                                </div>
                                </div>
                              )
                            })}
                          </div>
                          : <p>Loading...</p>}
                    </div>
                </div>
            </div>

            <form onSubmit={this.handleMessageSubmit} id='message-form' className="message-board-footer">
              <input id="message-input" onChange={this.handleMessage} 
              value={message}
              name= 'message'
              type='text' placeholder="Type your message..." />

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
