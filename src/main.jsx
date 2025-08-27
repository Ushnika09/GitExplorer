import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Search from "./Layout/Search.jsx";
import Home from "./Layout/Home.jsx";
import Analytics from "./Layout/Analytics.jsx";
import Bookmarks from "./Layout/Bookmarks.jsx";

const appRoute = createBrowserRouter([
  {
    element: <App />,
    path: "/",
    children: [
      {
        element: <Home />,
        path: "/",
      },
      {
        element: <Search />,
        path: "/search",
      },
      {
        element: <Analytics/>,
        path: "/analytics",
      },
      {
        element: <Bookmarks/>,
        path: "/bookmarks",
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={appRoute} />
);
