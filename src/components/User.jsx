import React, { useState } from 'react'
import { BiSearch } from 'react-icons/bi'
import { LuUsers } from "react-icons/lu";
import UserAction from './UserAction';

function User() {
  const [query, setQuery] = useState("");

  function handleClick(){

  }
  return (
    <div className='flex-col flex items-start gap-3.5 justify-center py-3'>
      <div className='flex-col mt-5 flex items-start gap-3.5 justify-center w-full rounded-2xl bg-white shadow px-5 py-5 transition-all duration-300 border-8 border-purple-200 pb-10'>
        {/* Title */}
            <h1 className='text-2xl font-bold text-gray-800'>Search User</h1>
            
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
            
      </div>

      <UserAction/>
      </div>
  )
}

export default User