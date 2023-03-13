import React from 'react'
import { Link } from 'react-router-dom'

/* Header, the first banner displayed on the homepage */
const HomeHeader = () => {
  return (
    <>
    <div className="absolute h-[42rem] justify-center w-full flex shadow-2xl flex-col">
          {/* Brand sloagan */}
          <span className=" text-5xl text-stone-200  text-center font-extrabold w-full ">
            Sneakers are our thing!
          </span>
          {/* Button group for navigating to browsing page or news page */}
          <span className="w-full justify-center flex gap-4 mt-4">
            <button className=" text-xl w-36  text-center font-extrabold  bg-stone-200 ">
              <Link to={"/browse"}>Browse</Link>
            </button>
            <button className=" text-xl w-48 h-12  text-center font-extrabold  bg-stone-200 ">
              <Link to={"/news"}>What's New?</Link>
            </button>
          </span>
        </div>
        {/* Background image */}
        <img
          className="bg-black  w-screen h-[42rem] object-cover"
          src={"media/jwall.jpg"}
        ></img>
        </>
  )
}

export default HomeHeader