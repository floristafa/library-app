import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';

import authService from '../services/auth.service';
import {authenticatedDelete, authenticatedGet, authenticatedPost} from "../services/axios.service";
import { authenticatedPut } from '../services/axios.service';

Modal.setAppElement('#root2'); // Set the app root element for accessibility

const CategoriesCRUD = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState(null);
  const [editCategory, setEditCategory] = useState(null);
  const [deleteCategory, setDeleteCategory] = useState(null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const role = authService.getCurrentUserRole();
        setUserRole(role);
        fetchCategories();
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchData();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await authenticatedGet('/api/Categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching Categories:', error);
    }
  };

  const handleInputChange = (event) => {
    setNewCategory({ ...newCategory, [event.target.name]: event.target.value });
  };

  const handleAddCategory = async () => {
    try {
      const response = await authenticatedPost('/api/Categories', newCategory);
      setCategories([...categories, response.data]);
      setNewCategory({ name: '', priority: '' });
    } catch (error) {
      console.error('Error adding Category:', error);
    }
  };

  const handleDeleteCategory = async (Category) => {
    try {
      await authenticatedDelete(`/api/Categories/${Category.id}`);
      setCategories(categories.filter((a) => a.id !== Category.id));
      setDeleteCategory(null);
    } catch (error) {
      console.error('Error deleting Category:', error);
    }
  };

  const handleEditCategory = async () => {
    try {
      await authenticatedPut(`/api/Categories/${editCategory.id}`, editCategory);
      setCategories((prevCategories) =>
        prevCategories.map((a) => (a.id === editCategory.id ? editCategory : a))
      );
      setEditCategory(null);
    } catch (error) {
      console.error('Error editing Category:', error);
    }
  };

  const openEditModal = (Category) => {
    if (userRole === 'Admin') {
      setEditCategory(Category);
    }
  };

  const closeEditModal = () => {
    setEditCategory(null);
  };

  const openCreateModal = () => {
    if (userRole === 'Admin') {
      setNewCategory({ name: '', priority: '' });
    }
  };

  const closeCreateModal = () => {
    setNewCategory(null);
  };

  const openDeleteModal = (Category) => {
    if (userRole === 'Admin') {
      setDeleteCategory(Category);
    }
  };

  const closeDeleteModal = () => {
    setDeleteCategory(null);
  };

  return (
    <div>
      <h1>Category List</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Priority</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((Category) => (
            <tr key={Category.id}>
              <td>{Category.id}</td>
              <td>{Category.name}</td>
              <td>{Category.priority}</td>
              <td>
                {userRole === 'Admin' && (
                  <button onClick={() => openEditModal(Category)}>Edit</button>
                )}
                {userRole === 'Admin' && (
                  <button onClick={() => openDeleteModal(Category)}>Delete</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {userRole === 'Admin' && (
        <>
          <h2>Add Category</h2>
          <button onClick={openCreateModal}>Add</button>

          <Modal
            isOpen={!!editCategory}
            onRequestClose={closeEditModal}
            contentLabel="Edit Category Modal"
          >
            <h2>Edit Category</h2>
            <div>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={editCategory ? editCategory.name : ''}
                onChange={(e) =>
                  setEditCategory((prevCategory) => ({
                    ...prevCategory,
                    name: e.target.value
                  }))
                }
              />
            </div>
            <div>
              <label>Priority:</label>
              <input
                type="text"
                name="priority"
                value={editCategory ? editCategory.priority : ''}
                onChange={(e) =>
                  setEditCategory((prevCategory) => ({
                    ...prevCategory,
                    priority: e.target.value
                  }))
                }
              />
            </div>
            <button onClick={handleEditCategory}>Save</button>
            <button onClick={closeEditModal}>Close</button>
          </Modal>

          <Modal
            isOpen={!!deleteCategory}
            onRequestClose={closeDeleteModal}
            contentLabel="Delete Category Modal"
          >
            <h2>Delete Category</h2>
            {deleteCategory && (
              <p>Are you sure you want to delete {deleteCategory.name}?</p>
            )}
            <button onClick={() => handleDeleteCategory(deleteCategory)}>Delete</button>
            <button onClick={closeDeleteModal}>Cancel</button>
          </Modal>

          <Modal
            isOpen={!!newCategory}
            onRequestClose={closeCreateModal}
            contentLabel="Add Category Modal"
          >
            <h2>Add Category</h2>
            <div>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={newCategory ? newCategory.name : ''}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Priority:</label>
              <input
                type="text"
                name="priority"
                value={newCategory ? newCategory.priority : ''}
                onChange={handleInputChange}
              />
            </div>
            <button onClick={handleAddCategory}>Create</button>
            <button onClick={closeCreateModal}>Close</button>
          </Modal>
        </>
      )}
    </div>
  );
};

export default CategoriesCRUD;