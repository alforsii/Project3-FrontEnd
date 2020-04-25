import React, { useState } from 'react'


import './ClassNavbar.css'

export default function ClassNav({switchDefaultPage}) {
    const [currentPage, setCurrentPage] = useState('1');
    return (
        <React.Fragment>
            <nav className="class-nav">
                <button onClick={() => {
                    setCurrentPage('1')
                    switchDefaultPage('posts')
                }} className={`click-btn ${currentPage === '1' && 'focus-on'}`}>Posts</button>
                <button onClick={() => {
                    setCurrentPage('2')
                    switchDefaultPage('works')
                }} className={`click-btn ${currentPage === '2' && 'focus-on'}`}>Works</button>
                <button onClick={() => {
                    setCurrentPage('3')
                    switchDefaultPage('users')
                }} className={`click-btn ${currentPage === '3' && 'focus-on'}`}>Connections</button>
          </nav>
        </React.Fragment>
    )
}
