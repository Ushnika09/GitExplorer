// BookmarkContext.jsx
import React, { createContext, useState } from "react";
import useLocalStorage from "../../utils/Helperbookmark";

export const BookmarkContext = createContext();

export function BookmarkProvider({ children }) {
  const [bookmarks, setBookmarks] = useLocalStorage("bookmarks", []);

  return (
    <BookmarkContext.Provider value={{ bookmarks, setBookmarks }}>
      {children}
    </BookmarkContext.Provider>
  );
}
