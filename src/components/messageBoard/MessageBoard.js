import React, { Component } from 'react';

import { MessageContext } from '../../myContext/MessageProvider';
import BoardNavbar from './components/BoardNavbar';
import BoardBody from './components/BoardBody';
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
    const { newMessages, messageInputs, isLoading } = this.context.messageState;
    const {
      handleMessageSubmit,
      handleMessage,
      openEmojis,
      handleFileChange,
    } = this.context;
    return (
      <div>
        <div className="main-message-board">
          <div id="message-board" className="message-board">
            <div className="message-board-nav">
              <BoardNavbar />

              <div>
                <span>
                  <i className="fas fa-user-plus"></i>
                </span>
                <span>
                  <i className="fas fa-ellipsis-h"></i>
                </span>
              </div>
            </div>

            <div id="message-board-body" className="message-board-body">
              <BoardBody
                isLoading={isLoading}
                newMessages={newMessages}
                state={this.context.messageState}
              />
            </div>
            <SendMessage
              messageInputs={messageInputs}
              handleMessageSubmit={handleMessageSubmit}
              handleMessage={handleMessage}
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
MessageBoard.contextType = MessageContext;
