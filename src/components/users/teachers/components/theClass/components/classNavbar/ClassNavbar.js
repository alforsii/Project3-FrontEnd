import React, { useState } from 'react'


import './ClassNavbar.css'

export default function ClassNav({switchDefaultPage}) {
    const [currentPage, setCurrentPage] = useState('2');
    return (
        <React.Fragment>
            <nav className="class-nav">
                <button onClick={() => {
                    setCurrentPage('1')
                    switchDefaultPage('posts')
                }} className={`click-btn2 ${currentPage === '1' && 'focus-on'}`}>Posts</button>
                <button onClick={() => {
                    setCurrentPage('2')
                    switchDefaultPage('works')
                }} className={`click-btn2 ${currentPage === '2' && 'focus-on'}`}>Classworks</button>
                <button onClick={() => {
                    setCurrentPage('3')
                    switchDefaultPage('users')
                }} className={`click-btn2 ${currentPage === '3' && 'focus-on'}`}>Connections</button>
          </nav>
        </React.Fragment>
    )
}
