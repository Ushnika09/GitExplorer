
import mongoose from "mongoose";

const bookmarkSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  repoId: { type: Number, required: true }, // GitHub repo ID
  name: String,
  owner: String,
  url: String,
  language: String,
  stargazers_count: Number,
  forks_count: Number,
  watchers: Number,
  created_at: Date,
  avatar: String,
  note: String,
  bookmarkedAt: { type: Date, default: Date.now }
});

const BookmarkModel= mongoose.model("Bookmark", bookmarkSchema);

export default BookmarkModel