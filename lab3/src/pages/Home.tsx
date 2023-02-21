import React from "react";
import Layout from "../components/Layout";
import Grid from "../components/structural/Grid";
const Home = () => {
  return (
    <>
      <div className="">
        <div className="absolute h-[42rem] justify-center w-full flex flex-col">
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
      </div>

      <Grid />
    </>
  );
};

export default Home;
