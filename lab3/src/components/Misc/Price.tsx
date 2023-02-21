import React from 'react'
import Badge from './Badge'

const Price = (props:any) => {
    const price= props.price
    const pricefactor = props.pricefactor

    if(price*pricefactor < price){
        return <div><div className='w-auto [&>*]:h-2.5 mb-3 gap-2 flex flex-wrap px-0 font-semibold'> 
        <span className='line-through text-stone-500'>{`${price}${process.env.REACT_APP_CURRENCY} `}</span><span className=''>{`${price*pricefactor}${process.env.REACT_APP_CURRENCY} `}</span>
       </div>
        <div>{pricefactor < 1 && <Badge  info={`${(100-pricefactor*100)}% Off`}/>}</div></div>
    }

  return (

       <>{price}</>
    
  )
}

export default Price