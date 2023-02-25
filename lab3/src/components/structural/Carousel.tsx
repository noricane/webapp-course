import React from 'react'
import { Product } from '../../model/product'
import ProductCard from './ProductCard'
import { BsArrowRightSquare } from "react-icons/bs";

const Carousel = ({items}:{items:Product[]}) => {
  return (
    <div className='flex items-center justify-center'>
        <ul className='px-24 relative flex list-none  gap-6  justify-between w-screen overflow-scroll scrollbar-hide'>
            {items.map(e => <div className='grow w-96 [&>*]:w-96'><ProductCard/></div>)}
        </ul>
        <button className='absolute left-8 text-stone-700  rounded-md bg-stone-100 shadow-lg active:bg-stone-300 active:scale-105 transition-all duration-75'><BsArrowRightSquare size={"2.5rem"} style = {{transform: 'rotate(180deg)' }} /></button>
        <button className='absolute right-8 text-stone-700 rounded-md bg-stone-100 shadow-lg active:bg-stone-300 active:scale-105 transition-all duration-75'><BsArrowRightSquare size={"2.5rem"} /></button>

    </div>
  )
}

export default Carousel