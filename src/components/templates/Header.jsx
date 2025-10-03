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
      className="w-full h-[60vh] md:h-[50vh] flex flex-col justify-end p-4 md:p-[5%] items-start"
    >
      {/* Title */}
      <h1 className="text-xl md:text-4xl lg:text-6xl font-black text-white w-full md:w-[70%]">
        {data.name || data.title || data.original_name || data.original_title}
      </h1>

      {/* Overview */}
      <p className="w-full md:w-[70%] text-white mt-3 mb-3 text-sm md:text-base">
        {data.overview ? `${data.overview.slice(0, 200)}...` : "No description available."}
        <Link
          to={`/${data.media_type}/details/${data.id}`}
          className="text-blue-400 ml-2"
        >
          more
        </Link>
      </p>

      {/* Meta Info */}
      <p className="text-white flex flex-col md:flex-row md:items-center gap-3 md:gap-5 text-sm md:text-base">
        <span>
          <i className="text-yellow-500 ri-megaphone-fill mr-2"></i>
          {data.first_air_date || data.release_date || "No info available"}
        </span>
        <span>
          <i className="text-yellow-500 ri-album-fill mr-2"></i>
          {data.media_type ? data.media_type.toUpperCase() : "UNKNOWN"}
        </span>
      </p>

      {/* Trailer Button */}
      <Link
        to={`/${data.media_type}/details/${data.id}/trailer`}
        className="bg-[#6556CD] px-4 py-2 md:px-6 md:py-3 rounded text-white font-semibold mt-5 hover:bg-[#4d47b2] duration-300 text-sm md:text-base"
      >
        Watch Trailer
      </Link>
    </div>
  );
};

export default Header;
