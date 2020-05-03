import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import { MessageContext } from '../../myContext/MessageProvider'
import BoardNavbar from './components/BoardNavbar';
import BoardBody from './components/BoardBody'
import SendMessage from './components/SendMessage';
import './MessageBoard.css';

export class MessageBoard extends Component {
  timer = 0;
  //=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    //=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    //1. Component did mount - then getUserBoards and updateMessageBoard
  //=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  componentDidMount = () => {
    //check for new updates
    this.timer = setInterval(() => {
      this.context.getUserBoards();
      this.context.updateMessageBoard();
    }, 2000);
  };

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
      message,
      receiver,
      isLoading
    } = this.context.messageState;
    const { handleMessageSubmit, handleMessage,openEmojis, handleFileChange } = this.context
    return (
      <div>
        <div className="main-message-board">
          <div id='message-board' className="message-board">
            <div className="message-board-nav">
              <Switch>
                <Route exact path="/message-board/:id" component={BoardNavbar} />
              </Switch>
              <div>
                <span id="search-icon2">
                  <i className="fas fa-search"></i>
                </span>
                <span>
                  <i className="fas fa-user-plus"></i>
                </span>
                <span>
                  <i className="fas fa-ellipsis-h"></i>
                </span>
              </div>
            </div>

            <div id="message-board-body" className="message-board-body">
              <div id="messageBoardUsers">
                  { receiver && <BoardBody isLoading={isLoading} newMessages={newMessages} state={this.context.messageState}/>}
              </div>
            </div>
            <SendMessage
            handleMessageSubmit={handleMessageSubmit}
            handleMessage={handleMessage}
            message={message}
            openEmojis={openEmojis}
            handleFileChange={handleFileChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default MessageBoard;
MessageBoard.contextType = MessageContext