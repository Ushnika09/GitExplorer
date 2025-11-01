import React, { useState } from "react";
import { RiArrowDropDownFill } from "react-icons/ri";
import { BiCalendar, BiCode } from "react-icons/bi";
import { useData } from "../Context/DataContext";

function AnalyticsFilter() {
  const { setVal, val } = useData();
  const [activeTime, setActiveTime] = useState("Today");
  const [activeLang, setActiveLang] = useState("All languages");

  function getDateRange(type) {
    const now = new Date();
    let daysAgo = 1;
    if (type === "week") daysAgo = 7;
    if (type === "month") daysAgo = 30;
    const target = new Date(now.setDate(now.getDate() - daysAgo));
    return target.toISOString().split("T")[0];
  }

  const Times = ["Today", "This Week", "This Month"];
  const Languages = [
    "All languages", "JavaScript", "Python", "Java", "TypeScript",
    "C#", "C++", "PHP", "C", "React", "Ruby", "Go", "Rust"
  ];

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 mb-6 border border-purple-100">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Time Filter */}
        <div className="flex-1">
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <BiCalendar className="text-purple-500" />
            Time Range
          </label>
          <div className="relative">
            <select
              value={activeTime}
              onChange={(e) => {
                const selected = e.target.value;
                setActiveTime(selected);
                let key = "today";
                if (selected === "This Week") key = "week";
                if (selected === "This Month") key = "month";
                setVal({ ...val, time: getDateRange(key) });
              }}
              className="w-full py-3 px-4 pr-10 rounded-xl border-2 border-purple-100 bg-purple-50 
                       text-gray-700 font-medium appearance-none cursor-pointer
                       focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white
                       transition-all duration-200 hover:border-purple-300"
            >
              {Times.map((time) => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>
            <RiArrowDropDownFill className='absolute right-3 top-1/2 -translate-y-1/2 text-2xl text-purple-500 pointer-events-none'/>
          </div>
        </div>

        {/* Language Filter */}
        <div className="flex-1">
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <BiCode className="text-purple-500" />
            Programming Language
          </label>
          <div className="relative">
            <select
              value={activeLang}
              onChange={(e) => {
                setActiveLang(e.target.value);
                setVal({ ...val, lang: e.target.value });
              }}
              className="w-full py-3 px-4 pr-10 rounded-xl border-2 border-purple-100 bg-purple-50 
                       text-gray-700 font-medium appearance-none cursor-pointer
                       focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white
                       transition-all duration-200 hover:border-purple-300"
            >
              {Languages.map((lang) => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
            <RiArrowDropDownFill className='absolute right-3 top-1/2 -translate-y-1/2 text-2xl text-purple-500 pointer-events-none'/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsFilter;