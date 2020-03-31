import React from 'react'
import './Loader.css'

export default function Loader({ message }) {

    return (
       <div className='loader-container'>
            <div className="loader2"> {message} </div>
       </div>
    )
}
