import React, { useContext } from "react";
import { BiBookmark, BiStar } from "react-icons/bi";
import { FaBookmark, FaCodeFork } from "react-icons/fa6";
import { GoShare } from "react-icons/go";
import { CiCalendar } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import moment from "moment";
import { BookmarkContext } from "../Context/BookmarkProvider";

export default function RepoCard({ data }) {
  const { bookmarks, setBookmarks } = useContext(BookmarkContext)

  // Toggle bookmark
  function handleClick(repo) {
    const exists = bookmarks.find((b) => b.id === repo.id);
    if (exists) {
      // Remove bookmark
      setBookmarks((prev) => prev.filter((b) => b.id !== repo.id));
    } else {
      // Add bookmark
      setBookmarks((prev) => [
        ...prev,
        {
          id: repo.id,
          name: repo.name,
          owner: repo.owner.login,
          url: repo.html_url,
          note: "",
          avatar: repo.owner.avatar_url,
        },
      ]);
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.map((repo) => {
        const isBookmarked = bookmarks.some((b) => b.id === repo.id);

        return (
          <div
            key={repo.id}
            className="flex flex-col justify-between gap-4 bg-white rounded-xl shadow-xl p-5 
                       transition-all duration-300 hover:scale-105 
                       hover:bg-gradient-to-br hover:from-purple-200 hover:via-purple-100 
                       border border-purple-700 hover:to-pink-200
                       min-h-[280px] xl:min-w-[380px]"
          >
            {/* Header */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <img
                  src={repo.owner.avatar_url}
                  alt={repo.owner.login}
                  className="rounded-full h-12 w-12"
                />
                <h1 className="text-sm md:text-lg font-medium">
                  {repo.owner.login}
                </h1>
              </div>

              <div className="flex items-center gap-3 text-gray-600">
                {isBookmarked ? (
                  <FaBookmark
                    className="cursor-pointer text-xl text-purple-600 fill-purple-600 hover:text-purple-500 transition"
                    onClick={() => handleClick(repo)}
                  />
                ) : (
                  <BiBookmark
                    className="cursor-pointer text-xl text-gray-600 hover:text-purple-500 transition"
                    onClick={() => handleClick(repo)}
                  />
                )}

                <a href={repo.clone_url} target="_blank" rel="noopener noreferrer">
                  <GoShare className="cursor-pointer text-xl hover:text-purple-500" />
                </a>
              </div>
            </div>

            {/* Repo Info */}
            <div className="flex flex-col gap-2">
              <Link
                to={`/repodetails/${repo.owner.login}/${repo.name}`}
                className="text-lg font-semibold truncate hover:text-purple-600 hover:underline transition-colors"
              >
                {repo.name}
              </Link>
              <p className="text-gray-700 text-sm line-clamp-2">
                {repo.description || "No description available"}
              </p>
              {repo.language && (
                <span className="w-fit flex bg-purple-100 text-purple-800 text-xs font-medium px-3.5 py-1.5 rounded-full">
                  {repo.language}
                </span>
              )}
            </div>

            {/* Stats */}
            <div className="flex justify-between items-center mt-3">
              <div className="flex items-center gap-1.5 text-gray-600" title="Stars">
                <BiStar className="text-yellow-500" />
                <span className="text-sm">{repo.stargazers_count}</span>
              </div>
              <div className="flex items-center gap-1.5 text-gray-600" title="Forks">
                <FaCodeFork className="text-gray-500" />
                <span className="text-sm">{repo.forks_count}</span>
              </div>
              <div className="flex items-center gap-1.5 text-gray-600" title="Watchers">
                <IoEyeOutline className="text-blue-500" />
                <span className="text-sm">{repo.watchers}</span>
              </div>
              <div className="flex items-center gap-1.5 text-gray-600" title="Created">
                <CiCalendar className="text-green-500" />
                <span className="text-xs">{moment(repo.created_at).fromNow()}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
