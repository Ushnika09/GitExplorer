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

//  Add a bookmark
export const addBookmark = async (req, res) => {
  try {
    // Check if bookmark already exists for this user
    const existingBookmark = await BookmarkModel.findOne({
      userId: req.user.id,
      repoId: req.body.repoId
    });

    if (existingBookmark) {
      return res.status(400).json({ 
        message: "Bookmark already exists",
        bookmark: existingBookmark 
      });
    }

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

// Update bookmark (note or other fields)
export const updateBookmark = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    const updated = await BookmarkModel.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      updates,
      { new: true }
    );
    
    if (!updated) {
      return res.status(404).json({ message: "Bookmark not found" });
    }
    
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Error updating bookmark" });
  }
};

// Legacy updateBookmarkNote endpoint (kept for backward compatibility)
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