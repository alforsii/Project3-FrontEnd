import React, { useEffect, useState } from 'react';

import PageMessage from './PageMessage';
import PostClassworks from './PostClassworks'
import CreateWorkForm from './CreateWorkForm'
import CreateDropdown from './CreateDropdown'
import './ClassWork.css';

export default function ClassWork({ classrooms, currClass, students, displayForm, classworks }) {

console.log("Output for: ClassWork -> classworks", classworks)

  return (
    <div className="main-classwork">
      <CreateDropdown displayForm={displayForm}/>
      { 
      classworks.length > 0? <div className='classworks-div'>
        <PostClassworks classworks={classworks}/>
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
