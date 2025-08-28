import React from 'react'
import { PiBookmarkSimpleBold } from "react-icons/pi";
import { FaRegStar } from 'react-icons/fa'
import { FaCodeFork } from 'react-icons/fa6'
import { MdAutoGraph } from "react-icons/md";



function BookmarkAnalytics() {
  return (
    <div className='grid-cols-1 grid items-center md:grid-cols-2 lg:grid-cols-4 justify-between py-5 gap-10 flex-wrap'>
            <div className='flex flex-col gap-1.5 shadow rounded-2xl flex-1 bg-white px-7.5 py-5.5'>
                <div className='flex items-center gap-10 justify-between'>
                <h1 className='font-medium text-nowrap'>Total Bookmarks</h1>
                <PiBookmarkSimpleBold />
            </div>
            <h1 className='text-4xl font-bold'>30</h1>
            <h1 className='text-gray-600/90 text-sm text-nowrap'>Personal collection</h1>
            </div>
    
            <div className='flex flex-col gap-1.5 shadow rounded-2xl flex-1 bg-white px-7.5 py-5.5'>
                <div className='flex items-center gap-15 justify-between'>
                <h1 className='font-medium text-nowrap'>Total Stars</h1>
                <FaRegStar/>
            </div>
            <h1 className='text-4xl font-bold'>11.3k</h1>
            <h1 className='text-gray-600/90 text-sm text-nowrap'>Avg 376 per repo</h1>
            </div>
    
            <div className='flex flex-col gap-1.5 shadow rounded-2xl flex-1 bg-white px-7.5 py-5.5'>
                <div className='flex items-center gap-15 justify-between'>
                <h1 className='font-medium text-nowrap'>Total Forks</h1>
                <FaCodeFork/>
            </div>
            <h1 className='text-4xl font-bold'>753</h1>
            <h1 className='text-gray-600/90 text-sm text-nowrap'>Community engagement</h1>
            </div>
    
            <div className='flex flex-col gap-1.5 shadow rounded-2xl flex-1 bg-white px-7.5 py-5.5'>
                <div className='flex items-center gap-15 justify-between'>
                <h1 className='font-medium text-nowrap'>Most Starred</h1>
                <MdAutoGraph/>
            </div>
            <h1 className='text-2xl font-bold'>vimmaster</h1>
            <h1 className='text-gray-600/90 text-sm text-nowrap'>675 stars</h1>
            </div>
    
        </div>
  )
}

export default BookmarkAnalytics