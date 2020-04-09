import React from 'react';
import { Link } from 'react-router-dom';

export default function UserTable({classes}) {

  return (

      <table  aria-label="simple table">
        <thead>
          <tr>
            <td>Class ID</td>
            <td>Name</td>
            <td>Grade</td>
            <td>Image</td>
            <td>Description</td>
          </tr>
        </thead>

             { classes?.map(currClass => {
                 const {_id,name, grade, image, description} = currClass
                 return (
        <tbody key={_id}>
                    <tr >
                        <td>{_id}</td>
                        <td><Link to={{
                          pathname: `/class/${_id}`,
                          state: {
                            currClass
                          }
                        }}>{name}</Link></td>
                        <td>{grade}</td>
                        <td>{image}</td>
                        <td>{description}</td>
                     </tr>
        </tbody>
                 )
             })}
      </table>

  );
}
