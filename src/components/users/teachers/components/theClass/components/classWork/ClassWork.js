import React, { useState, useEffect} from 'react';

import DisplayClassworks from './DisplayClassworks'
// import CreateWorkForm from './CreateWorkForm'
import CreateDropdown from './CreateDropdown'
import {AUTH_CLASSES} from '../../../../../././../../services/classesAuth/ClassesAuth'

import './ClassWork.css';

function ClassWork({ currClass }) {

  const [classworks,setClassworks] = useState([])
  async function fetchClassworks() {
   try {
    const {
      data: {
        classworks
      },
    } = await AUTH_CLASSES.getClassworks(currClass._id);

    setClassworks(classworks)
   } catch (err) {
   console.log("fetchClassworks -> err", err)
     
   }
  }
  useEffect(() => {
  fetchClassworks()
  },[currClass])


  return (
    <div className="main-classwork">
      <CreateDropdown currClass={currClass}/>
       <div className='classworks-div'>
        <DisplayClassworks classworks={classworks}/>
      </div>
    </div>
  );
}

export default ClassWork