import React from 'react'
import Badge from '../Misc/Badge'
import Price from '../Misc/Price'
import { AiOutlineInfoCircle } from "react-icons/ai";

const ProductCard = () => {
    const price = 2000
    const pricefactor = 0.8
  return (
     <li className="bg-stone-50 rounded-sm shadow-xl"><div className="h-96">
        aa</div>
        <div className='  px-3 py-2  bg-stone-50 border-t-2 border-stone-200 overflow-hidden whitespace-nowrap text-ellipsis'>
            <span className='font-bold text-xl  whitespace-nowrap max-h-4 text-ellipsis'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Est, commodi! Aliquid, nisi. Sapiente, quisquam dicta qui nostrum sunt corporis est.</span>
            <div className='flex items-center justify-between my-2'>
                <Price price={price} pricefactor={pricefactor}/>


               

                <div className='flex gap-2'>
                    <button className='w-20 h-12  bg-stone-800 border-2 text-xl border-stone-900 font-[750] hover:font-[900] text-stone-100 rounded-sm shadow-sm hover:shadow-md hover:scale-110 transition-all '>EDIT</button>

                </div>

            </div>
        </div>
        </li>
     
  )
}

export default ProductCard