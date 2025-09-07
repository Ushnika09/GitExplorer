import express from "express";
import { AuthMiddlewear } from "../Middlewears/AuthMiddlewear.js";
import {
  getBookmarks,
  addBookmark,
  deleteBookmark,
  clearBookmarks,
  updateBookmarkNote,
} from "../Controller/BookmarkController.js";

const router = express.Router();

// Map routes → controller functions
router.get("/", AuthMiddlewear, getBookmarks);
router.post("/", AuthMiddlewear, addBookmark);
router.delete("/:id", AuthMiddlewear, deleteBookmark);
router.delete("/", AuthMiddlewear, clearBookmarks);
router.put("/:id", AuthMiddlewear, updateBookmarkNote);

export default router;
