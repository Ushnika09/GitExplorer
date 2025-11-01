import React from 'react';
import { HiOutlineRefresh } from "react-icons/hi";
import AnalyticsDetails from '../components/AnalyticsDetails';

function Analytics() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className='text-3xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-3'>
            Analytics Dashboard
          </h1>
          <p className='text-gray-600 text-sm md:text-lg max-w-3xl'>
            Comprehensive insights into GitHub repository trends and your bookmarks
          </p>
        </div>
        <AnalyticsDetails/>
      </div>
    </div>
  );
}

export default Analytics;