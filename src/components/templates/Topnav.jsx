import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../../utils/axios";
import noImage from "/noImage.jpg";
import Sidenav from "./Sidenav";

const Topnav = () => {
  const [query, setQuery] = useState("");
  const [searches, setSearches] = useState([]);
  const [showMenu, setShowMenu] = useState(false);

  // Debounce search
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.trim().length > 0) {
        GetSearches();
      } else {
        setSearches([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  const GetSearches = async () => {
    try {
      const { data } = await axios.get(`/search/multi?query=${query}`);
      setSearches(data.results || []);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div className="w-full h-[10vh] flex items-center justify-between px-4 md:px-10 bg-black relative">
      {/* Hamburger Button (Mobile only) */}
      <button
        onClick={() => setShowMenu(true)}
        className="md:hidden text-3xl text-white"
      >
        <i className="ri-menu-line"></i>
      </button>

      {/* Centered Search Bar */}
      <div className="flex justify-center items-center w-full">
        <div className="relative w-full md:w-[60%]">
          <input
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            className="w-full pl-12 pr-10 py-3 md:py-4 rounded-full bg-zinc-800 text-zinc-200 placeholder-zinc-500 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-[#6556CD]"
            type="text"
            placeholder="Search movies, TV shows, people..."
          />
          <i className="ri-search-line absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 text-lg"></i>
          {query.length > 0 && (
            <i
              onClick={() => setQuery("")}
              className="ri-close-line absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 text-lg cursor-pointer hover:text-white"
            ></i>
          )}
        </div>
      </div>

      {/* Dropdown */}
      {query.length > 0 && searches.length > 0 && (
        <div className="absolute top-full left-0 md:left-1/2 md:-translate-x-1/2 w-full md:w-[50%] max-h-[60vh] bg-zinc-200 overflow-auto shadow-lg z-50 rounded mt-2">
          {searches.map((s, i) => (
            <Link
              to={`/${s.media_type}/details/${s.id}`}
              key={i}
              className="font-semibold text-zinc-600 w-full p-4 flex justify-start items-center border-b border-zinc-100 hover:text-black hover:bg-zinc-300 duration-300"
              onClick={() => setShowMenu(false)}
            >
              <img
                className="w-[50px] h-[50px] object-cover mr-4 rounded"
                src={
                  s.backdrop_path || s.profile_path
                    ? `https://image.tmdb.org/t/p/original/${
                        s.backdrop_path || s.profile_path
                      }`
                    : noImage
                }
                alt={s.name || s.title}
              />
              <span className="truncate">
                {s.name || s.title || s.original_name || s.original_title}
              </span>
            </Link>
          ))}
        </div>
      )}

      {/* Mobile Sidenav Overlay */}
      {showMenu && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-70">
          <Sidenav isMobile={true} closeMenu={() => setShowMenu(false)} />
        </div>
      )}
    </div>
  );
};

export default Topnav;
