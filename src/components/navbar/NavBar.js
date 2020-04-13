import React from 'react'
import { Link } from 'react-router-dom';

import toggleSideBar from '../sidebar/toggle'
import './NavBar.css'

export default function NavBar({loggedIn, userLogout, user}) {
    if(loggedIn) {
        return (
            <nav className='navbar'>
                <div className='nav-group'>
                    <Link to='/' className='nav-items' style={{color: '#3f51b5', fontFamily: 'italic'}}><i style={{color:'#4a148c'}}> IronSchool</i></Link>
                    <span onClick={()=> toggleSideBar()} id='menu-bars-btn' className='nav-items'><span className='fas fa-bars'></span></span>
                    <Link to='/'><img id='navbar-user-img' className='nav-items' src={user?.path} alt={user?.firstName}/></Link>
                    <i  style={{color: '#0794f3', fontFamily: 'italic'}}>Hi, {user?.firstName}!</i>
                </div>
                <div className='nav-group'>
                    <Link to='/teachers-page' className='nav-items'><span className='fas fa-school'></span></Link>
                    <Link to='/students-page' className='nav-items'><i className="fas fa-book-open"></i></Link>
                    <Link to='/message-board' className='nav-items'><span className='fas fa-envelope'></span></Link>
                    <Link to='/settings/update-profile' className='nav-items'><span className='fas fa-cog'></span></Link>
                    <Link to='/' className='nav-items' onClick={userLogout} id='navbar-logout-btn'>Logout <span className='fas fa-sign-out-alt'></span></Link>
                </div>
            </nav>
        )
    } 
    else {
        return (
            <nav className='navbar'>
                <div className='nav-group'>
                <span onClick={()=> toggleSideBar()} id='menu-bars-btn' className='nav-items'><span className='fas fa-bars'></span></span>                </div>
                <div className='nav-group'>
                    {/* <Link to='/signup' className='nav-items'>Signup</Link> */}
                    <Link to='/login' className='nav-items'>Login</Link>
                </div>
            </nav>
        )
    }

    
}
