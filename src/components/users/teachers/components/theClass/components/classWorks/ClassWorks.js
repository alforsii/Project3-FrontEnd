import React, { useState, useEffect} from 'react';

import DisplayClassworks from './tasks/DisplayClassworks'
// import CreateWorkForm from './CreateWorkForm'
import CreateDropdown from './tasks/CreateDropdown'
import {AUTH_CLASSES} from '../../../../../../../services/classesAuth/ClassesAuth'
import ProgressBar from '../../../../../../auth/progressBar/ProgressBar'

import './ClassWorks.css';

function ClassWork({ currClass }) {

  const [classworks,setClassworks] = useState([])
  const [isLoading,setLoading] = useState(true)
  const fetchClassworks = async () =>  {
   try {
    setLoading(true)
    const {
      data: {
        classworks
      },
    } = await AUTH_CLASSES.getClassworks(currClass._id);

    setLoading(false)
    setClassworks(classworks)
   } catch (err) {
   console.log("fetchClassworks -> err", err)
   setLoading(false)
   }
  }
  useEffect(() => {
  fetchClassworks()
  },[currClass])


  return (
    <div className="main-classwork">
      <CreateDropdown currClass={currClass}/>
       <div className='classworks-div'>
         {!isLoading?
        <DisplayClassworks isLoading={isLoading} classworks={classworks}/>
        :<ProgressBar isLoading={true} strengthValue={100}/>
         }
      </div>
    </div>
  );
}

export default ClassWork