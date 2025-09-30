import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadperson, removeperson } from "./store/actions/personActions";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Loader from "./templates/loader";
import HorizontalCards from "./templates/HorizontalCards";

const Persondetails = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { info } = useSelector((state) => state.person);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncloadperson(id));
    return () => {
      dispatch(removeperson());
    };
  }, [id]);

  if (!info) return <Loader />;

  return (
    <div className="px-[15%] w-screen">
      {/* Top Nav */}
      <nav className="h-[10vh] w-full text-zinc-100 flex items-center gap-10 text-xl">
        <Link
          onClick={() => navigate(-1)}
          className="hover:text-[#6556CD] ri-arrow-left-line"
        ></Link>
      </nav>

      {/* Main Content */}
      <div className="w-full flex flex-row gap-10">
        {/* LEFT SIDE */}
        <div className="w-[20%]">
          <img
            className="h-[40vh] object-cover shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)]"
            src={`https://image.tmdb.org/t/p/original/${info.detail.profile_path}`}
            alt=""
          />
          <hr className="text-zinc-100 mt-3" />
          <div className="text-2xl text-white flex gap-x-5">
            <a
              target="_blank"
              href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
            >
              <i className="ri-global-line"></i>
            </a>
            <a
              target="_blank"
              href={`https://www.facebook.com/${info.externalid.facebook_id}`}
            >
              <i className="ri-facebook-box-fill"></i>
            </a>
            <a
              target="_blank"
              href={`https://www.instagram.com/${info.externalid.instagram_id}`}
            >
              <i className="ri-instagram-line"></i>
            </a>
          </div>

          <h1 className="text-2xl text-zinc-400 font-semibold my-5">
            Personal Info
          </h1>
          <h1 className="text-lg text-zinc-400 font-semibold">Known For</h1>
          <h1 className="text-zinc-400">{info.detail.known_for_department}</h1>

          <h1 className="text-lg text-zinc-400 font-semibold">Gender</h1>
          <h1 className="text-zinc-400">
            {info.detail.gender === 2 ? "Male" : "Female"}
          </h1>

          <h1 className="text-lg text-zinc-400 font-semibold">Birthday</h1>
          <h1 className="text-zinc-400">{info.detail.birthday}</h1>

          <h1 className="text-lg text-zinc-400 font-semibold">Place of Birth</h1>
          <h1 className="text-zinc-400">{info.detail.place_of_birth}</h1>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-[80%] text-white">
          <h1 className="text-6xl font-black my-5 text-zinc-400">{info.detail.name}</h1>
          <h1 className="text-xl text-zinc-400 font-semibold">Biography</h1>
          <p className="text-zinc-400 mt-3">{info.detail.biography}</p>
          <h1 className="text-lg text-zinc-400 font-semibold mt-5">Works In</h1>
          <HorizontalCards data={info.combinedCredits.cast}/>
        </div>
      </div>
    </div>
  );
};

export default Persondetails;
