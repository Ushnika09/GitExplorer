import React, { useEffect, useRef, useState } from "react";
import { FiGithub } from "react-icons/fi";
import { MdAutoGraph } from "react-icons/md";
import { BsBookmarks } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";
import { IoMdTrendingUp } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";

function Header() {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <div className="">
      <div className="py-4 shadow px-5 flex items-center justify-between w-full transition-all duration-700">
        {/* overlay */}
        {open && (
          <div
            className="inset-0 bg-black/60 fixed z-40"
            onClick={() => setOpen(false)}
          ></div>
        )}

        {/* left */}
        <div className="flex gap-3 items bg-gradient-to-l from-blue-500 to-purple-600 bg-clip-text text-transparent ">
          <div
            className="py-3.5 px-3.5 flex items-center bg-gradient-to-br from-blue-500 to-purple-600 
            rounded-xl  text-2xl
            transition-opacity duration-200"
          >
            <FiGithub className="text-white " />
          </div>
          <div>
            <h1 className="text-2xl font-bold">GitExplorer</h1>
            <h1 className="text-sm text-gray-700/60 text-nowrap">
              Discover GitHub repositories
            </h1>
          </div>
        </div>

        {/* middle */}
        <div className="hidden md:flex lg:gap-4 gap-1.5 transition-all duration-300">
          <Link
            to="/"
            className={`transition-all duration-300 flex gap-2 px-5 py-2 rounded-3xl font-medium items-center ${
              location.pathname === "/"
                ? "bg-blue-700 text-white hover:bg-blue-800"
                : "bg-white hover:bg-neutral-200"
            }`}
          >
            <FiGithub />
            <span>Explorer</span>
          </Link>

          <Link
            to="/analytics"
            className={`transition-all duration-300 flex gap-2 px-5 py-2 rounded-3xl font-medium items-center ${
              location.pathname === "/analytics"
                ? "bg-blue-700 text-white hover:bg-blue-800"
                : "bg-white hover:bg-neutral-200"
            }`}
          >
            <MdAutoGraph />
            <span>Analytics</span>
          </Link>

          <Link
            to="/bookmarks"
            className={`transition-all duration-300 flex gap-2 px-5 py-2 rounded-3xl font-medium items-center ${
              location.pathname === "/bookmarks"
                ? "bg-blue-700 text-white hover:bg-blue-800"
                : "bg-white hover:bg-neutral-200"
            }`}
          >
            <BsBookmarks />
            <span>Bookmarks</span>
          </Link>
        </div>

        {/* right */}
        <div className="hidden lg:flex flex-row">
          <button
            className={`transition-all duration-300 flex gap-1 px-3 py-1.5 rounded-3xl font-medium items-center text-15803D 
            bg-gradient-to-r from-green-50 to-emerald-50 
            border border-green-200 
            shadow-sm text-[0.8rem] shrink-0`}
          >
            <div className="p-1.5 rounded-full animate-pulse bg-green-200">
              <IoMdTrendingUp className=" " />
            </div>
            <span className="text-nowrap">Live Trending</span>
          </button>
        </div>

        <GiHamburgerMenu
          className="text-2xl md:hidden cursor-pointer"
          onClick={() => setOpen(!open)}
        />
      </div>

      {open && (
        <div className="flex flex-col absolute top-0 right-0 pt-5 z-50 items-center justify-start bg-white w-64 min-h-screen shadow transition-all duration-700">
          <RxCross2
            className="absolute right-5 top-5 text-xl rounded-full border cursor-pointer"
            onClick={() => setOpen(false)}
          />
          {/* left */}
          <div className="flex gap-3 items-center my-5">
            <div className=" flex items-center  shrink-0">
              <FiGithub className="text-white text-4xl shrink-0  bg-blue-700 rounded-full p-2" />
            </div>
            <div>
              <h1 className="text-xl font-bold ">GitExplorer</h1>
              <h1 className="text-[0.7rem] text-gray-700/60 text-nowrap">
                Discover GitHub repositories
              </h1>
            </div>
          </div>

          {/* middle */}
          <div className="flex flex-col gap-1.5 transition-all duration-300 my-5 w-full">
            <Link
              to="/"
              className={`transition-all duration-300 flex gap-2 px-5 py-2 font-medium items-center ${
                location.pathname === "/"
                  ? "bg-blue-700 text-white hover:bg-blue-800"
                  : "bg-white hover:bg-neutral-200"
              }`}
            >
              <FiGithub />
              <span>Explorer</span>
            </Link>

            <Link
              to="/analytics"
              className={`transition-all duration-300 flex gap-2 px-5 py-2 font-medium items-center ${
                location.pathname === "/analytics"
                  ? "bg-blue-700 text-white hover:bg-blue-800"
                  : "bg-white hover:bg-neutral-200"
              }`}
            >
              <MdAutoGraph />
              <span>Analytics</span>
            </Link>

            <Link
              to="/bookmarks"
              className={`transition-all duration-300 flex gap-2 px-5 py-2 font-medium items-center ${
                location.pathname === "/bookmarks"
                  ? "bg-blue-700 text-white hover:bg-blue-800"
                  : "bg-white hover:bg-neutral-200"
              }`}
            >
              <BsBookmarks />
              <span>Bookmarks</span>
            </Link>
          </div>

          {/* right */}
          <div className="flex flex-col mx-3 rounded-2xl justify-center items-center py-4 px-2 shadow-sm bg-gradient-to-r from-green-50 to-emerald-50 ">
            <button
              className={`transition-all duration-300 flex gap-1 px-3 py-1.5  font-medium items-center text-15803D 
            w-full
             shrink-0`}
            >
              <div className="p-1.5 rounded-full animate-pulse bg-green-200">
                <IoMdTrendingUp className=" " />
              </div>
              <span className="text-nowrap">Live Data</span>
            </button>
            <p className="text-center text-sm pb-3">
              Explore real-time trending repositories from GitHub's API
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
