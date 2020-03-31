import React from 'react'
import './Loader.css'

export default function Loader() {

    return (
       <div className='loader-container'>
           <div className="lds-heart"><div></div></div>
            <div className="loader2"></div>
       </div>
    )
}
