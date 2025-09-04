import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Layout/Home.jsx";
import Analytics from "./Layout/Analytics.jsx";
import Bookmarks from "./Layout/Bookmarks.jsx";
import DataProvider from "./Context/DataContext.jsx";
import BookmarkCard from "./components/BookmarkCard.jsx";
import RepoDetails from "./components/RepoDetail.jsx";
import { BookmarkProvider } from "./Context/BookmarkProvider.jsx";

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
      {
        element: <BookmarkCard/>,
        path: "/details/:id",
      },
      {
        element: <RepoDetails/>,
        path: "/repodetails/:owner/:name",
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <DataProvider>
    <BookmarkProvider>
    <RouterProvider router={appRoute} />
    </BookmarkProvider>
  </DataProvider>
);
