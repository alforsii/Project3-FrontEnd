import React from 'react'
import { Link } from 'react-router-dom';

export default function SideNavbar() {
    return (
        <>
             <div className="sidebar-icons">
              <Link to="/" className="">
                <span>
                  <i className="fas fa-feather-alt"></i>
                </span>
              </Link>
              <Link to="/" className="">
                <span>
                  <i className="fas fa-dove"></i>
                </span>
              </Link>
              <Link to="/" className="">
                <span>
                  <i className="fas fa-edit"></i>
                </span>
              </Link>
              <Link to="/" className="">
                <span>
                  <i className="fas fa-user"></i>
                </span>
              </Link>
              <Link to="/" className="">
                <span>
                  <i className="fab fa-dropbox"></i>
                </span>
              </Link>
              <Link to="/message-board" className="">
                <span className="fas fa-comment-dots"></span>
              </Link>
              <Link to="/" className="">
                <span>
                  <i className="fas fa-award"></i>
                </span>
              </Link>
              <Link to="/" className="">
                <span>
                  <i className="fas fa-crop"></i>
                </span>
              </Link>
              <Link to="/" className="">
                <span>
                  <i className="fas fa-cog"></i>
                </span>
              </Link>
            </div>
        </>
    )
}
