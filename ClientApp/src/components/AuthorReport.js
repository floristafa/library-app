import React, { useEffect, useState } from 'react';
import authService from '../services/auth.service';
import {authenticatedDelete, authenticatedGet, authenticatedPost} from "../services/axios.service";
import { authenticatedPut } from '../services/axios.service';
import "../table.css"
import Modal from 'react-modal';

Modal.setAppElement('#root3'); // Set the app root element for accessibility

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
      const response = await authenticatedGet('/api/Report');
      setReports(response.data);
    } catch (error) {
      console.error('Error fetching report:', error);
    }
  };

  

  return (
    <div>
      <h1 className="page-title">Author Report Page</h1>
<table className="custom-table">
  <thead className="table-head">
    
          <tr>
            <th>Author</th>
            <th>Number of Books</th>
            
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => (
            <tr key={report.authorName}>
               <td>{report.authorName}</td>
              <td>{report.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Report;
