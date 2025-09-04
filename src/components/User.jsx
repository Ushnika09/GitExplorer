import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";
import UserAction from "./UserAction";
import UserList from "./UserList";
import githubGet from "../../utils/Githubapi";
import { VscLoading } from "react-icons/vsc";

function User() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleClick() {
    if (!query.trim()) return;
    setLoading(true);
    setError("");
    try {
      const data = await githubGet("search/users", {
        q: `${query} in:login`,
        per_page: 20,
      });

      const filtered = data.items.filter((user) =>
        user.login.toLowerCase().startsWith(query.toLowerCase())
      );

      setResults(filtered);
      setQuery("")
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Failed to fetch users. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex-col flex items-start gap-3.5 justify-center py-5">
      <div className="flex-col mt-5 flex items-start gap-3.5 justify-center w-full rounded-2xl bg-white shadow px-10 py-9  transition-all duration-300  pb-15">
        <h1 className="text-2xl font-bold text-gray-800 pl-1.5">Search User</h1>

        {/* Search Box */}
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search GitHub users..."
            className="px-3 pl-10 py-3.5 w-full border-2 border-purple-300 rounded-2xl bg-neutral-100 
                       focus:ring-2 focus:ring-purple-500 focus:outline-none"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleClick();
              }
            }}
          />
          <BiSearch className="text-2xl absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />

          <button
            className={`absolute top-1/2 -translate-y-1/2 right-2 rounded-xl py-2 px-5 
    font-semibold transition
    ${
      query.trim()
        ? "bg-purple-600 hover:bg-purple-700 text-white cursor-pointer"
        : "bg-purple-300 text-gray-200 cursor-not-allowed"
    }`}
            onClick={handleClick}
            disabled={!query.trim()}
          >
            Search
          </button>
        </div>
      </div>

      {/* States */}
      {loading && (
        <p className="text-gray-500 mt-4 w-full m-auto flex justify-center items-center gap-2">
          <VscLoading className="text-3xl animate-spin text-purple-500" />
          Loading...
        </p>
      )}
      {error && <p className="text-red-500 mt-4">{error}</p>}

      {/* Before search */}
      {!loading && results.length === 0 && !error && <UserAction />}

      {/* Results */}
      <UserList users={results} />
    </div>
  );
}

export default User;
