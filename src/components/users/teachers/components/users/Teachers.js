import React, { Component } from 'react';

import {MenuDropdown} from './MenuDropdown'
import Avatar from '@material-ui/core/Avatar'
import Alert from './Alert'
import './UserList.css';

export default class UserList extends Component {
  state = {
    users: this.props.users,
    filterUsers: this.props.users,
    alert: false,
    messages: []
  }

  toggleCheckbox = (e) => {
    const checkboxes = document.querySelectorAll('.students');
    for (let i = 0; i < checkboxes.length; i++) {
      checkboxes[i].checked = e.target.checked;
    }
    
  }

  //Search user
  filterUsers = e => {
   const searchUser = e.target.value.toUpperCase();
    const searchResult = [...this.state.users].filter(user => 
      `${user.firstName} ${user.lastName}`.toUpperCase().includes(searchUser) || `${user.email}`.toUpperCase().includes(searchUser))
    this.setState({
      filterUsers: searchResult
    })
  }

  //remove added student from the list
  removeAddedUser = removedUser => {
    this.setState(prevState => ({
      users: prevState.users.filter(user => user._id !== removedUser._id),
      filterUsers: prevState.filterUsers.filter(user => user._id !== removedUser._id)
    }))
  }
  //Alert
  handleAlert = (user) => {
    this.setState(prevState => ({
      alert: true,
      messages: [ {msg: `${user?.firstName} ${user?.lastName} successfully added to the class!`, time: 5000}, ...prevState.messages]
      // messages: [...prevState.messages, {msg: `${user?.firstName} ${user?.lastName} successfully added to the class!`, time: new Date().getTime()}]
    }))
           
  }

  updateState = (data) => {
    this.setState(data)
  }
  render() {
    const { filterUsers } = this.state;

    return (
      <div className='main-user-list'>
        <button className='close-form-btn'
              onClick={this.props.closeUserList}>x</button>
        <input type="text" placeholder='Search for students by name or email...' className="searchInput" onKeyUp={this.filterUsers} autoComplete='off'></input>
        <div className='select-btns'>
          <div>
            <input type="checkbox" onChange={this.toggleCheckbox} />
            <span> Select all</span>
          </div>
          <button id='addToClass'>Add all selected users</button>
        </div>

        <div className='userListScroll'>
        {filterUsers?.map(user => {
          const { _id, path, username, firstName, lastName } = user;
          return (
            <div key={_id} className="user-user-list-horizontal">
              <div className="user-image-div user-horizontal">
                <input type="checkbox" className={`add-user students`} />
                <div>
                  <Avatar alt={username} src={path}/>
                  <p>
                    {' '}
                    {firstName} {lastName}{' '}
                  </p>
                </div>
              </div>

              <MenuDropdown
                  currUser={user}
                  updateState={this.props.updateState}
                  addToClass={this.props.addToClass}
                  removeAddedUser={this.removeAddedUser}
                  handleAlert={user => this.handleAlert(user)}
                  
                  />
                  
            </div>
          );
        })}
        </div>
        { this.state.alert
         && this.state.messages?.map((data, i) => <Alert key={data.msg + i} 
         messages={this.state.messages}
         updateState={this.updateState}
        message={data.msg} time={data.time}/>)}
      </div>
    );
  }
}
