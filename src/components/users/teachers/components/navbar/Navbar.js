import React from 'react'
import { Link } from 'react-router-dom';
import toggle from '../../../../sidebar/toggle';

export default function Navbar({getUsers, toggleSearchBar, updateState, toggleClassNavDropdown}) {
    return (
        <React.Fragment>
            <div className="main-switch">
              <Link to="/teachers-page" onClick={toggleSearchBar} className="click-btn"><i className='fas fa-search'></i> Search</Link>
              <Link to="/classes/add-new" className="click-btn"><i className='fas fa-plus-circle'></i> Class</Link>
              <Link to="/teachers-page" onClick={() => updateState({navigate: 'classrooms'})} className="click-btn">Classes</Link>
              {/* <Link to="/teachers-page" onClick={() => updateState({navigate: 'archive'})} className="click-btn"><i className='fas fa-trash-alt'></i> Archives</Link> */}

              <div className="dropdown3">
                <button id='click-btn'
                  className="dropbtn3"
                  onClick={toggleClassNavDropdown}
                >
                  More <i className="fa fa-caret-down"></i>
                </button>
                <div className="dropdown-content3 classNavDropdown">
                  <p
                    onClick={() => {
                      updateState({navigate: 'users-list'})
                      getUsers('TA')
                    }}
                  >
                    Co-Teachers
                  </p>
                  <p
                    onClick={() => {
                      getUsers('Student')
                      updateState({navigate: 'users-list'})
                    }}
                  >
                    Students
                  </p>
                  <p
                    onClick={() => {
                      getUsers('Parent')
                      updateState({navigate: 'users-list'})
                    }}
                  >
                    Parents
                  </p>
                  <p>
                  <Link to="/teachers-page" onClick={() => updateState({navigate: 'archive'})}><i className='fas fa-trash-alt'></i> Archives</Link>
                  </p>
                </div>
              </div>

              {/* <button
                onClick={() => {
                  updateState({navigate: 'users-list'})
                  getUsers('TA')
                }}
                className="click-btn"
              >
                Co-Teachers
              </button>
              <button
                onClick={() => {
                  getUsers('Student')
                  updateState({navigate: 'users-list'})
                }}
                className="click-btn"
              >
                Students
              </button>
              <button
                onClick={() => {
                  getUsers('Parent')
                  updateState({navigate: 'users-list'})
                }}
                className="click-btn"
              >
                Parents
              </button> */}
            </div>
        </React.Fragment>
    )
}
