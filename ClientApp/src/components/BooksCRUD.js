import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';

import authService from '../services/auth.service';
import {authenticatedDelete, authenticatedGet, authenticatedPost} from "../services/axios.service";
import { authenticatedPut } from '../services/axios.service';

Modal.setAppElement('#root1'); // Set the app root element for accessibility

const BooksCRUD = () => {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState(null);
  const [editBook, setEditBook] = useState(null);
  const [deleteBook, setDeleteBook] = useState(null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const role = authService.getCurrentUserRole();
        setUserRole(role);
        fetchBooks();
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchData();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await authenticatedGet('/api/Books');
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching bookss:', error);
    }
  };

  const handleInputChange = (event) => {
    setNewBook({ ...newBook, [event.target.name]: event.target.value });
  };

  const handleAddBook = async () => {
    try {
      const response = await authenticatedPost('/api/Books', newBook);
      setBooks([...books, response.data]);
      setNewBook({ name: '', description: '', imageUrl: '' });
    } catch (error) {
      console.error('Error adding Book:', error);
    }
  };

  const handleDeleteBook = async (Book) => {
    try {
      await authenticatedDelete(`/api/Books/${Book.id}`);
      setBooks(books.filter((a) => a.id !== Book.id));
      setDeleteBook(null);
    } catch (error) {
      console.error('Error deleting Book:', error);
    }
  };

  const handleEditBook = async () => {
    try {
      await authenticatedPut(`/api/Books/${editBook.id}`, editBook);
      setBooks((prevBooks) =>
        prevBooks.map((a) => (a.id === editBook.id ? editBook : a))
      );
      setEditBook(null);
    } catch (error) {
      console.error('Error editing Book:', error);
    }
  };

  const openEditModal = (book) => {
    if (userRole === 'Admin') {
      setEditBook(book);
    }
  };

  const closeEditModal = () => {
    setEditBook(null);
  };

  const openCreateModal = () => {
    if (userRole === 'Admin') {
      setNewBook({ name: '', description: '', imageUrl: '' });
    }
  };

  const closeCreateModal = () => {
    setNewBook(null);
  };

  const openDeleteModal = (book) => {
    if (userRole === 'Admin') {
      setDeleteBook(book);
    }
  };

  const closeDeleteModal = () => {
    setDeleteBook(null);
  };

  return (
    <div>
      <h1>Book List</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Decription</th>
            <th>imageUrl</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.id}</td>
              <td>{book.name}</td>
              <td>{book.description}</td>
              <td>{book.imageUrl}</td>
              <td>
                {userRole === 'Admin' && (
                  <button onClick={() => openEditModal(book)}>Edit</button>
                )}
                {userRole === 'Admin' && (
                  <button onClick={() => openDeleteModal(book)}>Delete</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {userRole === 'Admin' && (
        <>
          <h2>Add Book</h2>
          <button onClick={openCreateModal}>Add</button>

          <Modal
            isOpen={!!editBook}
            onRequestClose={closeEditModal}
            contentLabel="Edit Book Modal"
          >
            <h2>Edit Book</h2>
            <div>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={editBook ? editBook.name : ''}
                onChange={(e) =>
                  setEditBook((prevBook) => ({
                    ...prevBook,
                    name: e.target.value
                  }))
                }
              />
            </div>
            <div>
              <label>Description:</label>
              <input
                type="text"
                name="description"
                value={editBook ? editBook.description : ''}
                onChange={(e) =>
                  setEditBook((prevBook) => ({
                    ...prevBook,
                    description: e.target.value
                  }))
                  
                }
              />
            </div>
            <div>
              <label>imageUrl:</label>
              <input
                type="text"
                name="imageUrl"
                value={editBook ? editBook.imageUrl : ''}
                onChange={(e) =>
                  setEditBook((prevBook) => ({
                    ...prevBook,
                    imageUrl: e.target.value
                  }))
                }
              />
            </div>
            <button onClick={handleEditBook}>Save</button>
            <button onClick={closeEditModal}>Close</button>
          </Modal>

          <Modal
            isOpen={!!deleteBook}
            onRequestClose={closeDeleteModal}
            contentLabel="Delete Book Modal"
          >
            <h2>Delete Book</h2>
            {deleteBook && (
              <p>Are you sure you want to delete {deleteBook.name}?</p>
            )}
            <button onClick={() => handleDeleteBook(deleteBook)}>Delete</button>
            <button onClick={closeDeleteModal}>Cancel</button>
          </Modal>

          <Modal
            isOpen={!!newBook}
            onRequestClose={closeCreateModal}
            contentLabel="Add Book Modal"
          >
            <h2>Add Book</h2>
            <div>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={newBook ? newBook.name : ''}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Description:</label>
              <input
                type="text"
                name="description"
                value={newBook ? newBook.description : ''}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>imageUrl:</label>
              <input
                type="text"
                name="imageUrl"
                value={newBook ? newBook.imageUrl : ''}
                onChange={handleInputChange}
              />
            </div>
            <button onClick={handleAddBook}>Create</button>
            <button onClick={closeCreateModal}>Close</button>
          </Modal>
        </>
      )}
    </div>
  );
};

export default BooksCRUD;