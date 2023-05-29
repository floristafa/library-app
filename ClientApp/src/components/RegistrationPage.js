// Make a POST request to login
function login() {
    // Get the username and password from the login form
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    const data = {
      Username: username,
      Password: password
    };
  
    return fetch('/api/Authenticate/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Login failed');
        }
      })
      .then(data => {
        // Handle the login response
        const token = data.token;
        const expiration = data.expiration;
        // Do something with the token and expiration
        console.log('Token:', token);
        console.log('Expiration:', expiration);
      })
      .catch(error => {
        // Handle the error
        console.error('Login error:', error);
      });
  }
  export default login;
  // Example usage:
  // // Assume the login form has input fields with ids 'username' and 'password'
  // document.getElementById('login-form').addEventListener('submit', event => {
  //   event.preventDefault(); // Prevent form submission
  //   login();
  // });
  