import React from "react";
import { useData } from "../Context/DataContext";
import { BiStar, BiBookmark } from "react-icons/bi";
import { GoShare } from "react-icons/go";
import { FaCodeFork } from "react-icons/fa6";
import { IoEyeOutline } from "react-icons/io5";
import { CiCalendar } from "react-icons/ci";
import moment from "moment";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function Top10() {
  const { data, loading } = useData();
  const top = data?.items?.slice(0, 10) || [];

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <AiOutlineLoading3Quarters className="animate-spin text-4xl text-purple-500" />
        <span className="text-purple-500 text-lg font-medium">Loading</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 my-10">
      {/* Heading */}
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
        Top 10 Trending Repositories
      </h2>

      {/* Top 10 Cards */}
      {top.map((repo, index) => (
        <div
          key={repo.id}
          className="flex flex-col gap-3 bg-white rounded-xl shadow-md p-5 transition-transform duration-300 hover:scale-105 hover:shadow-xl hover:bg-gradient-to-br from-purple-100 via-purple-50 to-pink-50"
        >
          {/* Header */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <img
                src={repo?.owner?.avatar_url}
                alt={repo?.owner?.login || "Owner Avatar"}
                className="rounded-full h-12 w-12"
              />
              <h1 className="font-semibold">{repo?.owner?.login || "Unknown"}</h1>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <BiBookmark className="cursor-pointer hover:text-purple-500" />
              <GoShare className="cursor-pointer hover:text-purple-500" />
            </div>
          </div>

          {/* Repo Info */}
          <div className="flex flex-col gap-2">
            <h1 className="text-lg md:text-xl font-bold truncate">{repo?.name}</h1>
            <p className="text-gray-700 text-sm line-clamp-2">{repo?.description || "No description"}</p>
            {repo?.language && (
              <span className="text-sm font-semibold text-gray-500">{repo.language}</span>
            )}
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-4 mt-3 text-gray-600 text-sm items-center">
            <div className="flex items-center gap-1.5">
              <BiStar />
              <span>{repo?.stargazers_count ?? 0}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <FaCodeFork />
              <span>{repo?.forks_count ?? 0}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <IoEyeOutline />
              <span>{repo?.watchers ?? 0}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CiCalendar />
              <span>{repo?.created_at ? moment(repo.created_at).fromNow() : "N/A"}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-medium">#{index + 1}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Top10;
