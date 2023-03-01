import React from 'react'

const HomeHeader = () => {
  return (
    <>
    <div className="absolute h-[42rem] justify-center w-full flex shadow-2xl flex-col">
          <span className=" text-5xl text-stone-200  text-center font-extrabold w-full ">
            Sneakers are our thing!
          </span>
          <span className="w-full justify-center flex gap-4 mt-4">
            <button className=" text-xl w-36  text-center font-extrabold  bg-stone-200 ">
              Browse
            </button>
            <button className=" text-xl w-48 h-12  text-center font-extrabold  bg-stone-200 ">
              What's New?
            </button>
          </span>
        </div>
        <img
          className="bg-black  w-screen h-[42rem] object-cover"
          src={"media/jwall.jpg"}
        ></img>
        </>
  )
}

export default HomeHeader