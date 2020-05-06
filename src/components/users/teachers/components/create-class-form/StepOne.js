// import React from 'react'
// import { Link } from 'react-router-dom'

// export const StepOne = (props) => {

// const { form: {name, grade, schoolYearStart, schoolYearEnd},
//  message, handleChange, nextStep } = props
//         return (
//             <div className='user-form'>
//                 <h2>Enter Class name & grade</h2>
//                 <Link to='/class'
//                 style={{position: 'absolute', top: '70px', left: '20px', textDecoration: 'none', color: '#068ce6'}}>Go back</Link>
//                 <label htmlFor='name'> Name
//                     </label>
//                 <input className='form-input'
//                 placeholder={message? message : 'Enter name'}
//                 name='name'
//                 id='name'
//                 type='text'
//                 onChange={handleChange}
//                 defaultValue={name}
//                 />

//                 <label htmlFor='grade'>Grade
//                     </label>
//                 <input className='form-input'
//                 placeholder={message? message : 'Enter grade'}
//                 name='grade'
//                 id='grade'
//                 type='text'
//                 onChange={handleChange}
//                 defaultValue={grade}
//                 />

//                 <label htmlFor='schoolYearStart'>School year start
//                     </label>
//                 <input className='form-input'
//                 placeholder={message? message : 'Enter school year start'}
//                 name='schoolYearStart'
//                 id='schoolYearStart'
//                 type='date'
//                 onChange={handleChange}
//                 defaultValue={schoolYearStart}
//                 />

//                 <label htmlFor='schoolYearEnd'>School year end
//                     </label>
//                 <input className='form-input'
//                 placeholder={message? message : 'Enter school year end'}
//                 name='schoolYearEnd'
//                 id='schoolYearEnd'
//                 type='date'
//                 onChange={handleChange}
//                 defaultValue={schoolYearEnd}
//                 />
//                 <div>
//                 <button className='form-btn' onClick = {nextStep}>Continue</button>
//                 </div>

//             </div>
//         )
       
// }

// export default StepOne