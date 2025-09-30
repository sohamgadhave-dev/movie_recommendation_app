import React from 'react'
import ReactPlayer from "react-player"
import { useSelector } from 'react-redux'
import { Link,  useLocation, useNavigate } from 'react-router-dom'


const Trailer = () => {
    const {pathname} = useLocation()
    const category = pathname.includes("movie") ? "movie" : "tv";
    const ytvideo = useSelector((state) => state[category].info.videos)
    console.log(ytvideo);
    const navigate = useNavigate();
    
   
    
  return (
    <div className='z-[100] absolute w-screen h-screen flex items-center justify-center top-0 left-0
    bg-[rgba(0,0,0,.9)]'>
        <Link
          onClick={() => navigate(-1)}
          className="hover:text-[#6556CD] ri-close-fill absolute text-3xl text-white right-[5%] top-[5%]" // ✅ fixed
        ></Link>

       <iframe width="1920" height="700" src={`https://www.youtube.com/embed/${ytvideo.key}?si=q9zEPuB1TrmBaur9`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </div>
  )
}

export default Trailer

