import React from 'react';
import './PageMessage.css';

export default function PageMessage() {
  return (
    <div className="main-page-message">
      <article className="page-message">
        <div className="page-message-header">
          <h4>
            <i>Assign work to your class here</i>
          </h4>
        </div>
        <div className="page-message-body">
          <p>
            <i className="fas fa-tasks"></i>{' '}
            <span>Create Assignments and questions</span>
          </p>
          <p>
            <i className="fas fa-file-alt"></i>{' '}
            <span> Use topics for your students classwork</span>
          </p>
          <p>
            <i className="fas fa-sort-alpha-down"></i>{' '}
            <span>
              {' '}
              Sort your posts the way you want your students to see it
            </span>
          </p>
        </div>
      </article>
    </div>
  );
}
