import React from 'react';

import PageMessage from './PageMessage';
import CreateWorkForm from './CreateWorkForm'
import './ClassWork.css';

export default function ClassWork({ toggleClassNavDropdown, displayForm }) {
  return (
    <div className="main-classwork">
      <div>
        <div className="dropdown3">
          <button
            className="dropbtn3 create-btn"
            onClick={toggleClassNavDropdown}
          >
            <i className="fas fa-plus"></i> Create
          </button>
          <div className="dropdown-content3 classNavDropdown">
            <p onClick={displayForm}>
              <i className="fas fa-question-circle"></i> Question
            </p>
            <p onClick={displayForm}>
              <i className="fas fa-book"></i> Resource
            </p>
            <p onClick={displayForm}>
              <i className="fas fa-tasks"></i> Assignment
            </p>
            <hr />
            <p onClick={displayForm}>
              <i className="fas fa-file-alt"></i> Topic
            </p>
          </div>
        </div>
      </div>
      <br />
      <PageMessage />

        <CreateWorkForm/>

    </div>
  );
}
