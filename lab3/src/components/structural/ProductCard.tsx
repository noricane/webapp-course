import React from 'react'
import Badge from '../Misc/Badge'

const ProductCard = () => {
    const price = 2000
    const pricefactor = 0.8
  return (
     <li className="bg-stone-50 rounded-sm shadow-xl"><div className="h-96">
        aa</div>
        <div className='h-24 pl-4 py-2 bg-stone-50 border-t-2 border-stone-200'>
            <span className='font-bold text-2xl'>title</span>
            <div className='flex justify-between'>
                <div className='flex flex-col'>
                <span className=''>{price*pricefactor<price ? <><span className='line-through text-stone-500'>{price}</span> {price*pricefactor} </> :<>{price}</>}</span>
                {pricefactor < 1 && <Badge info={`${(100-pricefactor*100)}% Off`}/>}
                </div>
                <div>

                    <button className='w-20 h-12 bg-stone-300 rounded-lg'>BUY</button>
                    <button className='w-12 h-12 bg-stone-300 rounded-lg'>i</button>
                </div>

            </div>
        </div>
        </li>
     
  )
}

export default ProductCard