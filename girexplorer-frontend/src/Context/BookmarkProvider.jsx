// BookmarkContext.jsx
import React, { createContext, useCallback } from "react";
import useLocalStorage from "../../utils/Helperbookmark";

export const BookmarkContext = createContext();

export function BookmarkProvider({ children }) {
  const [bookmarks, setBookmarks] = useLocalStorage("bookmarks", []);

  // Function to remove a single bookmark
  const removeBookmark = useCallback((repoId) => {
    setBookmarks(prevBookmarks => 
      prevBookmarks.filter(bookmark => bookmark.id !== repoId)
    );
  }, [setBookmarks]);

  // Function to clear all bookmarks
  const clearAllBookmarks = useCallback(() => {
    setBookmarks([]);
  }, [setBookmarks]);

  return (
    <BookmarkContext.Provider value={{ 
      bookmarks, 
      setBookmarks,
      removeBookmark,
      clearAllBookmarks 
    }}>
      {children}
    </BookmarkContext.Provider>
  );
}