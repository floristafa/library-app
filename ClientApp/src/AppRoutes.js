import  AuthorList  from "./components/AuthorList";
import  CategoryList  from "./components/CategoryList";
import BookList from "./components/BookList";
import AuthorReport from "./components/AuthorReport";
import AuthorsController from "./components/AuthorListOLD";
import AuthorsCRUD1 from "./components/AuthorsCRUD1";
import CRUD from "./components/Author";
import { Home } from "./components/Home";
import SignIn from "./components/signin";
import LoginPage from "./components/LoginPage";
import RegistrationPage from "./components/RegistrationPage";


const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/api/Authenticate/login',
    element: <LoginPage />
  },
  {
    path: '/api/Authenticate/register-admin',
    element: <RegistrationPage />
  },
  
  {
    path: '/api/Books',
    element: <BookList />
  },

  {
    path: '/api/Authors',
    element: <AuthorsCRUD1 />
  },
  { 
    path: '/api/Categories',
    element: <CategoryList />
  },
  {
    path: '/api/Report/report',
    element: <AuthorReport />
  },
  
  
];

export default AppRoutes;
