import React from 'react'

export default function ClassStudents({filterStudents, filterUsers, 
  currClass: { name, grade } }) {

     //Toggle all checkboxes
 const toggleCheckbox = e => {
    const { checked } = e.target;
    const checkboxes = document.querySelectorAll('.remove-user');
    for (var i = 0; i < checkboxes.length; i++) {
      checkboxes[i].checked = checked;
    }
  };

    return (
        <div>

          <div className="side-header">
            <h2> {name} </h2>
            <h2>grade: {grade} </h2>
          </div>

             <input
            type="text"
            placeholder="Search.."
            className="searchInput"
            onKeyUp={filterUsers}
            autoComplete="off"
          ></input>
          <div className="select-btns">
            <div>
              <input type="checkbox" onClick={toggleCheckbox} />
              <span> Select all</span>
            </div>
            <button id="removeFromClass">Remove all selected users</button>
          </div>
          <hr />
          <div className="userListScroll2">
             { filterStudents?.map((user,i) => {
               const { _id, path, username, firstName, lastName } = user;
               return (
                 <div key={_id+i+1} className="user-user-list-horizontal">
                   <div className="user-image-div user-horizontal">
                     <input type="checkbox" className='remove-user' />
                     <div>
                       <img className="user-image-sm " src={path} alt={username} />
                       <p>
                         {' '}
                         {firstName} {lastName}{' '}
                       </p>
                     </div>
                       <button className='removeOneFromClass'
                       onClick={() => this.removeFromClass(user)}>Remove from class</button>
                   </div>
                 </div>
               );
          })}
          </div>
        </div>
    )
}
