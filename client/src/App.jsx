import React from "react";
import {createBrowserRouter} from "react-router-dom";
import ApplAyout from "./AppLayout/ApplAyout";
import {Home} from "lucide-react";
import Dashboard from "./pages/Dashboard";
import {RouterProvider} from "react-router";

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
        path: "dashboard",
        element: <Dashboard />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
