import React from 'react'
import './Loader.css'

export default function Loader({message}) {
    const emoji = ['😇', '👀', '🤩', '👆', '👊','😸', '🏃', '🙈', '⛹️', '🏄‍♀️', '🚴', '🚨','🕒','😁','🤪']
    const random = emoji[Math.floor(Math.random()*emoji.length)]
    return (
        <div className="loader"><span className='loader-text'>{message? message : 'Loading'}...</span>
                       <div className="circle"> {random} </div>
                       <div className="circle"> {random} </div>
                       <div className="circle"> {random} </div>
         </div>
    )
}
