import React, { useEffect, useState } from 'react'
import Topnav from './templates/Topnav';
import Dropdown from './templates/Dropdown';
import InfiniteScroll from 'react-infinite-scroll-component';
import Cards from './templates/Cards';
import Loader from './templates/loader';
import { useNavigate } from 'react-router-dom';
import axios from '../../utils/axios';


const People = () => {

    const [category, setcategory] = useState("popular");
    const [person, setperson] = useState([]);
    const [page, setpage] = useState(1);
    const [hasMore, sethasMore] = useState(true);
    document.title = `Tv-Shows - ${category.toUpperCase()}`;

    const GetPerson = async () => {
    try {
      const { data } = await axios.get(
        `/person/${category}?page=${page}`
      );

      if (data.results.length > 0) {
        setperson((prev) => [...prev, ...data.results]);
        setpage((prev) => prev + 1); //  
      } else {
        sethasMore(false);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const refreshHandler = () => {
    setpage(page + 1);
    setperson([]);
    
    sethasMore(true);
  };

  useEffect(()=>{
    GetPerson();
  },[page])

  useEffect(() => {
    refreshHandler();
  }, [category]);

  const navigate = useNavigate();


  return person.length > 0 ? (
    <div className="w-screen h-screen overflow-hidden overflow-y-auto">
      <div className="w-full flex items-center justify-between px-10">
        <h1 className="text-2xl text-zinc-400 font-semibold flex items-center gap-2">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556CD] ri-arrow-left-line" // ✅ fixed
          ></i>
          Person
        </h1>
        <Topnav />

         <Dropdown
          title="Category"
          options={["popular"]}
          selected={category}
          func={(e) => setcategory(e.target.value)}
        />
        
      </div>

      <InfiniteScroll
        dataLength={person.length}
        next={GetPerson}
        hasMore={hasMore}
        loader={<h1>Loading...</h1>}
      >
        <Cards data={person} title="person" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loader/>
  );
};

export default People