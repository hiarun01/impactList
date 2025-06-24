import React from "react";
import {createBrowserRouter} from "react-router-dom";
import ApplAyout from "./AppLayout/ApplAyout";
import Dashboard from "./pages/dashboard/Dashboard";
import {RouterProvider} from "react-router";
import Home from "./pages/Home";
import Post from "./pages/Post";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ApplAyout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/contribute",
        element: <Post />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
