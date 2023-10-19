import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import "./index.css";

import Layout from './pages/Layout';
import TaskPage from './pages/TaskPage/TaskPage';
import Homepage from "./pages/Homepage";
import QuizListPage from "./pages/QuizListPage";

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([{
  path: "/",
  children: [
    {
      path: "/",
      element: <Layout/>,
      children: [
        {
          path: "/",
          element: <Homepage/>,
        },
        {
          path: "quiz",
          children: [
            {
              path: "all",
              element: <QuizListPage/>,
            }
          ]
        }
      ],
    },
    {
      path: "game",
      children: [
        {
          path: "quiz",
          element: <TaskPage/>,
        },
      ]
    }
  ]
}
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

reportWebVitals();
