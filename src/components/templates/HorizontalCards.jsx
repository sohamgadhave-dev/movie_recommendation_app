import React from "react";
import Dropdown from "./Dropdown";
import { Link } from "react-router-dom";
import noImage from "/noImage.jpg"

const HorizontalCards = ({ data }) => {

  return (
    <div className="w-full h-[40vh] p-5">
      <div className="w-[100%] h-[40vh] flex overflow-y-hidden ">
        {data.map((d, i) => (
          <Link to={`/${d.media_type}/details/${d.id}`} key={i} className="min-w-[15%] mr-5 mb-5 bg-zinc-900 ">
            <img
              className="w-full h-[45%] object-cover"
              src={  d.backdrop_path || d.poster_path ? 
                `https://image.tmdb.org/t/p/original/${
                d.backdrop_path || d.poster_path
              } `: noImage}
              alt=""
            />

            <div className="p-3 h-[55%]">
              <h1 className=" text-xl font-semibold text-white ">
              {(d.name || d.title || d.original_name || d.original_title).slice(0,15)}
            </h1> 
            
            <p className=" text-white mt-2 mb-3 ">
              {d.overview
                ? d.overview.slice(0, 20)
                : "No description available."}
              ...
              <span className="text-zinc-400">more</span>
            </p>
            </div>
            
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HorizontalCards;
