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
    setProducts(prev => [...prev,item, item, item, item])
  }
  useEffect(()=>{
    getProducts()
  },[])
  const [product, setProducts] = useState<Product[]>([]);

  return (
    <>
      <div className="shadow-md">
        <HomeHeader />
      </div>
      <div className="h-[36rem] mb-4 bg-stone-800"><Carousel items={product}/></div>
      
    </>
  );
};

export default Home;
