import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment'

import Pagination from './Pagination'

import './ClassesList.css'

export default class ClassList extends Component {
  state = {
    currentPage: 1,
    postsPerPage: 10,
    classes: this.props.classes
  }
toggleHiddenText = (e) => {
  e.target.previousElementSibling.classList.toggle('show')
  if(e.target.innerText === 'show more') e.target.innerText = 'show less'
  else if(e.target.innerText === 'show less') e.target.innerText = 'show more'
}
// Change page
paginate = pageNumber => this.setState({currentPage: pageNumber})

  render() {
    const { currentPage, postsPerPage } = this.state;
      // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPageClasses = this.props.classes?.slice(indexOfFirstPost, indexOfLastPost);
  
    return (
        <div className='main-classes-list'>
          <div className='search-input-div'>
          { this.props.search ? <input id='searchClass' name='searchClass' placeholder='Search for class...' />
          :<h2 style={{margin: '10px'}}>All Classes</h2>}
          </div>
          <table className="classList-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Grade</th>
                <th>#Students</th>
                {/* <th>Creator</th> */}
                <th>Description</th>
                <th>From</th>
                <th>To</th>
                <th>More</th>
              </tr>
            </thead>

            <tbody>
            {currentPageClasses?.map(currClass => {
              const { _id, name, grade, author, students, description,schoolYearStart,schoolYearEnd } = currClass;
              return (
                  <tr  key={_id}>
                    <td>
                      <Link
                        to={{
                          pathname: `/teachers-page/class/${_id}`,
                          state: {
                            currClass
                          },
                        }}
                      >
                        {name.length < 22? name 
                    : `${name.slice(0,22)}...`}
                      </Link>
                    </td>
                    <td>{grade}</td>
                    <td>{students.length}</td>
                    {/* <td>{author.firstName} {author.lastName} </td> */}
                    <td className='description'>
                      {description.length < 30? description 
                    : <>
                    {`${description.slice(0,30)}`}
                    <span  className='content'> {description.slice(31)}</span>
                    <span onClick={this.toggleHiddenText} className='collapsible'> show more</span>
                    </>
                    }
                    </td>
                    <td>{schoolYearStart? `${moment(schoolYearStart).format('ll').split(' ')[0]} ${moment(schoolYearStart).format('ll').split(' ')[2]}`:''}</td>
                    <td>{schoolYearEnd? `${moment(schoolYearEnd).format('ll').split(' ')[0]} ${moment(schoolYearEnd).format('ll').split(' ')[2]}`:''}</td>
                    {/* <td><span><i className="fas fa-caret-down"></i></span></td> */}
                    <td><span><i className="fas fa-ellipsis-h"></i></span></td>
                  </tr>
              );
            })}


            </tbody>
          </table>

                <Pagination
                postsPerPage={postsPerPage}
                totalPosts={this.props.classes?.length}
                paginate={this.paginate}/>

        </div>
    );
  }
}
