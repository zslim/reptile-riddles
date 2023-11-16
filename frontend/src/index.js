import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import "./index.css";

import Layout from './pages/Layout';
import Homepage from "./pages/Homepage";
import QuizListPage from "./pages/QuizListPage";
import QuizPage from "./pages/QuizPage";
import ResultPage from "./pages/ResultPage";
import QuizEditor from "./pages/QuizEditor";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import { UserContextProvider } from "./context/UserContextProvider";
import Protected from "./context";

const root = ReactDOM.createRoot(document.getElementById('root'));

const REQUIREMENT_USER = ["role_user"];
const REQUIREMENT_GUEST = ["role_user", "role_guest"];

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
          path: "register",
          element: <RegisterPage/>,
        },
        {
          path: "login",
          element: <LoginPage/>,
        },
        {
          path: "result",
          children: [
            {
              path: "",
              element: (
                <Protected requiredRoles={REQUIREMENT_USER}>
                  <ResultPage/>
                </Protected>
              )
            }
          ]
        },
        {
          path: "quizform/:quizId",
          element: (
            <Protected  requiredRoles={REQUIREMENT_USER}>
              <QuizEditor/>
            </Protected>
          )
        },
        {
          path: "quiz",
          children: [
            {
              path: "all",
              element: (
                <Protected  requiredRoles={REQUIREMENT_USER}>
                  <QuizListPage/>
                </Protected>
              )
            }
          ]
        }
      ],
    },
    {
      path: "game",
      children: [
        {
          path: "quiz/:quizId",
          element: (
            <Protected requiredRoles={REQUIREMENT_GUEST}>
              <QuizPage/>
            </Protected>
          )
        },
      ]
    },
  ]
}]);

root.render(
  <React.StrictMode>
    <UserContextProvider>
      <RouterProvider router={router}/>
    </UserContextProvider>
  </React.StrictMode>
);

reportWebVitals();
