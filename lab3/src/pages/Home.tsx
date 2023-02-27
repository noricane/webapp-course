import React, { useEffect, useState } from "react";
import HomeHeader from "../components/Misc/HomeHeader";
import Carousel from "../components/structural/Carousel";


import { Product } from "../model/product";
const Home = () => {
  function getProducts(){
    const item:Product = {
      id:"luh",
      name: "string",
      brand: "string",
      description: "string",
      color: "string",
      price: 10,
      category: "string",
      stock: [
          {
              size: 0,
              amount: 0
          }
      ],
      price_factor: 10,
      images: [
          "url"
      ]
    }
    setRecommended(prev => [...prev,item, item, item, item, item, item, item, item,])
    setLatest(prev => [...prev, item, item, item, item, item, item, item,])
  }
  const [recommended, setRecommended] = useState<Product[]>([]);
  const [latest, setLatest] = useState<Product[]>([]);

  useEffect(()=>{
    getProducts()
    
    
  },[])
  useEffect(()=>{
    console.log(recommended);
    
    
  },[recommended])


  return (
    <>
      <div className="shadow-md">
        <HomeHeader />
      </div>
      <div className="h-[40rem]  bg-stone-800 ">
        <h1 className="text-stone-50 text-2xl text-center relative font-bold top-8 font-oswald"> P O P U L A R &nbsp; P R O D U C T S</h1>
       <div className="relative top-16 "> <Carousel items={recommended}/></div>
        </div>
      <div className="text-center flex justify-center items-center text-stone-50 font-mono  flex-col">
      <div className="py-8 utlg:w-[90vw] w-[50rem] gap-4 flex-col flex justify center absolute bg-stone-700 mx-auto utlg:px-8 p-4">
       <span> <h2 className="font-bold text-white font-oswald ">KEEP YOURSELF UPDATED!</h2>
        <h1 className="font-bold text-white font-oswald text-xl">SIGN UP TO OUR NEWS LETTER</h1></span>
        <div>Sign up to our newsletter to get the latest and greatest! <br />
          Never miss out on exclusive offers, latest releases and hot sneaker news!</div>
       <span>
       <label htmlFor="email" className="text-stone-50 font-bold"> Email </label>
        <input id="email"  className="h-9 utlg:w-[90%] w-96 bg-stone-900 border-2 border-stone-300 text-white p-2" type="text" placeholder="Enter your email" />

       </span>
        </div>
      <img
        style={{left:300}}
          className="bg-stone-300 relate   w-screen h-[42rem] object-cover"
          src={"media/scrollshoes.png"}
        />
        
      </div>

      <div className="h-[40rem] flex flex-col justify-end mb-4 bg-stone-800  ">
        <h1 className="text-stone-50 text-2xl text-center relative font-bold top-8 font-oswald">S H O P &nbsp; O U R &nbsp; L A T E S T &nbsp; A R R I V A L S</h1>
        <Carousel items={latest}/></div>

      
    </>
  );
};

export default Home;
