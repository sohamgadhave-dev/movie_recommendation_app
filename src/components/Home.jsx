import React, { useEffect, useState } from 'react'
import Sidenav from './templates/sidenav'
import Topnav from './templates/Topnav'
import axios from '../../utils/axios'
import Header from './templates/Header'
import HorizontalCards from './templates/HorizontalCards'
import Dropdown from './templates/Dropdown'
import Loader from './templates/loader'

 
const Home = () => {
    document.title = "MOVIE-HOMEPAGE"
    const [wallpaper,setwallpaper]=useState(null);
    const [trending,settrending] = useState(null);
    const [category,setCategory] = useState("all")

    const GetHeaderWallpaper = async () => {
    try {
      const { data } = await axios.get(`/trending/all/day`);
      
      
     let randomdata = data.results[(Math.random() * data.results.length).toFixed()];
       setwallpaper(randomdata);
    } catch (error) {
      console.log("Error:", error);
    }
  };


   const GetTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/day`);
       settrending(data.results);
    } catch (error) {
      console.log("Error:", error);
    }
  };



  

  useEffect(()=>{
!wallpaper && GetHeaderWallpaper();
GetTrending();
  },[category])
  return wallpaper && trending ? (
    
    <>
    <Sidenav/>
    <div className='w-[80%] h-full overflow-auto overflow-x-hidden'>
        <Topnav/>
        <Header data={wallpaper}/>
        <div className="mb-2 flex justify-between pt-5">
                <h1 className="text-3xl text-zinc-400 font-bold px-10">Trending</h1>
                <Dropdown title="Filter" selected={category} options={['tv','movie','all']} func={(e)=>setCategory(e.target.value)}/>
              </div>
        <HorizontalCards data = {trending} />

    </div>

    </>
  ) : <Loader/>
}

export default Home