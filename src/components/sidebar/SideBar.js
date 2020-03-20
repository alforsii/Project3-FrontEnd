import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import './SideBar.css'
import './toggle'


export class SideBar extends Component {
    render() {
        return (
           <>
             <div id='main-sidebar' className='main-sidebar'></div>
                <div id='side-bar' className='side-bar'>
                <div className='user'>
                    <img src='' alt=''/>
                    <h4><span className='fas fa-user-circle'></span></h4>
                    <h4>User name</h4>
                    <h4>User title</h4>
                    <hr/>
                </div>
                <div className='sections'>
                    <ul>
                        <Link to='/'><li><span className='fas fa-chalkboard-teacher'></span><span>Dashboard</span></li></Link> 
                        <Link to='/'><li><span className='fas fa-users'></span><span>Teachers</span></li></Link>
                        <Link to='/'><li><span className='fas fa-users'></span><span>Students</span></li></Link>
                        <Link to='/'><li><span className='fas fa-lock'></span><span>Authentication</span></li></Link>
                        <Link to='/'><li><span className='fas fa-graduation-cap'></span><span>Classes</span></li></Link>
                        <Link to='/'><li><span className='fas fa-graduation-cap'></span><span>Story</span></li></Link>
                        <Link to='/'><li><span className='fas fa-graduation-cap'></span><span>Subjects</span></li></Link>
                        <Link to='/'><li><span className='fas fa-graduation-cap'></span><span>Subjects</span></li></Link>
                        <Link to='/'><li><span className='fas fa-graduation-cap'></span><span>Subjects</span></li></Link>
                        <Link to='/'><li><span className='fas fa-user'></span><span>Account</span></li></Link>
                        <Link to='/'><li><span className='fas fa-cog'></span><span>Settings</span></li></Link>
                    </ul>
                </div>
            </div>
           </>
            
        )
    }
}



export default SideBar