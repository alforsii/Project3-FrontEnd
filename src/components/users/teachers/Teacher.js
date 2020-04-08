import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import Sidebar from './Sidebar'
// import AddForm from './create-class-form/UserForm'
import './Teacher.css';

export class Teacher extends Component {

  render() {
      const { user, users} = this.props.context.state
      const { updateState } = this.props.context
    return (
      <div className="main-teacher">
        <div className="t-child-div">
          <Sidebar/>
        </div>
        <div className='t-child-div'>
            <div className='t-dashboard'>
                <div className='main-switch'>
                    <button className='click-btn'>Teachers</button>
                    <button className='click-btn'>Students</button>
                    <button className='click-btn'>Parents</button>
                </div>
                <div className="users-div t-users">
              {users.map(user => {
                const { _id, path, username } = user;
                return (
                  <div key={_id} className="user-user-list">
                    <Link to={`/message-board/${_id}`}
                      onClick={() => updateState(prevState => ({
                        messageBoard: {
                          ...prevState.messageBoard,
                          receiver: user
                        }
                      }))}
                    >
                      <div className="user-image-div">
                        <img className="user-image" src={path} alt={username} />
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
                <h2>Hello, Some title here</h2>
                <p>Some text here</p>
            </div>
        </div>
      </div>
    );
  }
}

export default Teacher;
