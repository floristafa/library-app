import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AuthorForm = ({ authorId, onSubmit }) => {
  const [author, setAuthor] = useState({
    name: '',
    bio: ''
  });

  useEffect(() => {
    if (authorId) {
      axios.get(`/api/authors/${authorId}`)
        .then(response => {
          setAuthor(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [authorId]);

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit(author);
  };

  const handleChange = event => {
    setAuthor({ ...author, [event.target.name]: event.target.value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" value={author.name} onChange={handleChange} required />
      </div>
      <div>
        <label htmlFor="bio">Bio</label>
        <textarea id="bio" name="bio" value={author.bio} onChange={handleChange} required />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default AuthorForm;
