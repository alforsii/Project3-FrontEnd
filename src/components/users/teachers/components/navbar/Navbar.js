import React from 'react'
import { Link } from 'react-router-dom';
import toggle from '../../../../sidebar/toggle';

export default function Navbar({getUsers, toggleSearchBar}) {
    return (
        <React.Fragment>
            <div className="main-switch">
              <button
                onClick={getUsers.bind(this, 'TA')}
                className="click-btn"
              >
                Co-Teachers
              </button>
              <button
                onClick={getUsers.bind(this, 'Student')}
                className="click-btn"
              >
                Students
              </button>
              <button
                onClick={getUsers.bind(this, 'Parent')}
                className="click-btn"
              >
                Parents
              </button>
              <Link className="click-btn" to="/classes/add-new"><i className='fas fa-plus-circle'></i> Class</Link>
              <Link className="click-btn" to="/classes/archives"> Notes</Link>
              <Link className="click-btn" to="/classes/archives"> Calendar</Link>
              <Link className="click-btn" to="/classes/archives"><i className='fas fa-trash-alt'></i> Archives</Link>
              <Link className="click-btn" to="/teachers-page"
              onClick={toggleSearchBar}><i className='fas fa-search'></i> Search</Link>
            </div>
        </React.Fragment>
    )
}
