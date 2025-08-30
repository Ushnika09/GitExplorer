import React from 'react';
import { BiBookmark, BiStar } from 'react-icons/bi';
import { GoShare } from 'react-icons/go';
import { FaCodeFork } from 'react-icons/fa6';
import { CiCalendar } from 'react-icons/ci';
import moment from 'moment';
import { IoEyeOutline } from "react-icons/io5";

function RepoCard({ data }) {//here data is data.items
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.map((repo) => (
        <div
          key={repo.id}
          className="flex flex-col justify-between gap-4 bg-white rounded-xl shadow-md p-5 transition-transform duration-300 hover:scale-105 hover:bg-gradient-to-br from-purple-200 via-purple-100 to-pink-200"
        >
          {/* Header: Avatar + Owner + Actions */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <img
                src={repo?.owner?.avatar_url}
                alt={repo?.owner?.login}
                className="rounded-full h-12 w-12"
              />
              <h1 className="text-sm md:text-lg font-medium">{repo?.owner?.login}</h1>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <BiBookmark className="cursor-pointer hover:text-purple-500" />
              <GoShare className="cursor-pointer hover:text-purple-500" />
            </div>
          </div>

          {/* Repo Info */}
          <div className="flex flex-col gap-2">
            <h1 className="text-lg font-semibold truncate">{repo?.name}</h1>
            <p className="text-gray-700 text-sm line-clamp-2">{repo?.description}</p>
            {repo?.language && (
              <span className="text-sm font-bold text-gray-500">{repo.language}</span>
            )}
          </div>

          {/* Stats: Stars, Forks, Created At */}
          <div className="flex justify-between items-center mt-3">
            <div className="flex items-center gap-1.5 text-gray-600">
              <BiStar />
              <span>{repo?.stargazers_count}</span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-600">
              <FaCodeFork />
              <span>{repo?.forks_count}</span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-600">
              <IoEyeOutline/>
              <span>{repo?.watchers}</span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-600">
              <CiCalendar />
              <span>{moment(repo?.created_at).fromNow()}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default RepoCard;
