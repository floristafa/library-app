import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AuthorsController = () => {
  const [authors, setAuthors] = useState([]);
  const [newAuthor, setNewAuthor] = useState({
    name: '',
    bio: ''
  });

  useEffect(() => {
    fetchAuthors();
  }, []);

  const fetchAuthors = async () => {
    try {
      const response = await axios.get('https://localhost:7261/api/Authors/');
      const authorViewModels = response.data;
      setAuthors(authorViewModels);
    } catch (error) {
      console.error(error);
    }
  };

  const createAuthor = async () => {
    try {
      const response = await axios.post('https://localhost:7261/api/Authors/', newAuthor);
      const createdAuthor = response.data;
      setAuthors([...authors, createdAuthor]);
      setNewAuthor({
        name: '',
        bio: '',
        // Reset other properties of the newAuthor object here
      });
    } catch (error) {
      console.error(error);
    }
  };

  const updateAuthor = async (id, updatedAuthor) => {
    try {
      await axios.put(`https://localhost:7261/api/Authors/${id}`, updatedAuthor);
      const updatedAuthors = authors.map((author) =>
        author.id === id ? updatedAuthor : author
      );
      setAuthors(updatedAuthors);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteAuthor = async (id) => {
    try {
      await axios.delete(`https://localhost:7261/api/Authors/${id}`);
      const filteredAuthors = authors.filter((author) => author.id !== id);
      setAuthors(filteredAuthors);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    setNewAuthor({
      ...newAuthor,
      [e.target.name]: e.target.value,
      [e.target.bio]: e.target.value,
    });
  };

  const renderAuthors = () => {
    return authors.map((author) => (
      <div key={author.id}>
        <h3>{author.name}</h3>
        <h3>{author.bio}</h3>
        <p>Book Count: {author.bookCount}</p>
        <button onClick={() => deleteAuthor(author.id)}>Delete</button>
      </div>
    ));
  };

  return (
    <div>
      <h2>Authors</h2>
      <div>
        <h3>Create New Author</h3>
        <input
          type="text"
          name="name"
          placeholder="Author Name"
          value={newAuthor.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="bio"
          placeholder="Author Bio"
          value={newAuthor.bio}
          onChange={handleInputChange}
        />
        {/* Add other input fields for other properties of AuthorViewModel */}
        <button onClick={createAuthor}>Create</button>
      </div>
      {renderAuthors()}
    </div>
  );
};

export default AuthorsController;
