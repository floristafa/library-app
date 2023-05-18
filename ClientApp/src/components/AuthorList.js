import React, { useState, useEffect } from 'react';
import axios from 'axios';


function AuthorList() {
  const [authors, setAuthors] = useState([]);


  useEffect(() => {
    axios.get('/api/authors')
      .then(response => {
        setAuthors(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h2>Authors</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Bio</th>
          </tr>
        </thead>
        <tbody>
          {authors.map((author) => (
            <tr key={author.id}>
              <td>{author.name}</td>
              <td>{author.bio}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  
};

export default AuthorList;
