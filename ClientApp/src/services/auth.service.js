import axios from "axios";

const API_URL = "/api/Authenticate";

const signup = (username, email, password) => {
  return axios
    .post(API_URL + "/register-admin", {
        username,
      email,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const login = (username, password) => {
  return axios
    .post(API_URL + "/login", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const getToken =() => {
    return localStorage.getItem("token") || "";
  }

  const getCurrentUserRole=() => {
    try {
      if (getToken() !== "") {
        var decoded = jwt_decode(getToken());
        return (
          decoded[
            "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
          ] || ""
        );
      }
  
      return "";
    } catch (err) {
      console.log("error", err);
      return "";
    }
  }

const authService = {
  signup,
  login,
  logout,
  getCurrentUser,
  getToken,
  getCurrentUserRole
};

export default authService;