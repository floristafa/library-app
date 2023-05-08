import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AuthorList = () => {
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
      <ul>
        {authors.map(author => (
          <li key={author.id}>
            <h3>{author.name}</h3>
            <p>{author.bio}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AuthorList;
