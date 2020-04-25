import React, { useState } from 'react'
import { Link } from 'react-router-dom';

import toggleSideBar from '../sidebar/toggle'
import './NavBar.css'

export default function NavBar({loggedIn, userLogout, user}) {
    const [currentPage, setCurrentPage] = useState('');

    if(loggedIn) {
        return (
            <nav className='navbar'>
                <div className='nav-group'>
                    <Link to='/' id='nav-logo' className='nav-items' onClick={() => setCurrentPage('')} style={{color: '#3f51b5', fontFamily: 'italic'}}><i style={{color:'#4a148c'}}> IronSchool</i></Link>
                    <span onClick={()=> toggleSideBar()} id='menu-bars-btn' className='nav-items'><span className='fas fa-bars'></span></span>
                    <Link to='/'><img id='navbar-user-img' className='nav-items' onClick={() => setCurrentPage('')} src={user?.path} alt={user?.firstName}/></Link>
                    <i  style={{color: '#0794f3', fontFamily: 'italic'}}>Hi, {user?.firstName}!</i>
                </div>
                <div className='nav-group'>
                    <Link to='/class' className={`nav-items ${currentPage === 1 && 'focus-on'}`} onClick={() => setCurrentPage(1)}><span className='fas fa-school'></span></Link>
                    <Link to='/students-page' className={`nav-items ${currentPage === 2 && 'focus-on'}`} onClick={() => setCurrentPage(2)}><i className="fas fa-book-open"></i></Link>
                    <Link to='/message-board' className={`nav-items ${currentPage === 3 && 'focus-on'}`} onClick={() => setCurrentPage(3)}><span className='fas fa-envelope'></span></Link>
                    <Link to='/settings/update-profile' className={`nav-items ${currentPage === 4 && 'focus-on'}`} onClick={() => setCurrentPage(4)}><span className='fas fa-cog'></span></Link>
                    <Link to='/' className='nav-items' onClick={userLogout} id='navbar-logout-btn'>Logout <span className='fas fa-sign-out-alt'></span></Link>
                </div>
            </nav>
        )
    } 
    else {
        return (
            <nav className='navbar'>
                <div className='nav-group'>
                <Link to='/' id='nav-logo' className='nav-items' style={{color: '#3f51b5', fontFamily: 'italic'}}><i style={{color:'#4a148c'}}> IronSchool</i></Link>
               </div>
                <div className='nav-group'>
                    <Link to='/login' className='nav-items'>Login</Link>
                </div>
            </nav>
        )
    }

    
}
