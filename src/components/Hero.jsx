import React from "react";
import { FiGithub } from "react-icons/fi";

function Hero() {
  return (
    <div className="mx-3.5 my-5 px-2 py-12 flex justify-center items-center flex-row shadow-2xl border-8 rounded-3xl border-white bg-purple-100">
      <div className="flex gap-3 items shrink-0">
        <div
          className=" px-5 flex items-center bg-gradient-to-br from-blue-500 to-purple-600 
                  rounded-xl  text-xl
                  transition-opacity duration-200
                  animate-bounce shrink-0"
        >
          <FiGithub className="text-white shrink-0 text-3xl" />
        </div>
        <h1
          className="text-6xl md:text-7xl font-black 
          bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500
          bg-clip-text text-transparent duration-100 transition-colors"
        >
          GitExplorer
        </h1>
      </div>
    </div>
  );
}

export default Hero;
