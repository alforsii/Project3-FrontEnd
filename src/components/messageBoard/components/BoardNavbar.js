import React from 'react';
import Avatar from '../../auth/avatar/Avatar';
import {MessageContext} from '../../../myContext/MessageProvider'

export default function BoardNavbar(props) {

  return (
    <MessageContext.Consumer>
      {msgContext => {
         const { message, receiver} = msgContext.messageState
        //  if(!receiver) props.history.push('/message-board')
         return (
          <>
            <div className="user-div">
              <div className="user2">
                  <div className="user-image-div large">
                    <Avatar src={receiver?.path} alt={receiver?.firstName} size={'medium'}/>
                  </div>
                <div>
                  <h3 className="username">
                    {receiver?.firstName} {receiver?.lastName}
                  </h3>
                {message &&
                  <p style={{color:'red'}}>{message}</p>}
                {/* :<p>Some message will be here...</p> */}
                </div>
              </div>
            </div>
           
          </>
        );
      }}
    </MessageContext.Consumer>
  )
}
