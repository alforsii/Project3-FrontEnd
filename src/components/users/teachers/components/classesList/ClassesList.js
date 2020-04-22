import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import Pagination from './Pagination';

import './ClassesList.css';

export default class ClassList extends Component {
  state = {
    currentPage: 1,
    postsPerPage: 5,
  };
  toggleHiddenText = e => {
    e.target.previousElementSibling.classList.toggle('show');
    if (e.target.innerText === 'show more') e.target.innerText = 'show less';
    else if (e.target.innerText === 'show less')
      e.target.innerText = 'show more';
  };
  // Change page
  paginate = pageNumber => this.setState({ currentPage: pageNumber });

  render() {
    const { currentPage, postsPerPage } = this.state;
    const { classes, search, archive, searchForClass, 
      toggleClassNavDropdown, removeClass, removeArchiveClass  } = this.props
    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPageClasses = classes?.slice(
      indexOfFirstPost,
      indexOfLastPost
    );

    return (
      <div className="main-classes-list">
        <div className="search-input-div">
          {search && (
            <input
              id="searchClass"
              onChange={searchForClass}
              name="searchClass"
              placeholder="Search - Type class name..."
            />
          )}
        </div>
        <table className="classList-table">
          <thead>
            <tr>
              <th>Classrooms</th>
              <th>Grade</th>
              <th>Students</th>
              <th className='bg-screen-display'>Description</th>
              <th >From</th>
              <th >To</th>
              <th>More</th>
            </tr>
          </thead>

          <tbody>
            {currentPageClasses?.map(currClass => {
              const {
                _id,
                name,
                grade,
                students,
                description,
                schoolYearStart,
                schoolYearEnd,
              } = currClass;
              return (
                <tr key={_id}>
                  <td>
                    <Link
                      to={{
                        pathname: `/teachers-page/class/${_id}`,
                        state: {
                          currClass,
                        },
                      }}
                    >
                      {name.length < 22 ? name : `${name.slice(0, 22)}...`}
                    </Link>
                  </td>
                  <td>{grade}</td>
                  <td>{students.length}</td>
                  <td className="description bg-screen-display">
                    {description?.length < 30 ? (
                      description
                    ) : (
                      <>
                        {`${description?.slice(0, 30)}`}
                        <span className="content">
                          {' '}
                          {description?.slice(30)}
                        </span>
                        <span
                          onClick={this.toggleHiddenText}
                          className="collapsible"
                        >
                          {' '}
                          show more
                        </span>
                      </>
                    )}
                  </td>
                  <td >
                    {schoolYearStart
                      ? `${
                          moment(schoolYearStart).format('ll').split(' ')[0]
                        } ${moment(schoolYearStart).format('ll').split(' ')[2]}`
                      : ''}
                  </td>
                  <td >
                    {schoolYearEnd
                      ? `${moment(schoolYearEnd).format('ll').split(' ')[0]} ${
                          moment(schoolYearEnd).format('ll').split(' ')[2]
                        }`
                      : ''}
                  </td>

                  <td>
                    <div className="dropdown3">
                      <button
                        className="dropbtn3"
                        onClick={toggleClassNavDropdown}
                      >
                        <i className="fas fa-ellipsis-h"></i>
                      </button>
                      {archive ? (
                        <div className="dropdown-content3 align-right classNavDropdown">
                          <p>Archive</p>
                          <hr
                            style={{
                              width: '100%',
                              borderWidth: '0.4px',
                              borderRadius: 0,
                            }}
                          />
                          <p onClick={() => removeArchiveClass(_id)}>
                            Remove completely
                          </p>
                        </div>
                      ) : (
                        <div className="dropdown-content3 align-right classNavDropdown">
                          <h4>{name}</h4>
                          <p>About</p>
                          <p>
                          <Link to={{
                            pathname: '/classes/add-new',
                            state: {
                              currClass
                            }
                          }}>Edit</Link>
                          </p>
                          <hr
                            style={{
                              width: '100%',
                              borderWidth: '0.4px',
                              borderRadius: 0,
                            }}
                          />
                          <p onClick={() => removeClass(_id)}>
                            Archive
                          </p>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={classes?.length}
          paginate={this.paginate}
        />
      </div>
    );
  }
}
