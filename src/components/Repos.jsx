import React, { useState } from 'react'
import { BiSearch } from 'react-icons/bi'
import { RiArrowDropDownFill } from "react-icons/ri";
import FiltersDropdown from './FiltersDropdown';
import RepoAction from './RepoAction';

function Repos() {
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("stars");
  const [order, setOrder] = useState("desc");

  function handleClick() {
    console.log("Searching for:", query);
    console.log("Sort By:", sortBy);
    console.log("Order:", order);
    // 🔥 You can add your API call here later
  }

  return (
    <div className='flex flex-col items-start gap-5 justify-center '>
      
    <div className='w-full rounded-2xl bg-white shadow px-5 py-5 transition-all duration-300 border-8 border-purple-200 gap-5 flex flex-col items-start justify-center'>
            {/* Title */}
      <h1 className='text-2xl font-bold text-gray-800'>Search Repositories</h1>
      
      {/* Search Box */}
      <div className='relative w-full'>
        <input 
          type="text" 
          placeholder='Search Repositories...' 
          className='px-3 pl-10 py-3.5 w-full border-2 border-purple-300 rounded-2xl bg-neutral-100 
                     focus:ring-2 focus:ring-purple-500 focus:outline-none'
          onChange={(e) => setQuery(e.target.value)}
          value={query}
        />
        <BiSearch className='text-2xl absolute left-3 top-1/2 -translate-y-1/2 text-gray-500'/>
        
        <button 
          className='absolute top-1/2 -translate-y-1/2 right-2 rounded-xl py-2 px-5 bg-purple-600 
                     hover:bg-purple-700 transition text-white font-semibold'
          onClick={handleClick}
        >
          Search
        </button>
      </div>

      {/* Sorting + Filters */}
      <div className='flex flex-wrap gap-5 items-center my-3'>
        <h2 className='font-bold text-xl text-gray-800'>Sort By:</h2>

        {/* Sort By Dropdown */}
        <div className='relative w-28 text-sm md:text-xl md:w-32'>
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className='w-full px-5 py-2 rounded-xl bg-neutral-100 border border-neutral-300 
                       appearance-none focus:ring-2 focus:ring-purple-500 focus:outline-none
                       hover:bg-neutral-200 transition'
          >
            <option value="stars">Stars</option>
            <option value="forks">Forks</option>
            <option value="updated">Updated</option>
          </select>
          <RiArrowDropDownFill className='absolute right-2.5 top-1/2 -translate-y-1/2 text-2xl text-gray-600 pointer-events-none'/>
        </div>

        {/* Order Dropdown */}
        <div className='relative w-23 text-sm md:text-xl md:w-28'>
          <select 
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            className='w-full px-5 py-2 rounded-xl bg-neutral-100 border border-neutral-300 
                       appearance-none focus:ring-2 focus:ring-purple-500 focus:outline-none
                       hover:bg-neutral-200 transition'
          >
            <option value="asc">Asc</option>
            <option value="desc">Desc</option>
          </select>
          <RiArrowDropDownFill className='absolute right-2.5 top-1/2 -translate-y-1/2 text-2xl text-gray-600 pointer-events-none'/>
        </div>

        {/* Filters */}
        <FiltersDropdown/>
      </div>
    </div>
    <RepoAction/>
    </div>
  )
}

export default Repos;
