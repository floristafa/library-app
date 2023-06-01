import React, { useEffect, useState } from 'react';
import authService from '../services/auth.service';
import {authenticatedDelete, authenticatedGet, authenticatedPost} from "../services/axios.service";
import { authenticatedPut } from '../services/axios.service';

const Report = () => {
  const [reports, setReports] = useState([]);
  const [userRole, setUserRole] = useState(null);
  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const role = authService.getCurrentUserRole();
        setUserRole(role);
        fetchReport();
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchData();
  }, []);

  const fetchReport = async () => {
    try {
      const response = await authenticatedGet('/api/Authors');
      setReports(response.data);
    } catch (error) {
      console.error('Error fetching report:', error);
    }
  };

  

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
          {reports.map((author) => (
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
