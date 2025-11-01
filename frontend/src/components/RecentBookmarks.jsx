import React, { useContext, useMemo } from "react";
import { BookmarkContext } from "../Context/BookmarkProvider";
import { BiStar, BiBookmark, BiX, BiNote } from "react-icons/bi";
import { FaCodeFork } from "react-icons/fa6";
import moment from "moment";

function RecentBookmarks() {
  const { bookmarks, removeBookmark } = useContext(BookmarkContext);

  const recent = useMemo(() => {
    return [...bookmarks]
      .sort((a, b) => new Date(b.bookmarkedAt || b.created_at) - new Date(a.bookmarkedAt || a.created_at))
      .slice(0, 5);
  }, [bookmarks]);

  if (bookmarks.length === 0) {
    return (
      <div className="bg-white shadow-lg rounded-2xl p-12 text-center border border-purple-100">
        <div className="inline-block p-4 bg-purple-100 rounded-full mb-4">
          <BiBookmark className="text-4xl text-purple-500" />
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">No bookmarks yet</h3>
        <p className="text-gray-500">Start bookmarking repositories to see them here</p>
      </div>
    );
  }

  const handleRemoveBookmark = (repoId, e) => {
    e.preventDefault();
    e.stopPropagation();
    removeBookmark(repoId);
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 border border-purple-100">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-purple-100">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl shadow-lg">
            <BiBookmark className="text-2xl text-white" />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-800">Recent Bookmarks</h2>
            <p className="text-sm text-gray-500">Your most recently saved repositories</p>
          </div>
        </div>
        <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-bold">
          {bookmarks.length}
        </span>
      </div>

      {/* Bookmarks List */}
      <div className="space-y-4">
        {recent.map((repo) => (
          <div
            key={repo._id}
            className="relative p-5 rounded-xl border-2 border-gray-100 
                     hover:border-purple-300 hover:shadow-md transition-all duration-200 
                     bg-gradient-to-br from-white to-purple-50/30 group"
          >
            {/* Remove Button */}
            <button
              onClick={(e) => handleRemoveBookmark(repo._id, e)}
              className="absolute top-3 right-3 p-2 bg-white border border-gray-200 text-gray-400 
                       rounded-lg opacity-0 group-hover:opacity-100 hover:bg-red-50 hover:text-red-600 
                       hover:border-red-200 transition-all duration-200 z-10"
              title="Remove bookmark"
            >
              <BiX className="text-lg" />
            </button>

            <div className="flex items-start gap-4">
              {/* Avatar */}
              <img
                src={repo.avatar}
                alt={repo.owner}
                className="h-12 w-12 md:h-14 md:w-14 rounded-full border-3 border-purple-200 
                         group-hover:border-purple-400 transition-colors flex-shrink-0"
              />

              {/* Content */}
              <div className="flex-1 min-w-0">
                {/* Repo Name & Owner */}
                <a
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group/link"
                >
                  <h3 className="font-bold text-lg text-gray-800 truncate 
                               group-hover/link:text-purple-600 transition-colors">
                    {repo.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-2">
                    by <span className="font-medium text-gray-700">{repo.owner}</span>
                  </p>
                </a>

                {/* Note */}
                {repo.note && (
                  <div className="mt-2 mb-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-start gap-2">
                      <BiNote className="text-yellow-500 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-yellow-800 italic">"{repo.note}"</p>
                    </div>
                  </div>
                )}

                {/* Stats */}
                <div className="flex items-center gap-4 mt-3">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-yellow-50 rounded-lg">
                    <BiStar className="text-yellow-500" />
                    <span className="text-sm font-semibold text-gray-700">
                      {repo.stargazers_count?.toLocaleString() || 0}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 rounded-lg">
                    <FaCodeFork className="text-gray-500" />
                    <span className="text-sm font-semibold text-gray-700">
                      {repo.forks_count?.toLocaleString() || 0}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500 ml-auto">
                    {moment(repo.bookmarkedAt || repo.created_at).fromNow()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentBookmarks;