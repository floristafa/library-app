import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import AuthService from "./services/auth.service";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import AuthorsCRUD1 from "./components/AuthorsCRUD1";
import BooksCRUD from "./components/BooksCRUD";
import Report from "./components/AuthorReport";
import CategoriesCRUD from "./components/CategoriesCRUD";


function App() {
  const [currentUser, setUserRole] = useState(undefined);
  
  useEffect(() => {
    const role = AuthService.getCurrentUserRole();

    if (role) {
      setUserRole(role);
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
  };

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/"} className="nav-link">
              Home
            </Link>
          </li>
          

          {currentUser && (
          <div className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to={"/api/Authors"} className="nav-link">
                Authors
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/api/Books"} className="nav-link">
                Books
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/api/Categories"} className="nav-link">
                Categories
              </Link>
            </li>
            {currentUser === "Admin" && (
            <li className="nav-item">
              <Link to={"/api/Report"} className="nav-link">
                Report
              </Link>
            </li>
            )}
          </div>
        )}
        </div>

        {currentUser ? (
          <div className="navbar-nav ms-auto">
            <li className="nav-item">
              <a href="/" className="nav-link" onClick={logOut}>
                Logout
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to={"/api/Authenticate/login"} className="nav-link">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/api/Authenticate/register-admin"} className="nav-link">
                Sign up
              </Link>
            </li>
          </div>
        )}
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/api/Authenticate/login" element={<Login />} />
          <Route path="/api/Authenticate/register-admin" element={<Signup />} />
          <Route path="/api/Authors" element={<AuthorsCRUD1 />} />
          <Route path="/api/Books" element={<BooksCRUD />} />
          <Route path="/api/Report" element={< Report/>} />
          <Route path="/api/Categories" element={< CategoriesCRUD/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;