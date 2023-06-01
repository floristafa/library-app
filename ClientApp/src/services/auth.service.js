import axios from "axios";
import jwt_decode from "jwt-decode";

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
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("token");
};

const getCurrentUser = () => {
  const token = localStorage.getItem("user");
  return token ? jwt_decode(token) : null;
};

const getToken = () => {
  return localStorage.getItem("token") || "";
};

const getCurrentUserRole = () => {
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
};

const authService = {
  signup,
  login,
  logout,
  getCurrentUser,
  getToken,
  getCurrentUserRole,
};

export default authService;