import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const BookmarkContext = createContext();

export function BookmarkProvider({ children }) {
  const [bookmarks, setBookmarks] = useState([]);

  // Load bookmarks on mount
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      axios
        .get("http://localhost:5000/api/bookmarks", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setBookmarks(res.data))
        .catch((err) => console.error(err));
    }
  }, []);

  const addBookmark = async (repo) => {
    const token = localStorage.getItem("jwt");
    try {
      const res = await axios.post(
        "http://localhost:5000/api/bookmarks",
        repo,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setBookmarks((prev) => [...prev, res.data]);
      return { success: true, data: res.data };
    } catch (err) {
      // Handle duplicate bookmark error
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
      await axios.delete(`http://localhost:5000/api/bookmarks/${id}`, {
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
      await axios.delete("http://localhost:5000/api/bookmarks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookmarks([]);
      return { success: true };
    } catch (err) {
      console.error("Error clearing bookmarks:", err);
      return { success: false };
    }
  };

  // Update bookmark (for notes and other fields)
  const updateBookmark = async (id, updates) => {
    const token = localStorage.getItem("jwt");
    try {
      const res = await axios.patch(
        `http://localhost:5000/api/bookmarks/${id}`,
        updates,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
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