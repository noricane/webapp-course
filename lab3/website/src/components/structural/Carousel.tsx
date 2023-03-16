import React, { ReactNode, useEffect, useRef, useState } from 'react'

import ProductCard from './ProductCard'
import { BsArrowRightSquare } from "react-icons/bs";
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { config } from '../../model/config';
import { Product } from '../../model/types';


const Carousel = ({items, id}:{items:Product[],id:string}) => {
  const ref = useRef<HTMLUListElement>(null);
  
  const [scrollX, setScrollX] = useState(0);

const scrollSideways = (px:number) => {
  let elemScroll:number | undefined = document.getElementById(id)?.scrollLeft
  
  if(ref != null &&elemScroll!=null){
    /* Check that scroll is within bounds */
    if (scrollX + px < 0 || scrollX + px > 384*items.length-1){return}
    /* Scroll */
    ref.current?.scrollTo({
      top: 0,
      left: elemScroll + px,
      behavior: 'smooth'
    });
    
    /*  */
    setScrollX(elemScroll + px);}
};
  return (
    <div className='flex h-full px-4 items-center justify-center' >
        <motion.ul id={id}  ref={ref} style={{scrollSnapType: "x mandatory"}} className='px-24 relative flex list-none  gap-6  justify-between w-screen overflow-scroll scrollbar-hide'>
          {/*  */}
            {items.map(e => {
                return (
                  <div  style={{scrollSnapAlign:"center"}} className='grow w-96 [&>*]:w-96'  >
                      <ProductCard key={e.id.concat(e.color)} item={e} />
                  </div>)})}
        </motion.ul>
        <LocalButton pos='left-8' onClick={()=>scrollSideways(-384)}><BsArrowRightSquare size={"2.5rem"} style = {{transform: 'rotate(180deg)' }} /></LocalButton>
        <LocalButton pos='right-8' onClick={()=>scrollSideways(384)}><BsArrowRightSquare size={"2.5rem"} /></LocalButton>
    </div>
  )
}

const LocalButton = ({onClick,pos,children}:{onClick:Function,pos:string,children:ReactNode}) => <button onClick={()=>{onClick()}} className={`absolute ${pos} text-stone-600  rounded-md bg-stone-100 shadow-lg active:bg-stone-300 active:scale-105 transition-all duration-75`}>{children}</button>


export default Carousel