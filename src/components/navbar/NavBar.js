import React from 'react'
import { Link,  NavLink } from 'react-router-dom';
import toggleSideBar from '../sidebar/toggle'
import './NavBar.css'

export default function NavBar({loggedIn, userLogout}) {

    if(loggedIn) {
        return (
            <nav className='navbar'>
                <div className='nav-group'>
                    <Link to='/' className='nav-items'><span className='fas fa-school'></span></Link>
                    
                    <Link to='/' className='nav-items'><span className='fas fa-bell'></span></Link>
                    <Link to='/message-board' className='nav-items'><span className='fas fa-envelope'></span></Link>
                    <Link to='/' className='nav-items'><span className='fas fa-moon'></span></Link>
                    <Link to='/' className='nav-items'><span className='fab fa-github'></span></Link>
                </div>
                <div className='nav-group'>
                    <Link to='/' className='nav-items'>Home</Link>
                    <Link to='/about' className='nav-items'>About</Link>
                    <Link to='/projects' className='nav-items'>Projects</Link>
                    <NavLink exact to="/user-update" className='nav-items' activeStyle={{fontWeight: 'bold', color: '#fff'}} activeClassName="selected">FAQs</NavLink>
                    <Link to='/contacts' className='nav-items'>Contacts</Link>
                    <Link to='/' className='nav-items' onClick={userLogout} >Logout</Link>
                    <span onClick={()=> toggleSideBar()} id='menu-bars-btn' className='nav-items'><span className='fas fa-bars'></span></span>
                </div>
            </nav>
        )
    } 
    else {
        return (
            <nav className='navbar'>
                <div className='nav-group'>
                    <Link to='/' className='nav-items'><span className='fas fa-school'></span></Link>
                </div>
                <div className='nav-group'>
                    {/* <Link to='/signup' className='nav-items'>Signup</Link> */}
                    <Link to='/login' className='nav-items'>Login</Link>
                </div>
            </nav>
        )
    }

    
}
