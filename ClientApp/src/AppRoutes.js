import  AuthorList  from "./components/AuthorList";
import  CategoryList  from "./components/CategoryList";
import BookList from "./components/BookList";
import AuthorReport from "./components/AuthorReport";
import { Home } from "./components/Home";


const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  
  {
    path: '/api/Books',
    element: <BookList />
  },

  {
    path: '/api/Authors',
    element: <AuthorList />
  },
  {
    path: 'api/Categories',
    element: <CategoryList />
  },
  {
    path: 'api/Report',
    element: <AuthorReport />
  },
  
  
];

export default AppRoutes;
