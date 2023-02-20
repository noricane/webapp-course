import React from 'react'
import Badge from '../Misc/Badge'
import Price from '../Misc/Price'
import { AiOutlineInfoCircle } from "react-icons/ai";
import { GrCircleInformation } from "react-icons/gr";
const ProductCard = () => {
    const price = 2000
    const pricefactor = 0.8
  return (
     <li className="bg-stone-50 rounded-sm shadow-xl"><div className="h-96">
        aa</div>
        <div className='h-30 max-h-30 px-3 py-2  bg-stone-50 border-t-2 border-stone-200'>
            <span className='font-bold text-2xl  whitespace-nowrap max-h-4 text-ellipsis overflow-hidden '>title as getting very long</span>
            <div className='flex justify-between my-2'>
                <div className='flex flex-col'>

                <Price price={price} pricefactor={pricefactor}/>
               
                </div>
                <div className='flex gap-2'>
                    <button className='w-20 h-12 bg-stone-200 border-2 border-stone-300 rounded-lg shadow-sm hover:shadow-md hover:scale-110 transition-transform'>BUY</button>
                    <button className='w-12 h-12 bg-stone-200 border-2 border-stone-300 rounded-lg shadow-sm hover:shadow-md hover:scale-110 transition-transform'><AiOutlineInfoCircle size={27.5}  className='fill-stone-500 ml-auto mr-auto' /></button>
                </div>

            </div>
        </div>
        </li>
     
  )
}

export default ProductCard