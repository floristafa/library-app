import React from 'react';

const BookDetails = ({ book }) => {
  return (
    <div className="book-details">
      <h2>{book.title}</h2>
      <img src={book.imageUrl} alt={`Cover of ${book.title}`} />
      <p><strong>Author:</strong> {book.author.name}</p>
      <p><strong>Description:</strong> {book.description}</p>
      <p><strong>Categories:</strong> {book.categories.map(category => category.name).join(', ')}</p>
      <p><strong>Publication Date:</strong> {book.publicationDate}</p>
      <p><strong>Publisher:</strong> {book.publisher}</p>
      <p><strong>ISBN:</strong> {book.isbn}</p>
      <p><strong>Number of Pages:</strong> {book.numberOfPages}</p>
      <p><strong>Language:</strong> {book.language}</p>
      <p><strong>Available:</strong> {book.available ? 'Yes' : 'No'}</p>
    </div>
  );
};

export default BookDetails;


//Note that this component assumes that the book object has properties with names like title, 
//imageUrl, author, description, categories, publicationDate, publisher, isbn, numberOfPages, language, and available. 
//If the book object returned from the API has different property names or structure, you may need to modify this component accordingly.
