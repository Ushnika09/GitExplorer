import React from 'react'
import { HiOutlineRefresh } from "react-icons/hi";
import AnalyticsDetails from '../components/AnalyticsDetails';

function Analytics() {
  return (
    <div className="flex flex-col justify-center my-7 mx-5">
      <h1 className='text-4xl font-bold'>Analytics Dashboard</h1>
      {/* Refresh */}
      <div className='flex items-center justify-between gap-5'>
        <h1 className='font-medium text-gray-600/80 text-nowrap text-[0.7rem] md:text-xl'>Comprehensive insights into GitHub repository trends and your bookmarks</h1>
        <button className={`flex gap-1 md:font-bold py-1.5 md:py-2.5 px-3 md:px-10 rounded-2xl justify-center items-center trend bg-purple-500 text-sm md:text-xl font-medium text-white hover:bg-purple-500/70`}>
          <HiOutlineRefresh/>
          Refresh
        </button>
      </div>
      <AnalyticsDetails/>
    </div>
  )
}

export default Analytics