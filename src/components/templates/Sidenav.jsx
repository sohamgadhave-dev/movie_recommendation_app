
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Trending from "../Trending";

const sidenav = () => {

  return (
    <>
      <div className="w-[20%] h-full border border-r-2 border-zinc-400 p-10">
        <h1 className="text-2xl text-white font-bold">
          <i class=" text-[#6556CD] ri-tv-fill mr-2"></i>
          <span className=" text-white">SCSDB</span>
        </h1>
        <nav className="flex flex-col text-zinc-400 text-xl gap-3">
          <h1 className="text-white font-semibold text-xl mt-10 mb-5">
            New Feeds
          </h1>
          <Link to="/Trending" className="hover:bg-[#6556CD] hover:text-white   duration-300 rounded-lg p-5"><i class="mr-2 ri-fire-fill"></i>Trending</Link>
          <Link to="/Popular" className="hover:bg-[#6556CD] hover:text-white   duration-300 rounded-lg p-5"><i class="mr-2 ri-sparkling-fill"></i>Popular</Link>
          <Link to="/movie" className="hover:bg-[#6556CD] hover:text-white   duration-300 rounded-lg p-5"><i class="mr-2 ri-movie-2-line"></i>Movies</Link>
          <Link to="/tv" className="hover:bg-[#6556CD] hover:text-white   duration-300 rounded-lg p-5"><i class="mr-2 ri-tv-2-fill"></i>TV Shows</Link>
          <Link to="/person" className="hover:bg-[#6556CD] hover:text-white   duration-300 rounded-lg p-5"><i class="mr-2 ri-team-fill"></i>People</Link>
        </nav>

<hr className="border-none h-[1px] bg-zinc-400 "/>

        <nav className="flex flex-col text-zinc-400 text-xl gap-3">
          <h1 className="text-white font-semibold text-xl mt-10 mb-5">
            Website Information
          </h1>
          <Link className="hover:bg-[#6556CD] hover:text-white   duration-300 rounded-lg p-5"><i class="mr-2 ri-fire-fill"></i>About</Link>
          <Link className="hover:bg-[#6556CD] hover:text-white   duration-300 rounded-lg p-5"><i class="ri-information-fill"></i>Contact Us</Link>
          
        </nav>
      </div>
    </>
  );
};

export default sidenav;
