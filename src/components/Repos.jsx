import React, { useEffect, useState } from 'react'
import { BiSearch } from 'react-icons/bi'
import { RiArrowDropDownFill } from "react-icons/ri";
import FiltersDropdown from './FiltersDropdown';
import RepoAction from './RepoAction';
import githubGet from "../../utils/Githubapi";
import { useData } from "../Context/DataContext";
import RepoCard from './RepoCard';

function Repos() {
  const { val, setVal } = useData();

  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("stars");
  const [order, setOrder] = useState("desc");
  const [allRepos, setAllRepos] = useState([]); // raw repos from API
  const [repos, setRepos] = useState([]);       // filtered repos

  // 🔥 Fetch from GitHub
  const fetchSearchRepo = async () => {
    if (!query.trim()) return;
    try {
      const res = await githubGet(`/search/repositories`, {
        q: `${query} in:name`,
        sort: sortBy,
        order: order,
      });

      let reposFetched = res?.items || res?.data?.items || [];

      // Filter names starting with query (case-insensitive)
      reposFetched = reposFetched.filter(repo =>
        repo.name.toLowerCase().startsWith(query.toLowerCase())
      );

      setAllRepos(reposFetched); // store raw result
    } catch (error) {
      console.error("Error fetching repos:", error);
    }
  };

  // 🎯 Apply filters & sorting whenever val / sortBy / order / allRepos changes
  useEffect(() => {
    let filtered = [...allRepos];

    // Language filter
    if (val?.language) {
      filtered = filtered.filter(repo =>
        repo.language?.toLowerCase() === val.language.toLowerCase()
      );
    }

    // License filter
    if (val?.license) {
      filtered = filtered.filter(repo => repo.license?.key === val.license);
    }

    // Example: minimum stars filter
    if (val?.minStars) {
      filtered = filtered.filter(repo => repo.stargazers_count >= val.minStars);
    }

    // Sort (client-side fallback if GitHub doesn’t apply fully)
    if (sortBy === "stars") {
      filtered.sort((a, b) =>
        order === "asc"
          ? a.stargazers_count - b.stargazers_count
          : b.stargazers_count - a.stargazers_count
      );
    } else if (sortBy === "forks") {
      filtered.sort((a, b) =>
        order === "asc" ? a.forks_count - b.forks_count : b.forks_count - a.forks_count
      );
    } else if (sortBy === "updated") {
      filtered.sort((a, b) =>
        order === "asc"
          ? new Date(a.updated_at) - new Date(b.updated_at)
          : new Date(b.updated_at) - new Date(a.updated_at)
      );
    }
    // inside useEffect in Repos.jsx
if (val?.created) {
  const now = new Date();
  filtered = filtered.filter(repo => {
    const created = new Date(repo.created_at);

    if (val.created === "Past week") {
      return now - created <= 7 * 24 * 60 * 60 * 1000;
    }
    if (val.created === "Past month") {
      return now - created <= 30 * 24 * 60 * 60 * 1000;
    }
    return true; // "Any time"
  });
}


    setRepos(filtered);
  }, [val, sortBy, order, allRepos]);

  // 🔎 Trigger search on button click
  function handleClick() {
    fetchSearchRepo();
  }

  // ⌨️ Trigger search on Enter key
  function handleKeyDown(e) {
    if (e.key === "Enter") {
      fetchSearchRepo();
    }
  }

  return (
    <div className='flex flex-col items-start gap-5 justify-center '>
      <div className='w-full rounded-2xl bg-white shadow px-5 py-5 transition-all duration-300 gap-5 flex flex-col items-start justify-center'>
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
            onKeyDown={handleKeyDown} 
            value={query}
          />
          <BiSearch className='text-2xl absolute left-3 top-1/2 -translate-y-1/2 text-gray-500'/>
          
          <button 
            className={`absolute top-1/2 -translate-y-1/2 right-2 rounded-xl py-2 px-5 font-semibold transition 
                        ${query.trim() 
                          ? "bg-purple-600 hover:bg-purple-700 text-white cursor-pointer" 
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
            onClick={handleClick}
            disabled={!query.trim()}
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
          <FiltersDropdown val={val} setVal={setVal}/>
        </div>
      </div>

      {/* Show repos or fallback */}
      {repos.length > 0 
        ? (
          <div className='flex flex-col gap-7 '>
            <h1 className='text-3xl font-medium'>Total Repositories ({repos.length})</h1>
            <RepoCard data={repos}/>
          </div>
        )
        : <RepoAction/>}
    </div>
  )
}

export default Repos;
