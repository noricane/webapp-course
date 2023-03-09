import { useEffect, useState } from "react";
import { BrowserRouter as Router, Link, useNavigate } from "react-router-dom";
import { Twirl as Hamburger } from "hamburger-react";
import ResponsiveMenu from "../Misc/ResponsiveMenu";
import Cookies from "js-cookie";
import { sessionAtom } from "../../model/jotai.config";
import { useAtom } from "jotai";


import LoggedInMenu from "../Misc/LoggedInMenu";

const Nav = () => {
  const [userCookie,] = useAtom(sessionAtom)
  const [isOpen, setOpen] = useState(false);
  const navigate = useNavigate();
  useEffect(()=>console.log("COOOKIE",userCookie)
  ,[])
  //Video should act as a link back to base url. This redirects user to homepage
  const homeButtonHandler = (
    e: React.MouseEvent<HTMLVideoElement, MouseEvent>
  ) => {
    e.preventDefault();
    //router push home
    navigate("/");
  };
  return (
    <nav>
      <div className="w-full h-8 bg-stone-800 flex items-center justify-center font-semibold text-stone-200">
        Free Shipping for Members
      </div>
      <div className="w-screen  bg-stone-200 shadow-md relative z-10 h-24 items-center flex text-zinc-800 font-bold">
        <video onClick={homeButtonHandler} muted playsInline draggable="false" autoPlay loop className="hover:cursor-pointer  relative z-10 h-24 w-auto utmd:mx-auto md:left-0 mix-blend-darken" >
          {/*SRC property: For some reason the logo dissapeared when I refreshed the page (on an url that is not base path / e.g /product/id) with the path 'media/logohb.mp4', this code fixes it apparently. */}
          <source
             src= { window.location.protocol + "//" + window.location.host + "/media/logohb.mp4" } type="video/mp4"/>
          <p>Aesthetic video loop of logo</p>
        </video>
        <div className="flex justify-center  h-24 items-center absolute w-screen ">
          <div className="left-0 mx-4 md:hidden absolute">
            <Hamburger toggled={isOpen} toggle={setOpen} />
          </div>
          <ul id="navLinks" className="flex utmd:hidden gap-7  relative z-10 mx-auto" >
            <li> <Link to={"/"}>Home</Link> </li>
            <li> <Link to={"/browse"}>Browse</Link> </li>
            <li> <Link to={"/news"}>What's New?</Link> </li>
            <li> <Link to={"/membersclub"}>Member's Club</Link> </li>
          </ul>
        </div>
        {/* Only Display these links(buttons) if user is not logged in */
        userCookie == null &&
          <div className="absolute utsm:hidden [&>*]:hover:cursor-pointer right-0 mx-4 flex gap-2">
            <Link to="/signup" className="hover:bg-black hover:text-stone-200  bg-stone-200 p-1 border-black border-4" >
              Sign Up
            </Link>
            <Link to="/signin" className="bg-black text-stone-200  hover:bg-stone-200 hover:text-black p-1 border-black border-4" >
              Sign In
            </Link>
          </div>
        }
        {/* Only Display these links(buttons) if user is logged in */
          userCookie != null &&
          <div className="utsm:hidden flex justify-center items-center"><LoggedInMenu mobile={false} firstColor={["bg-stone-200","text-stone-200","#E7E5E4"]} secondColor={["bg-stone-900","text-stone-900","#1C1917"]} /></div>
        }
      </div>

      <ResponsiveMenu loggedIn={userCookie} openState={isOpen} setOpenState={setOpen} />
    </nav>
  );
};

export default Nav;
