import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AuthorList = () => {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    fetchAuthors();
  }, []);

  const fetchAuthors = async () => {
    try {
      const response = await axios.get('/api/Authors');
      setAuthors(response.data);
    } catch (error) {
      console.error('Error fetching authors:', error);
    }
  };

  const deleteAuthor = async (id) => {
    try {
      await axios.delete(`/api/Authors/${id}`);
      fetchAuthors();
    } catch (error) {
      console.error('Error deleting author:', error);
    }
  };

  return (
    <div>
      <h1>Author List</h1>
      <ul>
        {authors.map((author) => (
          <li key={author.id}>
            <Link to={`/authors/${author.id}`}>{author.name}</Link>
            <button onClick={() => deleteAuthor(author.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AuthorList;
