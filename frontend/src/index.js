import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import "./index.css";

import Layout from './pages/Layout';
import TaskPage from './pages/TaskPage';
import QuizListPage from "./pages/QuizListPage";

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: [
      {
        path: "/task",
        element: <TaskPage/>,
      },
      {
        path: "/quiz/all",
        element: <QuizListPage/>
      }
    ],
  },
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

reportWebVitals();
