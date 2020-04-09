import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import Sidebar from './components/Sidebar'
import CreateForm from './components/CreateClass'
import NewClass from './components/create-class-form/ClassForm'
import ClassList from './components/create-class-form/ClassPage'

import {AUTH_CLASSES} from '../../../services/classesAuth/ClassesAuth'
import './Teacher.css';

export class Teacher extends Component {
  state = {
    users: null,
    classes: null
  }
  componentDidMount = () => {
    this.getClasses()
  }
  //get all users
  getUsers = (title) => {
    this.setState(prevState => ({
      users: this.props.context.state.users.filter(user => user.title === title)
    }))
  }

  getClasses = async () => {
    const res = await AUTH_CLASSES.getClasses()
    this.setState({ classes: res.data.classes})
  }

  render() {
      const { users} = this.state
      const { updateState, state:{user} } = this.props.context
    return (
      <div className="main-teacher">
        <div className="t-child-div">
          <Sidebar/>
        </div>
        <div className='t-child-div'>
            <div className='t-dashboard'>
                <div className='main-switch'>
                    <button onClick={this.getUsers.bind(this, 'TA')} className='click-btn'>Co-Teachers</button>
                    <button onClick={this.getUsers.bind(this, 'Student')} className='click-btn'>Students</button>
                    <button onClick={this.getUsers.bind(this, 'Parent')} className='click-btn'>Parents</button>
                </div>
                <div className="users-div t-users">
              {users?.map(user => {
                const { _id, path, username } = user;
                return (
                  <div key={_id} className="dropdown user-user-list">
                    <div className="user-image-div">
                      <img className="user-image dropbtn" src={path} alt={username} />
                    </div>
                      <div className="dropdown-content">
                    <Link to={`/message-board/${_id}`}
                      onClick={() => updateState(prevState => ({
                        messageBoard: {
                          ...prevState.messageBoard,
                          receiver: user
                        }
                      }))}
                    >Send message
                    </Link>
                    <Link to='/create-class'>
                         Add to class
                       </Link>
                      </div>
                  </div>
                );
              })}
            </div>
                <h2>Hello {user?.firstName}, Some title here</h2>
                <p>Create new class</p>
                {/* <CreateForm/> */}
                <NewClass/>
                <ClassList classes={this.state.classes}/>
                <div>Activities</div>
            </div>
        </div>
      </div>
    );
  }
}

export default Teacher;
