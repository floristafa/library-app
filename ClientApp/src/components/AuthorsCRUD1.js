import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';

import authService from '../services/auth.service';
import { authenticatedDelete, authenticatedGet, authenticatedPost } from "../services/axios.service";
import { authenticatedPut } from '../services/axios.service';
import "../table.css"

Modal.setAppElement('#root'); // Set the app root element for accessibility

const AuthorsCRUD = () => {
  const [authors, setAuthors] = useState([]);
  const [newAuthor, setNewAuthor] = useState(null);

  const [editAuthor, setEditAuthor] = useState(null);
  const [deleteAuthor, setDeleteAuthor] = useState(null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const role = authService.getCurrentUserRole();
        setUserRole(role);
        fetchAuthors();
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchData();
  }, []);

  const fetchAuthors = async () => {
    try {
      const response = await authenticatedGet('/api/Authors');
      setAuthors(response.data);
    } catch (error) {
      console.error('Error fetching authors:', error);
    }
  };

  const handleInputChange = (event) => {
    setNewAuthor({ ...newAuthor, [event.target.name]: event.target.value });
  };

  const handleAddAuthor = async () => {
    try {
      const response = await authenticatedPost('/api/Authors', newAuthor);
      setAuthors([...authors, response.data]);
      setNewAuthor({ name: '', bio: '' });
    } catch (error) {
      console.error('Error adding author:', error);
    }
  };

  const handleDeleteAuthor = async (author) => {
    try {
      await authenticatedDelete(`/api/Authors/${author.id}`);
      setAuthors(authors.filter((a) => a.id !== author.id));
      setDeleteAuthor(null);
    } catch (error) {
      console.error('Error deleting author:', error);
    }
  };

  const handleEditAuthor = async () => {
    try {
      await authenticatedPut(`/api/Authors/${editAuthor.id}`, editAuthor);
      setAuthors((prevAuthors) =>
        prevAuthors.map((a) => (a.id === editAuthor.id ? editAuthor : a))
      );
      setEditAuthor(null);
    } catch (error) {
      console.error('Error editing author:', error);
    }
  };

  const openEditModal = (author) => {
    if (userRole === 'Admin') {
      setEditAuthor(author);
    }
  };

  const closeEditModal = () => {
    setEditAuthor(null);
  };

  const openCreateModal = () => {
    if (userRole === 'Admin') {
      setNewAuthor({ name: '', bio: '' });
    }
  };

  const closeCreateModal = () => {
    setNewAuthor(null);
  };

  const openDeleteModal = (author) => {
    if (userRole === 'Admin') {
      setDeleteAuthor(author);
    }
  };

  const closeDeleteModal = () => {
    setDeleteAuthor(null);
  };

  return (
    <div>
      <div>
        <h1 className="page-title">Author List</h1>
        {userRole === 'Admin' && (
        <div style={{ marginBottom: '10px' }}>
          <h2 style={{ display: 'inline-block', marginRight: '20px' }}>Add new Author</h2>
          
            <button className="create-button" onClick={openCreateModal}>Add</button>
          
        </div>
        )}
        <table className="custom-table">
          <thead className="table-head">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Bio</th>
              {userRole === 'Admin' && ( // Render the Actions column header if userRole is 'Admin'
                <th>Actions</th>
              )}
            </tr>
          </thead>
          <tbody>
            {authors.map((author) => (
              <tr key={author.id}>
                <td>{author.id}</td>
                <td>{author.name}</td>
                <td>{author.bio}</td>
                {userRole === 'Admin' && ( // Render the Actions column header if userRole is 'Admin'


                  <td>
                    {userRole === 'Admin' && (
                      <div className="action-buttons">
                        <button className="edit-button" onClick={() => openEditModal(author)}>
                          Edit
                        </button>
                      

                        <button className="delete-button" onClick={() => openDeleteModal(author)}>
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={!!editAuthor}
        onRequestClose={closeEditModal}
        contentLabel="Edit Author Modal"
      >
        <h2>Edit Author</h2>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={editAuthor ? editAuthor.name : ''}
            onChange={(e) =>
              setEditAuthor((prevAuthor) => ({
                ...prevAuthor,
                name: e.target.value
              }))
            }
          />
        </div>
        <div>
          <label>Bio:</label>
          <input
            type="text"
            name="bio"
            value={editAuthor ? editAuthor.bio : ''}
            onChange={(e) =>
              setEditAuthor((prevAuthor) => ({
                ...prevAuthor,
                bio: e.target.value
              }))
            }
          />
        </div>
        <button className="create-button" onClick={handleEditAuthor}>Save</button>
        <button className="delete-button" onClick={closeEditModal}>Close</button>
      </Modal>

      <Modal
        isOpen={!!deleteAuthor}
        onRequestClose={closeDeleteModal}
        contentLabel="Delete Author Modal"
      >
        <h2>Delete Author</h2>
        {deleteAuthor && (
          <p>Are you sure you want to delete {deleteAuthor.name}?</p>
        )}
        <button className="delete-button" onClick={() => handleDeleteAuthor(deleteAuthor)}>Delete</button>
        <button className="edit-button" onClick={closeDeleteModal}>Cancel</button>
      </Modal>

      <Modal
        isOpen={!!newAuthor}
        onRequestClose={closeCreateModal}
        contentLabel="Add Author Modal"
      >
        <h2>Add Author</h2>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={newAuthor ? newAuthor.name : ''}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Bio:</label>
          <input
            type="text"
            name="bio"
            value={newAuthor ? newAuthor.bio : ''}
            onChange={handleInputChange}
          />
        </div>
        <button className="create-button" onClick={handleAddAuthor}>Create</button>
        <button className="delete-button" onClick={closeCreateModal}>Close</button>
      </Modal>
    </div>
  );
};

export default AuthorsCRUD;
