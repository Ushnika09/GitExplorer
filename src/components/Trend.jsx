import React, { useContext, useState } from "react";
import DataProvider, { DataContext } from "../Context/DataContext";
import RepoCard from "./RepoCard";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function Trend() {
  const [active, setActive] = useState("today");
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

  const { data, val, setVal, loading } = useContext(DataContext);
  // console.log(data, "trend");
  // console.log(val);

  let repos=data.items
  console.log(repos,"repos");

  function getDateRange(type) {
    const now = new Date();
    let daysAgo = 1; // default = Today (yesterday actually)

    if (type === "week") daysAgo = 7;
    if (type === "month") daysAgo = 30;

    const target = new Date(now.setDate(now.getDate() - daysAgo));
    return target.toISOString().split("T")[0]; // YYYY-MM-DD
  }

  return (
    <div className="flex-col flex gap-10">
      <div className="flex-col flex items-start gap-3.5 justify-center  rounded-xl bg-white shadow px-5 py-5 transition-all duration-300 ">
        <h1 className="text-2xl font-bold">Trending Repositories</h1>
        <h1 className="text-gray-700 font-bold ">Time Range</h1>
        <div className="flex gap-5 flex-row font-semibold pb-2">
          <button
            className={`  py-1.5 px-5 md:px-10 rounded-2xl justify-center items-center today ${
              active == "today"
                ? "bg-purple-500 text-white hover:bg-purple-500/70"
                : "bg-purple-100/60 hover:bg-purple-200"
            }`}
            onClick={() => {
                setActive("today")
                setVal({ ...val, time: getDateRange("today") })
            }}
          >
            Today
          </button>

          <button
            className={`  py-1.5 px-5 md:px-10 rounded-2xl justify-center items-center week ${
              active == "week"
                ? "bg-purple-500 text-white hover:bg-purple-500/70"
                : "bg-purple-100/60 hover:bg-purple-200"
            }`}
            onClick={() => {
                setActive("week");
                setVal({ ...val, time: getDateRange("week") })
            }}
          >
            This week
          </button>

          <button
            className={`  py-1.5 px-5 md:px-10 rounded-2xl justify-center items-center month ${
              active == "month"
                ? "bg-purple-500 text-white hover:bg-purple-500/70"
                : "bg-purple-100/60 hover:bg-purple-200"
            }`}
            onClick={() => {
                setActive("month")
                setVal({ ...val, time: getDateRange("month") })
            }}
          >
            This Month
          </button>
        </div>
        <h1 className="text-gray-700 font-bold ">Language</h1>
        <div className="flex gap-2.5 items-center flex-wrap ">
          {Languages.map((item) => {
            return (
              <button
                className={`  py-1.5 px-5  rounded-2xl items-center text-nowrap font-bold ${item} 
                            ${
                              val.lang == item
                                ? "bg-purple-500 text-white hover:bg-purple-500/70"
                                : "bg-purple-100/60 hover:bg-purple-200"
                            }`}
                onClick={() => setVal({ ...val, lang: item })}
              >
                {item}
              </button>
            );
          })}
        </div>
      </div>
      {repos == 0 || loading ? (
        <div className=" flex items-center h-[10rem] gap-3.5 justify-center  rounded-xl bg-white shadow px-5 py-5 transition-all duration-300  ">
          <AiOutlineLoading3Quarters className="animate-spin text-3xl text-purple-500" />
          <h1 className="text-3xl text-purple-500">Loading</h1>
        </div>
      ) : (
        <>
          <h1 className="text-2xl font-bold">
            Trending
            <span className="px-0.5">({repos.length})</span>
          </h1>

          <RepoCard data={repos} val={val} />
        </>
      )}
    </div>
  );
}

export default Trend;
