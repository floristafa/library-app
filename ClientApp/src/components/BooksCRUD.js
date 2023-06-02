import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';

import authService from '../services/auth.service';
import { authenticatedDelete, authenticatedGet, authenticatedPost } from "../services/axios.service";
import { authenticatedPut } from '../services/axios.service';
import "../table.css"

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
      setNewBook({ name: '', description: '', imageUrl: '', authorId: ''});
    } 
    catch (error) {
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
    if ((userRole === 'Admin')||(userRole === 'User')) {
      setEditBook(book);
    }
  };

  const closeEditModal = () => {
    setEditBook(null);
  };

  const openCreateModal = () => {
    if ((userRole === 'Admin')||(userRole === 'User')) {
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
      <div>
        <h1 className="page-title">Book List</h1>
        <div style={{ marginBottom: '10px' }}>
          <h2 style={{ display: 'inline-block', marginRight: '20px' }}>Add new Book</h2>
          <button className="create-button" onClick={openCreateModal}>Add</button>
        </div>
        <table className="custom-table">
          <thead className="table-head">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Decription</th>
              <th>imageUrl</th>
              <th>authorId</th>
              
              
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
                <td>{book.authorId}</td>
                
                <td>
                  {((userRole === 'Admin')||(userRole === 'User')) && (
                    <div className="action-buttons">
                      <button className="edit-button" onClick={() => openEditModal(book)}>Edit</button>
                      <button className="delete-button" onClick={() => openDeleteModal(book)}>Delete</button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>



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
        <div>
          <label>authorId:</label>
          <input
            type="text"
            name="authorId"
            value={editBook ? editBook.authorId : ''}
            onChange={(e) =>
              setEditBook((prevBook) => ({
                ...prevBook,
                authorId: e.target.value
              }))
            }
          />
        </div>
        <button className="create-button" onClick={handleEditBook}>Save</button>
        <button className="delete-button" onClick={closeEditModal}>Close</button>
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
        <button className="delete-button" onClick={() => handleDeleteBook(deleteBook)}>Delete</button>
        <button className="edit-button" onClick={closeDeleteModal}>Cancel</button>
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
        <div>
          <label>authorId:</label>
          <input
            type="text"
            name="authorId"
            value={newBook ? newBook.authorId : ''}
            onChange={handleInputChange}
          />
        </div>
       
        <button className="create-button" onClick={handleAddBook}>Create</button>
        <button className="delete-button" onClick={closeCreateModal}>Close</button>
      </Modal>

    </div>
  );
};

export default BooksCRUD;