import React from "react";
import { Link } from "react-router-dom";

const Sidenav = ({ isMobile = false, closeMenu }) => {
  return (
    <div
      className={`${
        isMobile
          ? "fixed top-0 left-0 w-[70%] h-full z-50 bg-black flex flex-col p-6"
          : "hidden md:flex md:flex-col md:w-[20%] h-full border-r-2 border-zinc-400 p-10 bg-black md:static"
      }`}
    >
      {/* Logo + Close for mobile */}
      <h1 className="text-2xl text-white font-bold flex items-center justify-between">
        <span>
          <i className="text-[#6556CD] ri-tv-fill mr-2"></i>
          SCSDB
        </span>
        {isMobile && (
          <button onClick={closeMenu} className="text-white text-3xl">
            <i className="ri-close-line"></i>
          </button>
        )}
      </h1>

      {/* Navigation */}
      <nav className="flex flex-col text-zinc-400 text-xl gap-3">
        <h1 className="text-white font-semibold text-xl mt-10 mb-5">
          New Feeds
        </h1>
        <Link to="/Trending" onClick={closeMenu} className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-5">
          <i className="mr-2 ri-fire-fill"></i>Trending
        </Link>
        <Link to="/Popular" onClick={closeMenu} className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-5">
          <i className="mr-2 ri-sparkling-fill"></i>Popular
        </Link>
        <Link to="/movie" onClick={closeMenu} className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-5">
          <i className="mr-2 ri-movie-2-line"></i>Movies
        </Link>
        <Link to="/tv" onClick={closeMenu} className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-5">
          <i className="mr-2 ri-tv-2-fill"></i>TV Shows
        </Link>
        <Link to="/person" onClick={closeMenu} className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-5">
          <i className="mr-2 ri-team-fill"></i>People
        </Link>
      </nav>

      <hr className="border-none h-[1px] bg-zinc-400 my-5" />

      <nav className="flex flex-col text-zinc-400 text-xl gap-3">
        <h1 className="text-white font-semibold text-xl mb-5">
          Website Information
        </h1>
        <Link onClick={closeMenu} className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-5">
          <i className="mr-2 ri-fire-fill"></i>About
        </Link>
        <Link onClick={closeMenu} className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-5">
          <i className="ri-information-fill"></i>Contact Us
        </Link>
      </nav>
    </div>
  );
};

export default Sidenav;
