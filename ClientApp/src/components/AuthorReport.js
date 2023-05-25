import React, { useEffect, useState } from 'react';

const Report = () => {
  const [authorReports, setAuthorReports] = useState([]);

  useEffect(() => {
    fetch('/api/Report/report')
      .then((response) => response.json())
      .then((data) => setAuthorReports(data));
  }, []);

  return (
    <div>
      <h1>Author Report</h1>
      <table>
        <thead>
          <tr>
            <th>Author</th>
            <th>Number of Books</th>
          </tr>
        </thead>
        <tbody>
          {authorReports.map((author) => (
            <tr key={author.authorName}>
              <td>{author.authorName}</td>
              <td>{author.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Report;
