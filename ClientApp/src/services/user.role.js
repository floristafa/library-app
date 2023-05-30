import jwt_decode from "jwt-decode";

export const authenticationService = {
  login,
  logout,
  getToken,
  getCurrentUserId,
  getCurrentUserName,
  getCurrentUserRole,
};

function login(token) {
  localStorage.setItem("token", token);
}

function logout() {
  localStorage.removeItem("token");
}

function getToken() {
  return localStorage.getItem("token") || "";
}

function getCurrentUserId() {
  try {
    if (getToken() !== "") {
      var decoded = jwt_decode(getToken());
      return decoded.jti || "";
    }

    return "";
  } catch (err) {
    console.log("error", err);
    return "";
  }
}

function getCurrentUserName() {
  try {
    if (getToken() !== "") {
      var decoded = jwt_decode(getToken());
      return decoded.email || "";
    }

    return "";
  } catch (err) {
    console.log("error", err);
    return "";
  }
}

function getCurrentUserRole() {
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