import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const AuthorDetails = () => {
  const { id } = useParams();
  const [author, setAuthor] = useState(null);

  useEffect(() => {
    fetchAuthor();
  }, []);

  const fetchAuthor = async () => {
    try {
      const response = await axios.get(`/api/Authors/${id}`);
      setAuthor(response.data);
    } catch (error) {
      console.error('Error fetching author:', error);
    }
  };

  const deleteAuthor = async () => {
    try {
      await axios.delete(`/api/Authors/${id}`);
      setAuthor(null);
    } catch (error) {
      console.error('Error deleting author:', error);
    }
  };

  if (!author) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{author.name}</h1>
      <p>Email: {author.email}</p>
      <p>Bio: {author.bio}</p>
      <button onClick={deleteAuthor}>Delete</button>
    </div>
  );
};

export default AuthorDetails;
