import React, { Component } from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import UserConversation from './UserConversation';
import data from '../../data/users';
import './MessageBoard.css';

const users = [...data].map((user, i) => {
  return { ...user, _id: i + 1 };
});

export class MessageBoard extends Component {

  render() {
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
                  return (
                    <div key={user._id} className="user-user-list">
                    <Link to={`/message-board/${user._id}`}>
                      <div className="user-image-div">
                        <img className="user-image" src={user.path} alt={user.username} />
                      </div>
                    </Link>
                  </div>
                  )
              })}
            </div>
            {/* messaging history */}
            <div className="messages-history">
              {users.map(user => {
                return (
                  <Link key={user._id} to={`/message-board/${user._id}`}>
                    <div className="user-div">
                      <div className="user user1">
                        <div className="user-image-div">
                          <img
                            className="user-image"
                            src={user.path}
                            alt={user.username}
                          />
                        </div>
                        <div>
                          <h5 className="username">
                            {user.firstName} {user.lastName}
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

          <div className="message-board">
            <div className="message-board-nav">
              <Switch>
                <Route
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

                </div>
            </div>

            <form id='message-form' className="message-board-footer">
              <input id="message-input" type='text' placeholder="Type your message..." />

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
