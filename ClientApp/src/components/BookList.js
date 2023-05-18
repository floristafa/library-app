import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function BookList() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const result = await axios('/api/Books');
      setBooks(result.data);
    };
    fetchBooks();
  }, []);

  return (
    <div>
      <h2>Books</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Author</th>
            <th>Categories</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.name}</td>
              <td>{book.author.name}</td>
              <td>
                {book.categories.map((category) => (
                  <span key={category.id}>{category.name} </span>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link className='btn btn-primary' to='/add-book'>
        Add Book
      </Link>
    </div>
  );
}

export default BookList;
