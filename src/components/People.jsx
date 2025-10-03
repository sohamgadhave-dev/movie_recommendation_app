import React, { useEffect, useState } from "react";
import Topnav from "./templates/Topnav";
import Dropdown from "./templates/Dropdown";
import InfiniteScroll from "react-infinite-scroll-component";
import Cards from "./templates/Cards";
import Loader from "./templates/loader";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axios";

const People = () => {
  const [category, setcategory] = useState("popular");
  const [person, setperson] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);

  document.title = `People - ${category.toUpperCase()}`;

  const GetPerson = async () => {
    try {
      const { data } = await axios.get(`/person/${category}?page=${page}`);
      if (data.results.length > 0) {
        setperson((prev) => [...prev, ...data.results]);
        setpage((prev) => prev + 1);
      } else {
        sethasMore(false);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const refreshHandler = () => {
    setpage(1);        
    setperson([]);     
    sethasMore(true);  
  };

  useEffect(() => {
    GetPerson();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    refreshHandler();
  }, [category]);

  const navigate = useNavigate();

  return person.length > 0 ? (
    <div className="w-screen h-screen overflow-hidden overflow-y-auto bg-[#1F1E24]">
      
      {/* Header Controls */}
      <div className="w-full flex flex-col md:flex-row items-center md:justify-between px-5 md:px-10 gap-4 py-4">
        
        {/* Back + Title */}
        <h1 className="text-2xl text-zinc-400 font-semibold flex items-center gap-2">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556CD] ri-arrow-left-line cursor-pointer"
          ></i>
          People
        </h1>

        {/* Search Bar */}
        <div className="w-full md:w-full">
          <Topnav />
        </div>

        {/* Dropdown (currently only "popular") */}
        <Dropdown
          title="Category"
          options={["popular"]}
          selected={category}
          func={(e) => setcategory(e.target.value)}
        />
      </div>

      {/* Infinite Scroll */}
      <InfiniteScroll
        dataLength={person.length}
        next={GetPerson}
        hasMore={hasMore}
        loader={<h1 className="text-center text-zinc-400">Loading...</h1>}
      >
        <Cards data={person} title="person" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loader />
  );
};

export default People;
