import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';

const AuthorForm = () => {
  const history = useHistory();
  const { id } = useParams();
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (id) {
        await axios.put(`/api/Authors/${id}`, { name, bio });
      } else {
        await axios.post('/api/Authors', { name, bio });
      }
      history.push('/authors');
    } catch (error) {
      console.error('Error saving author:', error);
    }
  };

  return (
    <div>
      <h1>{id ? 'Edit Author' : 'Create Author'}</h1>
      <form onSubmit={handleSubmit}>
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
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          ></textarea>
        </label>
        <button type="submit">{id ? 'Update' : 'Create'}</button>
      </form>
    </div>
  );
};

export default AuthorForm;
