import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar'
import {MenuDropdown} from './MenuDropdown'
import Alert from './Alert'
import './UserList.css';

export default class UserList extends Component {
  state = {
    users: this.props.users,
    filterUsers: this.props.users,
    alert: false,
    message: ''
  }

  toggleCheckbox = (e) => {
    const checkboxes = document.querySelectorAll('.teachers');
  this.setState({ selectAll: e.target.checked })
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

  //Remove added teacher from list
  removeAddedUser = removedUser => {
    this.setState(prevState => ({
      users: prevState.users.filter(user => user._id !== removedUser._id),
      filterUsers: prevState.filterUsers.filter(user => user._id !== removedUser._id)
    }))
  }

    //Alert
    handleAlert = (user) => {
      this.setState(prevState => ({
        alert: !prevState.alert,
        message: `${user?.firstName} ${user?.lastName} successfully added to the class!`
      }))
      if(user !== null) {
        setTimeout(() => {
          this.handleAlert(null)
        },5000)
      }
    }

  render() {
    const { filterUsers } = this.state;
    return (
      <div className='main-user-list'>
         <button className="close-form-btn"
              onClick={this.props.closeUserList}>x</button>
        <input type="text" placeholder='Search for co-teachers by name or email...' className="searchInput" onKeyUp={this.filterUsers} autoComplete='off'></input>
        <div className='select-btns'>
          <div>
            <input type="checkbox" onChange={this.toggleCheckbox} />
            <span> Select all</span>
          </div>
          <button id='addToClass'>Add all selected users</button>
        </div>
        <hr/>

        <div className='userListScroll'>
        {filterUsers?.map(user => {
          const { _id, path, username, firstName, lastName } = user;
          return (
            <div key={_id} className="user-user-list-horizontal">
              <div className="user-image-div user-horizontal">
                <input type="checkbox" className='add-user teachers' />
                <div>
                  {/* <img className="user-image-sm " src={path} alt={username} /> */}
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
        { this.state.alert && <Alert message={this.state.message}/>}
      </div>
    );
  }
}
