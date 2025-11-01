import React, { useContext, useMemo } from "react";
import { BookmarkContext } from "../Context/BookmarkProvider";
import { IoMdCode } from "react-icons/io";
import { FaCircleInfo } from "react-icons/fa6";

function LanguageDistribution() {
  const { bookmarks } = useContext(BookmarkContext);

  // Count repos per language with memoization
  const topLanguages = useMemo(() => {
    const counts = {};
    bookmarks.forEach((repo) => {
      const lang = repo.language || "Not Specified";
      counts[lang] = (counts[lang] || 0) + 1;
    });
    return Object.entries(counts)
      .map(([language, count]) => ({ language, count }))
      .sort((a, b) => b.count - a.count);
  }, [bookmarks]);

  const total = topLanguages.reduce((acc, lang) => acc + lang.count, 0);

  // Color gradient generator based on index
  const getGradient = (index) => {
    const gradients = [
      "from-purple-500 to-indigo-600",
      "from-blue-500 to-cyan-600",
      "from-green-500 to-emerald-600",
      "from-yellow-500 to-orange-600",
      "from-pink-500 to-rose-600",
      "from-red-500 to-pink-600",
      "from-indigo-500 to-purple-600",
      "from-teal-500 to-green-600",
    ];
    return gradients[index % gradients.length];
  };

  if (bookmarks.length === 0) {
    return (
      <div className="bg-white shadow-lg rounded-2xl p-12 text-center border border-purple-100 max-w-6xl mx-auto">
        <div className="inline-block p-4 bg-purple-100 rounded-full mb-4">
          <IoMdCode className="text-4xl text-purple-500" />
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">No bookmarks to analyze</h3>
        <p className="text-gray-500">Start bookmarking repositories to see language distribution</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-lg rounded-3xl p-6 border border-purple-100">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-purple-100">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl shadow-lg">
            <IoMdCode className="text-2xl text-white" />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-800">Language Distribution</h2>
            <p className="text-sm text-gray-500">Programming languages in your bookmarks</p>
          </div>
        </div>

        {/* Info Tooltip */}
        <div className="relative group">
          <div className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors cursor-help">
            <FaCircleInfo className="text-lg text-gray-600" />
          </div>
          <div className="absolute right-0 top-full mt-2 w-48 p-3 bg-gray-800 text-white text-xs 
                        rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible 
                        transition-all duration-200 z-10 shadow-xl">
            <p>Based on {bookmarks.length} bookmarked {bookmarks.length === 1 ? 'repository' : 'repositories'}</p>
          </div>
        </div>
      </div>

      {/* Language Bars */}
      <div className="space-y-5">
        {topLanguages.map((lang, index) => {
          const percentage = total ? (lang.count / total) * 100 : 0;
          return (
            <div key={lang.language} className="group">
              {/* Language label and stats */}
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${getGradient(index)}`}></div>
                  <span className="font-semibold text-gray-800">{lang.language}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-gray-600">
                    {lang.count} {lang.count === 1 ? 'repo' : 'repos'}
                  </span>
                  <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full font-bold text-xs">
                    {Math.round(percentage)}%
                  </span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="relative w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${getGradient(index)} rounded-full 
                            transition-all duration-1000 ease-out transform origin-left
                            group-hover:scale-105`}
                  style={{ width: `${percentage}%` }}
                >
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent 
                                opacity-20 animate-shimmer"></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary */}
      <div className="mt-6 pt-6 border-t border-purple-100">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Total Languages:</span>
          <span className="font-bold text-purple-600">{topLanguages.length}</span>
        </div>
      </div>
    </div>
  );
}

export default LanguageDistribution;
