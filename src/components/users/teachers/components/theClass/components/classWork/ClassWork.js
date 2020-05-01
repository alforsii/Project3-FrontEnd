import React from 'react';

import PageMessage from './PageMessage';
import CreateWorkForm from './CreateWorkForm'
import CreateDropdown from './CreateDropdown'
import './ClassWork.css';

export default function ClassWork({ classes, currClass, filteredStudents, displayForm }) {
  return (
    <div className="main-classwork">
      <CreateDropdown displayForm={displayForm}/>
      <PageMessage />

        <CreateWorkForm 
        displayForm={displayForm}
        classrooms={classes} 
        currClass={currClass} 
        filteredStudents={filteredStudents}/>

    </div>
  );
}
