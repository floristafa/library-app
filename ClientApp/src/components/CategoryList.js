import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CategoryList() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('/api/categories')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h2>Categories</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Priority</th>
          </tr>
        </thead>
        <tbody>
        {categories.map(category => (
          <tr key={category.id}>
              <td>{category.name}</td>
              <td>{category.priority}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  
};

export default CategoryList;
