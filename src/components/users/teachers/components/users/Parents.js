import React, { Component } from 'react';
import './UserList.css';

export default class UserList extends Component {
  state = {
    users: this.props.users,
    filterUsers: this.props.users,
    selectAll: false,
    title: this.props.title
  }

  toggleCheckbox = (e) => {
    const checkboxes = document.querySelectorAll(`.parents`);
  // this.setState({ selectAll: e.target.checked })
  for (let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].checked = e.target.checked;
  }
    
  }

  //Search user
  filterUsers = e => {
   const searchUser = e.target.value.toUpperCase();
    const searchResult = [...this.state.users].filter(user => `${user.firstName} ${user.lastName}`.toUpperCase().includes(searchUser.toUpperCase()))
    this.setState({
      filterUsers: searchResult
    })
  }

  render() {
    const { filterUsers } = this.state;
    return (
      <div className='main-user-list'>
        <input type="text" placeholder={`Search for parents...`} className="searchInput" onKeyUp={this.filterUsers} autoComplete='off'></input>
        <div className='select-btns'>
          <div>
            <input type="checkbox" onChange={this.toggleCheckbox} />
            <span> Select all</span>
          </div>
          <button id='addToClass'>Add all selected users</button>
        </div>
        <hr/>

        {filterUsers?.map(user => {
          const { _id, path, username, firstName, lastName } = user;
          return (
            <div key={_id} className="user-user-list-horizontal">
              <div className="user-image-div user-horizontal">
                <input type="checkbox" className={`add-user parents`} />
                <div>
                  <img className="user-image-sm " src={path} alt={username} />
                  <p>
                    {' '}
                    {firstName} {lastName}{' '}
                  </p>
                </div>
                  <button className='addOneToClass'
                  onClick={() => this.props.addToClass(user)}>Add to class</button>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
