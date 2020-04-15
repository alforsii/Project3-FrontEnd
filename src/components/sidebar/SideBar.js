import React, { Component } from 'react'
import { Link } from 'react-router-dom';

import SwitchModeButton from './switchModeButton/SwitchButton'
import './SideBar.css'

export class SideBar extends Component {

    render() {
        // const { firstName, lastName, path} = this.props.user
        const { user, userLogout, loggedIn} = this.props
        return (
           <>
                {/* <div id='main-sidebar' className='main-sidebar'></div> */}
                <div id='side-bar2' className='side-bar'>
                {loggedIn && 
                <div className='user-sidebar'>
                    <img className='profile-pic' src={user?.path} alt={user?.firstName}/>
                    <h4> {user?.firstName} {user?.lastName} </h4>
                    <h4>Switch mode<SwitchModeButton/></h4>
                    <hr/>
                </div>
                }
                <div className='sections'>
                    <ul>
                        { loggedIn?<>
                        <Link to='/'><li><span className='fas fa-chalkboard-teacher'></span><span>Dashboard</span></li></Link> 
                        <Link to='/'><li><span className='fas fa-users'></span><span>Teachers</span></li></Link>
                        <Link to='/'><li><span className='fas fa-users'></span><span>Parents</span></li></Link>
                        <Link to='/'><li><span className='fas fa-users'></span><span>Students</span></li></Link>
                        <Link to='/'><li><span className='fas fa-lock'></span><span>Authentication</span></li></Link>
                        <Link to='/'><li><span className='fas fa-user'></span><span>Account</span></li></Link>
                        <Link to='/settings/update-profile'><li><span className='fas fa-cog'></span><span>Settings</span></li></Link>
                        <Link to='/' onClick={userLogout}><li><span className='fas fa-sign-out-alt'></span><span>Logout</span></li></Link>
                        </>:
                        <>
                        <Link to='/login'><li><span className='fas fa-sign-in-alt'></span><span>Login</span></li></Link>
                        <Link to='/'><li><span className='fas fa-user-plus'></span><span>Signup</span></li></Link>
                        </>
                        }
                    </ul>
                </div>
            </div>
           </>
            
        )
    }
}



export default SideBar
