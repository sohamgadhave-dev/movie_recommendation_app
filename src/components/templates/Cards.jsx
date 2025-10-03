import React from "react";
import { Link } from "react-router-dom";
import noImage from "/noImage.jpg";

const Cards = ({ data, title }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 px-4 bg-[#1F1E24]">
      {data.map((c, i) => (
        <Link
          to={`/${c.media_type || title}/details/${c.id}`}
          key={i}
          className="relative rounded-lg overflow-hidden shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] hover:scale-105 duration-300"
        >
          {/* Poster */}
          <img
            className="w-full h-[40vh] md:h-[50vh] lg:h-[60vh] object-cover"
            src={
              c.backdrop_path || c.profile_path
                ? `https://image.tmdb.org/t/p/original/${
                    c.backdrop_path || c.profile_path
                  }`
                : noImage
            }
            alt={c.name || c.title || "poster"}
          />

          {/* Title */}
          <h1 className="text-lg md:text-xl text-zinc-200 mt-2 font-semibold truncate px-2">
            {c.name || c.title || c.original_name || c.original_title}
          </h1>

          {/* Rating */}
          {c.vote_average && (
            <div className="absolute right-3 bottom-10 text-white bg-yellow-600 w-10 h-10 flex justify-center items-center rounded-full text-sm md:text-base font-semibold">
              {(c.vote_average * 10).toFixed()}
              <sup>%</sup>
            </div>
          )}
        </Link>
      ))}
    </div>
  );
};

export default Cards;
