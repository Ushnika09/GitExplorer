import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const BookmarkContext = createContext();

export function BookmarkProvider({ children }) {
  const [bookmarks, setBookmarks] = useState([]);

  // Automatically switch between local and hosted backend
  const BASE_URL =
    import.meta.env.MODE === "development"
      ? "http://localhost:5000/api"
      : "https://gitexplorer-backend-k5h7.onrender.com/api";

  // Load bookmarks on mount
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      axios
        .get(`${BASE_URL}/bookmarks`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setBookmarks(res.data))
        .catch((err) => console.error(err));
    }
  }, [BASE_URL]);

  const addBookmark = async (repo) => {
    const token = localStorage.getItem("jwt");
    try {
      const res = await axios.post(`${BASE_URL}/bookmarks`, repo, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookmarks((prev) => [...prev, res.data]);
      return { success: true, data: res.data };
    } catch (err) {
      if (err.response?.status === 400) {
        console.log("Bookmark already exists");
        return { success: false, message: "Bookmark already exists" };
      }
      console.error("Error adding bookmark:", err);
      return { success: false, message: "Error adding bookmark" };
    }
  };

  const removeBookmark = async (id) => {
    const token = localStorage.getItem("jwt");
    try {
      await axios.delete(`${BASE_URL}/bookmarks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookmarks((prev) => prev.filter((b) => b._id !== id));
      return { success: true };
    } catch (err) {
      console.error("Error removing bookmark:", err);
      return { success: false };
    }
  };

  const clearAllBookmarks = async () => {
    const token = localStorage.getItem("jwt");
    try {
      await axios.delete(`${BASE_URL}/bookmarks`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookmarks([]);
      return { success: true };
    } catch (err) {
      console.error("Error clearing bookmarks:", err);
      return { success: false };
    }
  };

  const updateBookmark = async (id, updates) => {
    const token = localStorage.getItem("jwt");
    try {
      const res = await axios.patch(`${BASE_URL}/bookmarks/${id}`, updates, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookmarks((prev) =>
        prev.map((b) => (b._id === id ? res.data : b))
      );
      return { success: true, data: res.data };
    } catch (err) {
      console.error("Error updating bookmark:", err);
      return { success: false };
    }
  };

  return (
    <BookmarkContext.Provider
      value={{
        bookmarks,
        addBookmark,
        removeBookmark,
        clearAllBookmarks,
        updateBookmark,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
}
