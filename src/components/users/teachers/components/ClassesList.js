import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class ClassList extends Component {
  
  render() {
    const { classes } = this.props;
    return (
      <div>
        <React.Fragment>
          <h2>All classes list</h2>
          <table aria-label="classList-table">
            <thead>
              <tr>
                <td>Name</td>
                <td>Grade</td>
                <td>#Students</td>
                <td>Creator</td>
                <td>Description</td>
                <td>More</td>
              </tr>
            </thead>

            {classes?.map(currClass => {
              const { _id, name, grade, path, author, students, description } = currClass;
              return (
                <tbody key={_id}>
                  <tr>
                    {/* <td> <img src={path} style={{width: '40px'}} alt=''/> </td> */}
                    <td>
                      <Link
                        to={{
                          pathname: `/class/${_id}`,
                          state: {
                            currClass
                          },
                        }}
                      >
                        <img
                          src={path}
                          style={{ width: '40px', padding: '0 5px' }}
                          alt=""
                        />
                        {name}
                      </Link>
                    </td>
                    <td>{grade}</td>
                    <td>{students.length}</td>
                    <td>{author.firstName} {author.lastName} </td>
                    <td>{description}</td>
                    <td><span><i className="fas fa-ellipsis-v"></i></span></td>
                  </tr>
                </tbody>
              );
            })}
          </table>
        </React.Fragment>
      </div>
    );
  }
}
