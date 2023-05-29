import React, { useState } from 'react';
import axios from 'axios';

import jwtDecode from 'jwt-decode';

const LoginPage = () => {

    const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleInputChange = (event) => {
    if (event.target.name === 'username') {
      setUsername(event.target.value);
    } else if (event.target.name === 'password') {
      setPassword(event.target.value);
    }
  };
  // ...

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send login request to the backend
      const response = await axios.post('https://localhost:7261/api/Authenticate/login', { username, password });

      // Assuming the backend returns a JWT
      const token = response.data.token;

      // Decode the JWT to access the expiration date
      const decodedToken = jwtDecode(token);
      const tokenExpiration = new Date(decodedToken.exp * 1000);

      // Check if the token is expired
      if (tokenExpiration < new Date()) {
        console.error('Token has expired');
        // Handle token expiration, such as displaying an error message or redirecting to a login page
        return;
      }

      // Store the token in local storage
      localStorage.setItem('token', token);

      // Redirect to the home page or perform any other actions
      // For example, you can use react-router-dom to redirect to a different page:
    //    history.push('https://localhost:7261');
    } catch (error) {
      console.error('Login failed', error);
      // Handle error case, such as displaying an error message
    }
  };
  return (
    <div>
      <h1>Login</h1>
      <div>
        <label>Username:</label>
        <input type="text" name="username" value={username} onChange={handleInputChange} />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" name="password" value={password} onChange={handleInputChange} />
      </div>
      <button onClick={handleSubmit}>Login</button>
    </div>
  );
  // ...
};

export default LoginPage;
