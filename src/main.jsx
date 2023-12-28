import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Main from './components/Main.jsx';
import Home from './components/Home.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import CourseForm from './components/CourseForm.jsx';
import LogOut from './components/LogOut.jsx';
import ViewCourses from './components/ViewCourses.jsx';
import Details from './components/Details.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>
      },
      {
        path: "course",
        element: <CourseForm></CourseForm>
      },
      {
        path: "login",
        element: <Login></Login>
      },
      {
        path: "logout",
        element: <LogOut></LogOut>
      },
      {
        path: "register",
        element: <Register></Register>
      },
      {
        path: "view/:id",
        element: <Details></Details>,
        loader: ({params})=> fetch(`http://localhost:8000/api/courses/${params.id}`)
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div className='max-w-screen-xl mx-auto'>
      <RouterProvider router={router} />
    </div>
  </React.StrictMode>,
)
