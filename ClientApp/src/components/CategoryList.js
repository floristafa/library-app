import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CategoryList = () => {
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
      <ul>
        {categories.map(category => (
          <li key={category.id}>
            {category.name} ({category.bookCount})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
