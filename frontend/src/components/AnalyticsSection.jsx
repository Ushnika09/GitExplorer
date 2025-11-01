import React, { useState } from "react";
import RepoAnalytics from "./RepoAnalytics";
import BookmarkAnalytics from "./BookmarkAnalytics";
import Languageanalysis from "./Languageanaysis";
import Top10 from "./Top10";
import LanguageDistribution from "./LanguageDistribution";
import RecentBookmarks from "./RecentBookmarks";
import { BiGitRepoForked, BiBookmark } from "react-icons/bi";

function AnalyticsSection() {
  const [active, setActive] = useState("repo");

  return (
    <div className="flex flex-col gap-6">
      {/* Modern Tab Switcher */}
      <div className="bg-white shadow-lg rounded-2xl p-2 border border-purple-100 inline-flex gap-2 w-fit">
        <button
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm md:text-base
                     transition-all duration-300 transform hover:scale-105
                     ${active === "repo"
                       ? "bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg"
                       : "bg-transparent text-gray-600 hover:bg-purple-50"
                     }`}
          onClick={() => setActive("repo")}
        >
          <BiGitRepoForked className="text-xl" />
          <span className="hidden sm:inline">Repository Analytics</span>
          <span className="sm:hidden">Repos</span>
        </button>

        <button
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm md:text-base
                     transition-all duration-300 transform hover:scale-105
                     ${active === "bookmarks"
                       ? "bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg"
                       : "bg-transparent text-gray-600 hover:bg-purple-50"
                     }`}
          onClick={() => setActive("bookmarks")}
        >
          <BiBookmark className="text-xl" />
          <span className="hidden sm:inline">Bookmark Analytics</span>
          <span className="sm:hidden">Bookmarks</span>
        </button>
      </div>

      {/* Content */}
      <div className="space-y-6">
        {active === "repo" ? (
          <>
            <RepoAnalytics/>
            <Languageanalysis/>
            <Top10/>
          </>
        ) : (
          <>
            <BookmarkAnalytics/>
            <LanguageDistribution/>
            <RecentBookmarks/>
          </>
        )}
      </div>
    </div>
  );
}

export default AnalyticsSection;