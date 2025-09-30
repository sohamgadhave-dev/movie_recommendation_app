import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../../utils/axios";
import noImage from "/noImage.jpg"

const Topnav = () => {
  const [query, setquery] = useState("");
  const [searches, setsearches] = useState([]);

  const GetSearches = async () => {
    try {
      const { data } = await axios.get(`/search/multi?query=${query}`);
      
      setsearches(data.results);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    GetSearches();
  }, [query]);

  return (
    <div className="w-[70%] h-[10vh] relative flex justify-start pl-[15%] items-center">
      <i class=" text-3xl text-zinc-200 ri-search-line"></i>
      <input
        onChange={(e) => setquery(e.target.value)}
        value={query}
        className="w-[70%] mx-10 p-5 text-xl outline-none border-none bg-transparent text-zinc-200"
        type="text"
        placeholder="search anything"
      />
      {query.length > 0 && (
        <i
          onClick={() => setquery("")}
          class="absolute right-0 text-3xl text-zinc-200  ri-close-line"
        ></i>
      )}

      <div className="w-[50%] max-h-[50vh] absolute top-[100%] bg-zinc-200 overflow-auto left-[30%] z-50">
        {searches.map((s, i) => (
          <Link to={`/${s.media_type}/details/${s.id}`}
            key={i}
            className="font-semibold text-zinc-600 w-[100%] p-10 flex justify-start items-center border-b-2 border-zinc-100  hover:text-black hover:bg-zinc-300 duration-300 "
          >
            <img
            className="w-[10vh] h-[10vh] object-cover mr-5 rounded"
             src={s.backdrop_path || s.profile_path ? `https://image.tmdb.org/t/p/original/${s.backdrop_path || s.profile_path}`: noImage } alt="" />
            <span>{s.name || s.title || s.original_name || s.original_title}</span>
          </Link>
        ))}
      </div>
      
    </div>
  );
};

export default Topnav;
