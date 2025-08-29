import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Layout/Home.jsx";
import Analytics from "./Layout/Analytics.jsx";
import Bookmarks from "./Layout/Bookmarks.jsx";
import DataProvider from "./Context/DataContext.jsx";

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
        element: <Analytics />,
        path: "/analytics",
      },
      {
        element: <Bookmarks />,
        path: "/bookmarks",
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <DataProvider>
    <RouterProvider router={appRoute} />
  </DataProvider>
);
