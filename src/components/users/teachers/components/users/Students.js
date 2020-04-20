import React, { Component } from 'react';
import './UserList.css';

export default class UserList extends Component {
  state = {
    users: this.props.users,
    filterUsers: this.props.users,
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

  removeAddedUser = removedUser => {
    this.setState(prevState => ({
      users: prevState.users.filter(user => user._id !== removedUser._id),
      filterUsers: prevState.filterUsers.filter(user => user._id !== removedUser._id)
    }))
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
        <hr/>

        <div className='userListScroll'>
        {filterUsers?.map(user => {
          const { _id, path, username, firstName, lastName } = user;
          return (
            <div key={_id} className="user-user-list-horizontal">
              <div className="user-image-div user-horizontal">
                <input type="checkbox" className={`add-user students`} />
                <div>
                  <img className="user-image-sm " src={path} alt={username} />
                  <p>
                    {' '}
                    {firstName} {lastName}{' '}
                  </p>
                </div>
              </div>
                  {/*  */}
                  <div className="dropdown3">
                        <button
                          className="dropbtn3"
                          onClick={this.props.toggleClassNavDropdown}
                        >
                            <i className="fas fa-ellipsis-h"></i>
                        </button>
                        <div className="dropdown-content3 align-right classNavDropdown">
                        <div className="each-student">
                       <img className="user-image-md" src={path} alt={username} />
                       <h4>
                         {' '}
                         {firstName} {lastName}{' '}
                       </h4>
                     </div>
                          <p>Mark</p>
                          <p onClick={() => {
                            this.props.addToClass(user)
                            return this.removeAddedUser(user)
                          }}>Add to class</p>
                        </div>
                      </div>
                  {/*  */}
            </div>
          );
        })}
        </div>
      </div>
    );
  }
}
