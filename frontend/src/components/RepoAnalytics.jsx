import { useEffect, useState } from "react";
import { MdAutoGraph } from "react-icons/md";
import { FaRegStar } from "react-icons/fa";
import { FaCodeFork } from "react-icons/fa6";
import { MdOutlineReportProblem } from "react-icons/md";
import { useData } from "../Context/DataContext";
import { FaCircleInfo } from "react-icons/fa6";
import useFetchAllRepos from "../../utils/FetchAllRepos";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function RepoAnalytics() {
  const { data } = useData();
  const { totalStars, totalForks, totalIssues, mostUsedLanguage, loading } = useFetchAllRepos();

  const cards = [
    {
      title: "Total Repositories",
      value: data?.total_count?.toLocaleString() || "0",
      subtitle: `Most: ${mostUsedLanguage}`,
      icon: MdAutoGraph,
      gradient: "from-purple-500 to-indigo-500",
      bgGradient: "from-purple-50 to-indigo-50",
      info: "Total matching repositories found"
    },
    {
      title: "Total Stars",
      value: totalStars.toLocaleString(),
      subtitle: `Avg ${Math.ceil(totalStars / 1000)} per repo`,
      icon: FaRegStar,
      gradient: "from-yellow-500 to-orange-500",
      bgGradient: "from-yellow-50 to-orange-50",
      info: "Based on sample of 1000 repos"
    },
    {
      title: "Total Forks",
      value: totalForks.toLocaleString(),
      subtitle: `Avg ${Math.ceil(totalForks / 1000)} per repo`,
      icon: FaCodeFork,
      gradient: "from-green-500 to-emerald-500",
      bgGradient: "from-green-50 to-emerald-50",
      info: "Based on sample of 1000 repos"
    },
    {
      title: "Open Issues",
      value: totalIssues.toLocaleString(),
      subtitle: "Active development",
      icon: MdOutlineReportProblem,
      gradient: "from-red-500 to-pink-500",
      bgGradient: "from-red-50 to-pink-50",
      info: "Based on sample of 1000 repos"
    }
  ];

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4 bg-white rounded-2xl shadow-lg border border-purple-100">
        <AiOutlineLoading3Quarters className="animate-spin text-5xl text-purple-500" />
        <h1 className="text-xl text-purple-600 font-semibold">Loading analytics...</h1>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            key={idx}
            className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${card.bgGradient} 
                       border border-purple-100 shadow-lg hover:shadow-xl 
                       transition-all duration-300 hover:scale-105 group`}
          >
            <div className="p-6">
              {/* Header with info */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-700 mb-1">{card.title}</h3>
                  
                  {/* Info Tooltip */}
                  <div className="relative group/info inline-block">
                    <FaCircleInfo className="text-xs text-gray-400 hover:text-gray-600 cursor-help" />
                    <div className="absolute left-0 top-full mt-1 w-40 p-2 bg-gray-800 text-white text-xs 
                                  rounded-lg opacity-0 invisible group-hover/info:opacity-100 
                                  group-hover/info:visible transition-all duration-200 z-10 shadow-xl">
                      {card.info}
                    </div>
                  </div>
                </div>

                {/* Icon */}
                <div className={`p-3 rounded-xl bg-gradient-to-br ${card.gradient} 
                               shadow-lg transform group-hover:rotate-12 transition-transform duration-300`}>
                  <Icon className="text-xl text-white" />
                </div>
              </div>

              {/* Value */}
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                {card.value}
              </h2>

              {/* Subtitle */}
              <p className="text-sm text-gray-600 truncate">{card.subtitle}</p>
            </div>

            {/* Decorative element */}
            <div className={`absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-br ${card.gradient} 
                           opacity-10 rounded-full blur-2xl`}></div>
          </div>
        );
      })}
    </div>
  );
}

export default RepoAnalytics;