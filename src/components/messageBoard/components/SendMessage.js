import React from 'react'
import {Button} from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send';

import Emojis from './Emojis'

export default function SendMessage({ handleMessageSubmit, message,
    handleMessage, openEmojis,handleFileChange }) {
    return (
        <form
        onSubmit={handleMessageSubmit}
        id="message-form"
        className="message-board-footer"
      >
        <textarea
          id="message-input"
          autoComplete='off'
          onChange={handleMessage}
          value={message}
          name="message"
          type="textarea"
          placeholder='Type your message...'
        />

        {/* <span  className="icons message-icon">
          <i onClick={openEmojis}><i className="fas fa-smile"></i></i>
          <div id='emojis-container' className='emojis-container'>
            <Emojis />
          </div>
        </span>
        <input style={{display:'none'}} type='file' 
        onChange={handleFileChange}
        ref={fileInput=> this.fileInput = fileInput}/>
        <span className="icons message-icon" onClick={()=> this.fileInput.click()}>
          <i className="fas fa-paperclip"></i>
        </span> */}
        <Button style={{color: '#0794f3'}} type='submit' >
          <SendIcon />
        </Button>
      </form>
    )
}
