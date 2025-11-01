import React, { useContext, useMemo } from "react";
import { PiBookmarkSimpleBold } from "react-icons/pi";
import { FaRegStar } from "react-icons/fa";
import { FaCodeFork } from "react-icons/fa6";
import { MdAutoGraph } from "react-icons/md";
import { BookmarkContext } from "../Context/BookmarkProvider";

function BookmarkAnalytics() {
  const { bookmarks } = useContext(BookmarkContext);

  const analytics = useMemo(() => {
    let totalStars = 0;
    let totalForks = 0;
    let mostStarred = { name: "", stars: 0 };

    bookmarks.forEach((repo) => {
      totalStars += repo.stargazers_count || 0;
      totalForks += repo.forks_count || 0;
      if ((repo.stargazers_count || 0) > mostStarred.stars) {
        mostStarred = { name: repo.name, stars: repo.stargazers_count };
      }
    });

    const avgStars = bookmarks.length ? Math.round(totalStars / bookmarks.length) : 0;
    return { totalStars, totalForks, mostStarred, avgStars };
  }, [bookmarks]);

  const cards = [
    {
      title: "Total Bookmarks",
      value: bookmarks.length,
      subtitle: "Personal collection",
      icon: PiBookmarkSimpleBold,
      gradient: "from-purple-500 to-indigo-500",
      bgGradient: "from-purple-50 to-indigo-50"
    },
    {
      title: "Total Stars",
      value: analytics.totalStars.toLocaleString(),
      subtitle: `Avg ${analytics.avgStars} per repo`,
      icon: FaRegStar,
      gradient: "from-yellow-500 to-orange-500",
      bgGradient: "from-yellow-50 to-orange-50"
    },
    {
      title: "Total Forks",
      value: analytics.totalForks.toLocaleString(),
      subtitle: "Community engagement",
      icon: FaCodeFork,
      gradient: "from-green-500 to-emerald-500",
      bgGradient: "from-green-50 to-emerald-50"
    },
    {
      title: "Most Starred",
      value: analytics.mostStarred.name || "N/A",
      subtitle: `${analytics.mostStarred.stars || 0} stars`,
      icon: MdAutoGraph,
      gradient: "from-pink-500 to-rose-500",
      bgGradient: "from-pink-50 to-rose-50",
      truncate: true
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-7 max-w-6xl">
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
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-700">{card.title}</h3>
                <div className={`p-3 rounded-xl bg-gradient-to-br ${card.gradient} 
                               shadow-lg transform group-hover:rotate-12 transition-transform duration-300`}>
                  <Icon className="text-xl text-white" />
                </div>
              </div>

              {/* Value */}
              <h2 className={`text-3xl md:text-4xl font-bold text-gray-800 mb-2 
                            ${card.truncate ? 'truncate' : ''}`}>
                {card.value}
              </h2>

              {/* Subtitle */}
              <p className="text-sm text-gray-600">{card.subtitle}</p>
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

export default BookmarkAnalytics;