import React, { useState, useRef, useEffect } from "react";
import { RiArrowDropDownFill } from "react-icons/ri";

function FiltersDropdown({ val, setVal }) {
  const [open, setOpen] = useState(false);
  const [dropUp, setDropUp] = useState(false);
  const ref = useRef();

  const Languages = [
    "All languages",
    "JavaScript",
    "Python",
    "Java",
    "TypeScript",
    "C#",
    "C++",
    "PHP",
    "C",
    "React",
    "Ruby",
  ];

  // close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // detect whether to open up or down
  useEffect(() => {
    if (open && ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      setDropUp(spaceBelow < 300);
    }
  }, [open]);

  // handlers
  const handleLanguageChange = (e) => {
    const lang = e.target.value;
    setVal((prev) => ({
      ...prev,
      language: lang === "All languages" ? "" : lang,
    }));
  };

  const handleStarsChange = (e) => {
    setVal((prev) => ({
      ...prev,
      minStars: Number(e.target.value),
    }));
  };

  const handleCreatedChange = (e) => {
    setVal((prev) => ({
      ...prev,
      created: e.target.value,
    }));
  };

  return (
    <div className="relative" ref={ref}>
      {/* Trigger */}
      <button
        onClick={() => setOpen(!open)}
        className="px-5 py-2 rounded-xl bg-neutral-100 border border-neutral-300 
                   flex items-center gap-2 hover:bg-neutral-200"
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
            <select
              value={val.language || "All languages"}
              onChange={handleLanguageChange}
              className="w-full px-3 py-2 border rounded-xl bg-neutral-100 focus:ring-2 focus:ring-purple-500"
            >
              {Languages.map((lang, idx) => (
                <option key={idx} value={lang}>
                  {lang}
                </option>
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
              value={val.minStars ?? 5000}
              onChange={handleStarsChange}
              className="w-full accent-purple-500"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>0</span>
              <span className="font-semibold text-purple-600">
                {val.minStars ?? 5000}
              </span>
              <span>10000+</span>
            </div>
          </div>

          {/* Created */}
          <div className="relative">
            <label className="block text-sm font-semibold mb-1">Created</label>
            <select
              value={val.created || "Any time"}
              onChange={handleCreatedChange}
              className="w-full px-3 py-2 border rounded-xl bg-neutral-100 focus:ring-2 focus:ring-purple-500 appearance-none"
            >
              <option value="Any time">Any time</option>
              <option value="Past week">Past week</option>
              <option value="Past month">Past month</option>
            </select>
            <RiArrowDropDownFill className="absolute right-2.5 top-7  text-3xl text-gray-600 pointer-events-none" />
          </div>
        </div>
      )}
    </div>
  );
}

export default FiltersDropdown;
