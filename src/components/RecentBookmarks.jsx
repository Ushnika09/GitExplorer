import React, { useContext } from "react";
import { BookmarkContext } from "../Context/BookmarkProvider";
import { BiStar, BiBookmark } from "react-icons/bi";
import { FaCodeFork } from "react-icons/fa6";
import { Link } from "react-router-dom";
import moment from "moment";

function RecentBookmarks() {
  const { bookmarks } = useContext(BookmarkContext);

  if (bookmarks.length === 0)
    return (
      <div className="bg-white shadow-lg rounded-2xl p-8 text-center border border-purple-100">
        <BiBookmark className="text-4xl text-purple-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-700 mb-2">No bookmarks yet</h3>
        <p className="text-gray-500">Start bookmarking repositories to see them here</p>
      </div>
    );

  // Sort by most recent (assuming last added is newest)
  const recent = [...bookmarks].reverse().slice(0, 5);

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col gap-4 border border-purple-100">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4 pb-4 border-b border-purple-100">
        <div className="p-2 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg">
          <BiBookmark className="text-xl text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Recent Bookmarks</h2>
          <p className="text-sm text-gray-500">Your most recently saved repositories</p>
        </div>
        <span className="ml-auto px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
          {bookmarks.length} total
        </span>
      </div>

      {/* Bookmarks List */}
      <div className="space-y-3">
        {recent.map((repo) => (
          <Link
            to={repo.url}
            target="_blank"
            key={repo.id}
            className="flex justify-between items-center p-4 rounded-xl border border-purple-50 
                     hover:border-purple-200 hover:bg-gradient-to-r hover:from-purple-50/50 hover:to-purple-100/30 
                     transition-all duration-300 group"
          >
            <div className="flex items-center gap-4 flex-1 min-w-0">
              <img
                src={repo.avatar}
                alt={repo.owner}
                className="h-12 w-12 rounded-full border-2 border-purple-200 group-hover:border-purple-400 transition-colors"
              />
              <div className="flex flex-col min-w-0 flex-1">
                <span className="font-semibold text-gray-800 truncate group-hover:text-purple-700 transition-colors">
                  {repo.name}
                </span>
                <span className="text-gray-500 text-sm">
                  by <span className="font-medium text-purple-600">{repo.owner}</span>
                </span>
                <span className="text-xs text-gray-400 mt-1">
                  Added {moment(repo.created_at).fromNow()}
                </span>
              </div>
            </div>

            <div className="flex gap-4 items-center text-gray-600 ml-4">
              <div className="flex items-center gap-1.5 bg-yellow-50 px-2.5 py-1 rounded-lg">
                <BiStar className="text-yellow-500 text-lg" />
                <span className="text-sm font-semibold text-gray-700">
                  {repo.stargazers_count || 0}
                </span>
              </div>
              <div className="flex items-center gap-1.5 bg-gray-100 px-2.5 py-1 rounded-lg">
                <FaCodeFork className="text-gray-500 text-lg" />
                <span className="text-sm font-semibold text-gray-700">
                  {repo.forks_count || 0}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* View All Link */}
      {bookmarks.length > 5 && (
        <div className="pt-4 mt-2 border-t border-purple-100">
          <Link
            to="/bookmarks"
            className="text-purple-600 hover:text-purple-700 font-medium text-sm flex items-center gap-1 justify-center group"
          >
            View all bookmarks
            <svg 
              className="w-4 h-4 group-hover:translate-x-1 transition-transform" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      )}
    </div>
  );
}

export default RecentBookmarks;