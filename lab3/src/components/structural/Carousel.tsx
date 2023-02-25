import React, { useEffect, useRef, useState } from 'react'
import { Product } from '../../model/product'
import ProductCard from './ProductCard'
import { BsArrowRightSquare } from "react-icons/bs";
import { motion } from 'framer-motion';

const Carousel = ({items}:{items:Product[]}) => {
    const [scrollPos, setScrollPos] = useState(0)
    const container = useRef()
    const scrollHandler = (s:string) => {
        const elem = document.getElementById("container")
        const pos = elem?.getBoundingClientRect().x;
        if( pos == null){return}
        switch (s) {
            case "+":
            setScrollPos(pos + 200);    

            break;
            case "-":
                setScrollPos(pos - 200);    
            break;
            default:
            break;
        }
        
        // Calls the scroll function.
        elem?.scroll({
          // Top is for the y position.
          //top: ,
          //Use left for x position.
          left: scrollPos,
          // It looks nicer if the scroll is smooth
          behavior: "smooth"
        });
      }
    
    useEffect(()=>console.log(container)
    ,[])
  return (
    <div className='flex  px-4 items-center justify-center' >
        <motion.ul id='container'  style={{scrollSnapType: "x"}} className='px-24 relative flex list-none  gap-6  justify-between w-screen overflow-scroll scrollbar-hide'>
            {items.map(e => 
                <div  style={{scrollSnapAlign:"center"}} className='grow w-96 [&>*]:w-96'  >
                    <ProductCard/>
                </div>)}
        </motion.ul>
        <button onClick={(e) =>{e.preventDefault(); scrollHandler("-")}} className='absolute left-8 text-stone-700  rounded-md bg-stone-100 shadow-lg active:bg-stone-300 active:scale-105 transition-all duration-75'><BsArrowRightSquare size={"2.5rem"} style = {{transform: 'rotate(180deg)' }} /></button>
        <button onClick={(e) =>{e.preventDefault(); scrollHandler("+")}} className='absolute right-8 text-blue-700 rounded-md bg-stone-100 shadow-lg active:bg-stone-300 active:scale-105 transition-all duration-75'><BsArrowRightSquare size={"2.5rem"} /></button>

    </div>
  )
}

export default Carousel