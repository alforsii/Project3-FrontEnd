import React from 'react';

import PageMessage from './PageMessage';
import DisplayClassworks from './DisplayClassworks'
import CreateWorkForm from './CreateWorkForm'
import CreateDropdown from './CreateDropdown'
import './ClassWork.css';

export default function ClassWork({ classrooms, currClass, students, displayForm, classworks }) {

  return (
    <div className="main-classwork">
      <CreateDropdown displayForm={displayForm}/>
      { 
      classworks.length > 0? <div className='classworks-div'>
        <DisplayClassworks classworks={classworks}/>
      </div>
      :<PageMessage />
      }

        <CreateWorkForm 
        displayForm={displayForm}
        classrooms={classrooms} 
        currClass={currClass} 
        students={students}/>

    </div>
  );
}
