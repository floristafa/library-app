import React, { useState, useEffect } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { getAuthors, getCategories, saveBook } from '../api/libraryApi';

const BookForm = (props) => {
  const [book, setBook] = useState({
    id: 0,
    name: '',
    description: '',
    authorId: 0,
    categories: []
  });
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getAuthors().then((authors) => setAuthors(authors));
    getCategories().then((categories) => setCategories(categories));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    saveBook(book).then(() => {
      props.history.push('/books');
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setBook({ ...book, [name]: value });
  };

  const handleCheckboxChange = (event) => {
    const { value } = event.target;
    let categoriesArray = [...book.categories];
    if (categoriesArray.includes(parseInt(value))) {
      categoriesArray = categoriesArray.filter((c) => c !== parseInt(value));
    } else {
      categoriesArray.push(parseInt(value));
    }
    setBook({ ...book, categories: categoriesArray });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="name">Name</Label>
        <Input
          type="text"
          name="name"
          id="name"
          placeholder="Enter book name"
          value={book.name}
          onChange={handleInputChange}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label for="description">Description</Label>
        <Input
          type="textarea"
          name="description"
          id="description"
          placeholder="Enter book description"
          value={book.description}
          onChange={handleInputChange}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label for="authorId">Author</Label>
        <Input
          type="select"
          name="authorId"
          id="authorId"
          value={book.authorId}
          onChange={handleInputChange}
          required
        >
          <option value="">Select an author</option>
          {authors.map((author) => (
            <option key={author.id} value={author.id}>
              {author.name}
            </option>
          ))}
        </Input>
      </FormGroup>
      <FormGroup>
        <Label for="categories">Categories</Label>
        <div>
          {categories.map((category) => (
            <FormGroup check inline key={category.id}>
              <Label check>
                <Input
                  type="checkbox"
                  name="categories"
                  value={category.id}
                  onChange={handleCheckboxChange}
                  checked={book.categories.includes(category.id)}
                />{' '}
                {category.name}
              </Label>
            </FormGroup>
          ))}
        </div>
      </FormGroup>
      <Button type="submit">Save</Button>
    </Form>
  );
};

export default BookForm;
