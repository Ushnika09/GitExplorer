import React, { useState, useRef, useEffect } from "react";
import { RiArrowDropDownFill } from "react-icons/ri";

function FiltersDropdown({val,setval}) {
  const [open, setOpen] = useState(false);
  const [stars, setStars] = useState(5000); // ✅ default value = 5000
  const [dropUp, setDropUp] = useState(false);
  const ref = useRef();
  const Languages = ["All languages","JavaScript","Python","Java","TypeScript","C#","C++","PHP","C","React","Ruby",];

  // close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // detect whether to open up or down
  useEffect(() => {
    if (open && ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      setDropUp(spaceBelow < 300); // if less than 300px space, open upwards
    }
  }, [open]);

  return (
    <div className="relative " ref={ref}>
      {/* Trigger */}
      <button
        onClick={() => setOpen(!open)}
        className="px-5 py-2 rounded-xl bg-neutral-100 border border-neutral-300 
                   flex items-center gap-2 hover:bg-neutral-200 "
      >
        <span className="md:text-xl text-sm">Filters</span>
        <RiArrowDropDownFill
          className={`text-2xl text-gray-600 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown panel */}
      {open && (
        <div
          className={`absolute ${
            dropUp ? "bottom-full mb-2" : "top-full mt-2"
          } w-80 bg-white shadow-xl border rounded-2xl p-4 z-20`}
        >
          <h2 className="text-lg font-bold mb-3">Advanced Filters</h2>

          {/* Language */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">Language</label>
            <select className="w-full px-3 py-2 border rounded-xl bg-neutral-100 focus:ring-2 focus:ring-purple-500">
              {Languages.map((lang, idx) => (
                <option key={idx} >
                  {lang}</option>
                
              ))}
            </select>
          </div>

          {/* Minimum Stars */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">
              Minimum Stars
            </label>
            <input
              type="range"
              min="0"
              max="10000"
              step="100"
              value={stars}
              onChange={(e) => setStars(Number(e.target.value))}
              className="w-full accent-purple-500"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>0</span>
              <span className="font-semibold text-purple-600">{stars}</span>
              <span>10000+</span> {/* ✅ Changed from 10000 to 10000+ */}
            </div>
          </div>

          {/* Created */}
          <div>
            <label className="block text-sm font-semibold mb-1">Created</label>
            <select className="w-full px-3 py-2 border rounded-xl bg-neutral-100 focus:ring-2 focus:ring-purple-500">
              <option>Any time</option>
              <option>Past week</option>
              <option>Past month</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
}

export default FiltersDropdown;
