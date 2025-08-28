import React, { useState } from "react";
import { RiArrowDropDownFill } from "react-icons/ri";

function Analyticsfilter() {
  const [activeTime, setActiveTime] = useState("Today");
  const [activeLang, setActiveLang] = useState("All languages");

  const Times = ["Today", "This Week", "This Month"];
  const Languages = [
    "All languages",
    "JavaScript",
    "Python",
    "Java",
    "TypeScript",
    "C#",
    "C++",
    "PHP",
    "C",
    "React",
    "Ruby",
  ];

  return (
    <div className="flex flex-row gap-5 my-5 w-full">

      {/* Time Dropdown */}
      <div className="relative">
        <select
          value={activeTime}
          onChange={(e) => setActiveTime(e.target.value)}
          className="py-2 px-4 rounded-xl border border-gray-300 shadow-sm bg-white text-gray-700 font-semibold appearance-none focus:outline-none focus:ring-2 focus:ring-purple-400"
        >
          {Times.map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </select>
        <RiArrowDropDownFill className='absolute right-2.5 top-1/2 -translate-y-1/2 text-2xl text-gray-600 pointer-events-none'/>
      </div>

      {/* Language Dropdown */}
      <div className="relative">
        <select
          value={activeLang}
          onChange={(e) => setActiveLang(e.target.value)}
          className="py-2 px-3 pr-12 rounded-xl border border-gray-300 shadow-sm bg-white text-gray-700 font-semibold appearance-none focus:outline-none focus:ring-2 focus:ring-purple-400"
        >
          {Languages.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
        <RiArrowDropDownFill className='absolute right-2.5 top-1/2 -translate-y-1/2 text-2xl text-gray-600 pointer-events-none'/>
      </div>

    </div>
  );
}

export default Analyticsfilter;
