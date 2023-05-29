import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AuthorsCRUD = () => {
  const [authors, setAuthors] = useState([]);
  const [author, setAuthor] = useState(null);
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');

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

  const fetchAuthor = async (id) => {
    try {
      const response = await axios.get(`/api/Authors/${id}`);
      setAuthor(response.data);
      setName(response.data.name);
      setBio(response.data.bio);
    } catch (error) {
      console.error('Error fetching author:', error);
    }
  };

  const createAuthor = async () => {
    try {
      await axios.post('/api/Authors', { name, bio });
      fetchAuthors();
    } catch (error) {
      console.error('Error creating author:', error);
    }
  };

  const updateAuthor = async () => {
    try {
      await axios.put(`/api/Authors/${author.id}`, { name, bio });
      fetchAuthors();
      setAuthor(null);
      setName('');
      setBio('');
    } catch (error) {
      console.error('Error updating author:', error);
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

  const handleCreate = (e) => {
    e.preventDefault();
    createAuthor();
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    updateAuthor();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this author?')) {
      deleteAuthor(id);
    }
  };

  const handleEdit = (id) => {
    fetchAuthor(id);
  };

  return (
    <div>
      <h1>Author List</h1>
      <ul>
        {authors.map((author) => (
          <li key={author.id}>
            <Link to={`/authors/${author.id}`}>{author.name}</Link>
            <button onClick={() => handleDelete(author.id)}>Delete</button>
            <button onClick={() => handleEdit(author.id)}>Edit</button>
          </li>
        ))}
      </ul>

      {author && (
        <div>
          <h2>Edit Author</h2>
          <form onSubmit={handleUpdate}>
            <label>
              Name:
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>
            <label>
              Bio:
              <textarea value={bio} onChange={(e) => setBio(e.target.value)}></textarea>
            </label>
            <button type="submit">Update</button>
          </form>
        </div>
      )}

      {!author && (
        <div>
          <h2>Create Author</h2>
          <form onSubmit={handleCreate}>
            <label>
              Name:
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>
            <label>
              Bio:
              <textarea value={bio} onChange={(e) => setBio(e.target.value)}></textarea>
            </label>
            <button type="submit">Create</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AuthorsCRUD;
