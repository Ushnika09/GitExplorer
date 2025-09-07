import BookmarkModel from "../Models/BookMarkmodel.js";

// 📌 Get all bookmarks
export const getBookmarks = async (req, res) => {
  try {
    const bookmarks = await BookmarkModel.find({ userId: req.user.id });
    res.json(bookmarks);
  } catch (err) {
    res.status(500).json({ message: "Error fetching bookmarks" });
  }
};

// 📌 Add a bookmark
export const addBookmark = async (req, res) => {
  try {
    const newBookmark = new BookmarkModel({
      ...req.body,
      userId: req.user.id,
    });
    await newBookmark.save();
    res.json(newBookmark);
  } catch (err) {
    res.status(500).json({ message: "Error saving bookmark" });
  }
};

// 📌 Remove one bookmark
export const deleteBookmark = async (req, res) => {
  try {
    await BookmarkModel.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });
    res.json({ message: "Bookmark deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting bookmark" });
  }
};

// 📌 Clear all bookmarks
export const clearBookmarks = async (req, res) => {
  try {
    await BookmarkModel.deleteMany({ userId: req.user.id });
    res.json({ message: "All bookmarks cleared" });
  } catch (err) {
    res.status(500).json({ message: "Error clearing bookmarks" });
  }
};

// Update bookmark note
export const updateBookmarkNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { note } = req.body;
    const updated = await BookmarkModel.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      { note },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Error updating note" });
  }
};
