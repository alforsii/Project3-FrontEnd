import React, { Component, createContext } from 'react';
import { withRouter } from 'react-router-dom';
import moment from 'moment'

import { AUTH_MESSAGES } from '../services/messagesAuth/MessagesAuth'
import { AuthContext } from './AuthProvider'


export const MessageContext = createContext();
export class MessageProvider extends Component {
    state = {
        receiver: null,
        messageInputs: {
            title: '',
            header: '',
            message: '',
        },
        errMessage: '',
        // messages: false,
        newMessages: null,
        readMessage: false,
        scroll: null,
        userBoards: undefined,
        receivers: undefined,
        isLoading: null,
        status: false,
        file: null,
        tempImagesURL: []
      };

       //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  updateState = data => {
    this.setState(data);
   
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
   this.setState(prevState => ({
      receiver,
      scroll: true
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
      const { name, value} = e.target
      console.log("Output for: MessageProvider -> name, value", name, value)
    this.setState(prevState => ({
        messageInputs: {
            ...prevState.messageInputs,
            [name]: value
        }
    }));
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
        messageInputs: this.state.messageInputs,
      });
      this.setState(prevState => ({
         messageInputs: {
             title:'',
             header:'',
             message:'',
         },
      }));
      this.setState(prevState => ({
          scroll: true
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


    render() {
        const {
            switchUser,
            updateStatus,
            handleMessage,
            handleMessageSubmit,
            handleFileChange,
            displayError,
            getUserBoards,
            updateMessageBoard,
            scrollMessagesDown,
            getReceivers,
            openEmojis,

          } = this;
          const messageState = this.state
          const {state} = this.context
        return (
            <MessageContext.Provider
            value={{
                state,
                messageState,
                switchUser,
                updateStatus,
                handleMessage,
                handleMessageSubmit,
                handleFileChange,
                displayError,
                getUserBoards,
                updateMessageBoard,
                scrollMessagesDown,
                getReceivers,
                openEmojis,
            }}
          >
            {this.props.children}
          </MessageContext.Provider>
        )
    }
}

export default withRouter(MessageProvider)
MessageProvider.contextType = AuthContext