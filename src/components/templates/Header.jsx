import React from "react";
import { Link } from "react-router-dom";

const Header = ({ data }) => {
  return (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.4),rgba(0,0,0,.7),rgba(0,0,0,.9)),url(https://image.tmdb.org/t/p/original/${
          data.backdrop_path || data.profile_path
        })`,
        backgroundPosition: "top 10%",
        backgroundSize: "cover",
      }}
      className="w-full h-[50vh] flex flex-col justify-end p-[5%] items-start"
    >
      <h1 className="text-5xl font-black text-white w-[70%]">
        {data.name || data.title || data.original_name || data.original_title}
      </h1>
      <p className="w-[70%] text-white mt-3 mb-3">
        {data.overview.slice(0, 200)}...
        <Link to={`/${data.media_type}/details/${data.id}`} className="text-blue-400">more</Link>
      </p>
      <p className="text-white">
        <i class="text-yellow-500 ri-megaphone-fill"></i>
        {data.first_air_date || data.release_date || "no info available"}
        <i class="ml-5 text-yellow-500 ri-album-fill"></i>
        {data.media_type.toUpperCase()}
      </p>
      <Link to={`/${data.media_type}/details/${data.id}/trailer`} className="bg-[#6556CD] p-4 rounded text-white font-semibold mt-5 ">
        Watch Trailer
      </Link>
    </div>
  );
};

export default Header;
