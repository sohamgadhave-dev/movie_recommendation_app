import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Trailer = () => {
  const { pathname } = useLocation();
  const category = pathname.includes("movie") ? "movie" : "tv";
  const ytVideos = useSelector((state) => state[category].info.videos);
  const navigate = useNavigate();

  // pick first trailer video
  const trailer = ytVideos?.results?.find((v) => v.type === "Trailer") || ytVideos?.results?.[0];

  if (!trailer) {
    return (
      <div className="z-[100] absolute inset-0 flex items-center justify-center bg-[rgba(0,0,0,.9)] text-white">
        <button
          onClick={() => navigate(-1)}
          className="absolute right-6 top-6 text-3xl hover:text-[#6556CD]"
        >
          <i className="ri-close-fill"></i>
        </button>
        <p className="text-xl">❌ No Trailer Available</p>
      </div>
    );
  }

  return (
    <div className="z-[100] fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,.9)]">
      {/* Close Button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute right-6 top-6 text-3xl text-white hover:text-[#6556CD]"
      >
        <i className="ri-close-fill"></i>
      </button>

      {/* Responsive Trailer */}
      <div className="w-[90%] md:w-[70%] aspect-video rounded-lg overflow-hidden shadow-lg">
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
          title="YouTube Trailer"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default Trailer;
