import React, { useContext, useState } from "react";
import { BiStar, BiBookmark, BiX } from "react-icons/bi";
import { FaBookmark, FaCodeFork } from "react-icons/fa6";
import { GoShare } from "react-icons/go";
import { IoEyeOutline } from "react-icons/io5";
import { CiCalendar } from "react-icons/ci";
import { Link } from "react-router-dom";
import moment from "moment";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { BookmarkContext } from "../Context/BookmarkProvider";
import { useData } from "../Context/DataContext";

function Top10() {
  const { data, loading } = useData();
  const { bookmarks = [], addBookmark, removeBookmark } = useContext(BookmarkContext);

  const [selectedRepo, setSelectedRepo] = useState(null);
  const [note, setNote] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isAddingBookmark, setIsAddingBookmark] = useState(false);

  const top = data?.items?.slice(0, 10) || [];

  // Check if repo is bookmarked by repoId
  const isRepoBookmarked = (repo) => {
    return bookmarks.some((b) => b.repoId === repo.id);
  };

  // Handle bookmark click
  async function handleBookmarkClick(repo) {
    const existing = bookmarks.find((b) => b.repoId === repo.id);
    if (existing) {
      try {
        await removeBookmark(existing._id);
      } catch (err) {
        console.error("Failed to remove bookmark", err);
      }
    } else {
      setSelectedRepo(repo);
      setNote("");
      setShowModal(true);
    }
  }

  // Add bookmark with duplicate prevention
  async function handleAddBookmark() {
    if (!selectedRepo || isAddingBookmark) return;

    setIsAddingBookmark(true);

    const bookmarkData = {
      repoId: selectedRepo.id,
      name: selectedRepo.name,
      owner: selectedRepo.owner.login,
      url: selectedRepo.html_url,
      description: selectedRepo.description || "",
      language: selectedRepo.language || "Unknown",
      stargazers_count: selectedRepo.stargazers_count || 0,
      forks_count: selectedRepo.forks_count || 0,
      watchers_count: selectedRepo.watchers_count ?? selectedRepo.watchers ?? 0,
      created_at: selectedRepo.created_at,
      updated_at: selectedRepo.updated_at,
      avatar: selectedRepo.owner.avatar_url,
      note: note.trim(),
      bookmarkedAt: new Date().toISOString(),
    };

    const result = await addBookmark(bookmarkData);
    
    setIsAddingBookmark(false);

    if (result.success) {
      setShowModal(false);
      setSelectedRepo(null);
      setNote("");
    } else {
      alert(result.message || "Failed to add bookmark");
    }
  }

  function handleCloseModal() {
    setShowModal(false);
    setSelectedRepo(null);
    setNote("");
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4 bg-white rounded-2xl shadow-lg border border-purple-100">
        <AiOutlineLoading3Quarters className="animate-spin text-5xl text-purple-500" />
        <span className="text-purple-600 text-lg font-semibold">Loading trending repositories...</span>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white shadow-lg rounded-2xl p-6 border border-purple-100">
        {/* Header */}
        <div className="mb-6 pb-4 border-b-2 border-purple-100">
          <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            🔥 Top 10 Trending Repositories
          </h2>
          <p className="text-gray-600">Most starred repositories based on your filters</p>
        </div>

        {/* Repository Cards */}
        <div className="space-y-4">
          {top.map((repo, index) => {
            const bookmarked = isRepoBookmarked(repo);

            return (
              <div
                key={repo.id}
                className="relative flex flex-col gap-4 p-5 rounded-xl border-2 border-gray-100 
                         hover:border-purple-300 hover:shadow-lg transition-all duration-300 
                         bg-gradient-to-br from-white to-purple-50/30 group"
              >
                {/* Rank Badge */}
                <div className="absolute -top-3 -left-3 w-8 h-8 bg-gradient-to-br from-purple-500 to-indigo-500 
                              rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                  {index + 1}
                </div>

                {/* Header */}
                <div className="flex justify-between items-start gap-3">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <img
                      src={repo.owner.avatar_url}
                      alt={repo.owner.login}
                      className="rounded-full h-12 w-12 border-2 border-purple-200 
                               group-hover:border-purple-400 transition-colors flex-shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm md:text-base font-semibold text-gray-700 truncate">
                        {repo.owner.login}
                      </h3>
                      {repo.language && (
                        <span className="inline-block mt-1 px-2.5 py-1 bg-purple-100 text-purple-700 
                                       text-xs font-medium rounded-full">
                          {repo.language}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {bookmarked ? (
                      <button
                        onClick={() => handleBookmarkClick(repo)}
                        className="p-2.5 bg-purple-100 rounded-lg hover:bg-purple-200 transition-colors"
                        title="Remove bookmark"
                      >
                        <FaBookmark className="text-lg text-purple-600" />
                      </button>
                    ) : (
                      <button
                        onClick={() => handleBookmarkClick(repo)}
                        className="p-2.5 bg-gray-100 rounded-lg hover:bg-purple-100 transition-colors"
                        title="Add bookmark"
                      >
                        <BiBookmark className="text-lg text-gray-600 hover:text-purple-600" />
                      </button>
                    )}

                    <a
                      href={repo.clone_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 bg-gray-100 rounded-lg hover:bg-blue-100 transition-colors"
                      title="Share repository"
                    >
                      <GoShare className="text-lg text-gray-600 hover:text-blue-600" />
                    </a>
                  </div>
                </div>

                {/* Repo Info */}
                <div className="flex flex-col gap-2">
                  <Link
                    to={`/app/repodetails/${repo.owner.login}/${repo.name}`}
                    className="text-lg md:text-xl font-bold text-gray-800 hover:text-purple-600 
                             hover:underline transition-colors line-clamp-1"
                  >
                    {repo.name}
                  </Link>
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {repo.description || "No description available"}
                  </p>
                </div>

                {/* Stats */}
                <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-gray-200">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-yellow-50 rounded-lg" title="Stars">
                    <BiStar className="text-yellow-500 text-lg" />
                    <span className="text-sm font-semibold text-gray-700">
                      {repo.stargazers_count?.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 rounded-lg" title="Forks">
                    <FaCodeFork className="text-gray-500 text-lg" />
                    <span className="text-sm font-semibold text-gray-700">
                      {repo.forks_count?.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 rounded-lg" title="Watchers">
                    <IoEyeOutline className="text-blue-500 text-lg" />
                    <span className="text-sm font-semibold text-gray-700">
                      {(repo.watchers_count ?? repo.watchers ?? 0).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 rounded-lg ml-auto" title="Created">
                    <CiCalendar className="text-green-500 text-lg" />
                    <span className="text-xs font-medium text-gray-600">
                      {moment(repo.created_at).fromNow()}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bookmark Modal */}
      {showModal && selectedRepo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl transform transition-all">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-800">Add to Bookmarks</h3>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded-lg"
                disabled={isAddingBookmark}
              >
                <BiX className="text-2xl" />
              </button>
            </div>

            <div className="mb-4 flex items-center gap-3 p-3 bg-purple-50 rounded-xl">
              <img
                src={selectedRepo.owner.avatar_url}
                alt={selectedRepo.owner.login}
                className="rounded-full h-12 w-12 border-2 border-purple-200"
              />
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-gray-800 truncate">{selectedRepo.name}</h4>
                <p className="text-sm text-gray-600">by {selectedRepo.owner.login}</p>
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="note" className="block text-sm font-medium text-gray-700 mb-2">
                Add Note (Optional)
              </label>
              <textarea
                id="note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Add your thoughts about this repository..."
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl 
                         focus:ring-2 focus:ring-purple-500 focus:border-purple-500 
                         transition-colors resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                rows="3"
                disabled={isAddingBookmark}
              />
            </div>

            <div className="flex gap-3 justify-end">
              <button
                onClick={handleCloseModal}
                className="px-5 py-2.5 border-2 border-gray-300 text-gray-700 rounded-xl 
                         hover:bg-gray-50 transition-colors font-medium
                         disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isAddingBookmark}
              >
                Cancel
              </button>
              <button
                onClick={handleAddBookmark}
                className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white 
                         rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-colors 
                         flex items-center gap-2 font-medium shadow-lg hover:shadow-xl
                         disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isAddingBookmark}
              >
                <FaBookmark className="text-lg" />
                {isAddingBookmark ? "Adding..." : "Add to Bookmarks"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Top10;