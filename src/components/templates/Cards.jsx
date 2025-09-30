import React from "react";
import { Link } from "react-router-dom";
import noImage from "/noImage.jpg"

const Cards = ({ data, title }) => {
  return (
    <div className="flex flex-wrap w-[full] px-[5%] bg-[#1F1E24]">
      {data.map((c, i) => (
        <Link to={`/${c.media_type || title}/details/${c.id}`} className="relative w-[25vh] mr-[5%] mb-[5%]" key={i}>
          <img
            className="h-[40vh] object-cover shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)]"
            src={ c.backdrop_path || c.profile_path ? 
              `https://image.tmdb.org/t/p/original/${
              c.backdrop_path || c.profile_path
            }`:noImage}
            alt=""
          />
          <h1 className="text-2xl text-zinc-400 mt-3 font-semibold">{c.name || c.title || c.original_name || c.original_title}</h1>
          
          {
            c.vote_average && <div className="absolute right-[-10%]  bottom-[25%] text-white bg-yellow-600 w-[5vh] h-[5vh] flex justify-center items-center rounded-full text-xl font-semibold">{(c.vote_average*10).toFixed()}<sup>%</sup></div>
          }
          
        </Link>
      ))}
    </div>
  );
};

export default Cards;
