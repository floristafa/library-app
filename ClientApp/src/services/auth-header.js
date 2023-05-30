export default function authHeader() {
    const user = JSON.parse(localStorage.getItem("user"));
  
    if (user && user.accessToken) {
      // Include the user role in the authorization header
      return {
        Authorization: 'Bearer ' + user.accessToken,
        // 'x-user-role': user.role
      };
    } else {
      return {};
    }
  }
  


  