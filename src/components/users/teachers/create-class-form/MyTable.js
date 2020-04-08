import React from 'react';

export default function UserTable({users}) {

  return (

      <table  aria-label="simple table">
        <thead>
          <tr>
            <td>User ID</td>
            <td>First Name</td>
            <td>Last Name</td>
            <td>Email</td>
            <td>City</td>
            <td>Occupation</td>
            <td>Bio</td>
          </tr>
        </thead>

             { users.map(user => {
                 const {id, firstName, lastName, email, city, occupation, bio} = user
                 return (
        <tbody key={id}>
                    <tr >
                        <td>{id}</td>
                        <td>{firstName}</td>
                        <td>{lastName}</td>
                        <td>{email}</td>
                        <td>{city}</td>
                        <td>{occupation}</td>
                        <td>{bio}</td>
                     </tr>
        </tbody>
                 )
             })}
      </table>

  );
}
