import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CategoryForm = ({ id }) => {
  const [name, setName] = useState('');
  const [priority, setPriority] = useState(0);

  useEffect(() => {
    if (id) {
      axios.get(`/api/categories/${id}`)
        .then(response => {
          setName(response.data.name);
          setPriority(response.data.priority);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [id]);

  const handleSubmit = event => {
    event.preventDefault();
    const category = { name, priority };
    if (id) {
      axios.put(`/api/categories/${id}`, category)
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      axios.post('/api/categories', category)
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  return (
    <div>
      <h2>{id ? 'Edit' : 'Add'} Category</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={event => setName(event.target.value)} />
        </div>
        <div>
          <label>Priority:</label>
          <input type="number" value={priority} onChange={event => setPriority(parseInt(event.target.value))} />
        </div>
        <button type="submit">{id ? 'Save' : 'Create'}</button>
      </form>
    </div>
  );
};

export default CategoryForm;
