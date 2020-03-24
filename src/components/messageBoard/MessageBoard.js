import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import data from '../../data/users'
import './MessageBoard.css'

const users = [...data].map((user, i) => {
    return { ...user, id: i+1 }
})
console.log("Output for: users", users)

export class MessageBoard extends Component {
    render() {
        return (
            <div>
                <div className='main-message-board'>
                <div className='nav-sidebar'>
                    <div className='sidebar-icons'>
                        <span><i className='fas fa-feather-alt'></i></span>
                        <span><i className="fas fa-dove"></i></span>
                        <span><i className="fas fa-edit"></i></span>
                        <span><i className="fas fa-user"></i></span>
                        <span><i className="fab fa-dropbox"></i></span>
                        <span><i className="fas fa-microphone"></i></span>
                        <span><i className="fas fa-microphone-slash"></i></span>
                        <span><i className="fas fa-award"></i></span>
                        <span><i className="fas fa-crop"></i></span>
                        <span><i className="fas fa-cog"></i></span>
                    </div>
                </div>

                <div className='users-list'>
                            <div id='search-div'> 
                                <input type='search' name='search' id='search-user' placeholder='Search user...' />
                                <span id='search-icon'><i className="fas fa-search"></i></span>
                            </div>

                            <div  className="user-div">
                                <div className="user">
                                    <Link to='/message-board' href={`/user-details/`}>
                                        <div className="user-image-div">
                                            <img className="user-image" src='' alt='' />
                                        </div>
                                    </Link>
                                    <h5  className="username" href={`/user-details/`}>
                                    name
                                    </h5>
                                </div>
                            </div>
                    <div className='main-user-div'>
                    { users.map(user => {
                        return (
                            <div key={user.id} className="user-div">
                                <div className="user user1">
                                    <Link to='/message-board' href={`/user-details/${user.id}`}>
                                        <div className="user-image-div">
                                            <img className="user-image" src={user.path} alt={user.username} />
                                        </div>
                                    </Link>
                                    <div>
                                        <h5 className="username" href={`/user-details/${user.id}`}>
                                        {user.firstName} {user.lastName}
                                        </h5>
                                        <p>Some message will be here...</p>
                                    </div>
                                    <span id='msg-created-time'>12:00 pm</span>
                                </div>
                            </div>
                        )
                    })}
                    </div>
                </div>

                <div className='message-board'>
                    <div className='message-board-nav'>
                            <div  className="user-div">
                                <div className="user">
                                    <Link to='/message-board' href={`/user-details/`}>
                                        <div className="user-image-div">
                                            <img className="user-image" src={users[0].path} alt='' />
                                        </div>
                                    </Link>
                                    <div>
                                        <h5 className="username" href={`/user-details/`}>
                                        {users[0].firstName} {users[0].lastName}
                                        </h5>
                                        <p>Some message will be here...</p>
                                    </div>
                                </div>
                            </div>
                            <div >
                                <span id='search-icon2'><i className="fas fa-search"></i></span>
                                <span><i className="fas fa-user-plus"></i></span>
                                {/* <span><i class="fas fa-ellipsis-v"></i></span> */}
                                <span><i class="fas fa-ellipsis-h"></i></span>
                            </div>
                    </div>

                    <div className='message-board-body'></div>

                    <div className='message-board-footer'>
                        <input id='message-input' placeholder='Type your message...'/>
                        <div className=''>
                            <span className='icons telegram'>
                                <i class="fas fa-smile"></i>
                            </span>
                            <span className='icons telegram'>
                                <i class="fas fa-paperclip"></i>
                            </span>
                            <span className='icons telegram'>
                                <i className='fab fa-telegram'></i>
                            </span>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        )
    }
}

export default MessageBoard
