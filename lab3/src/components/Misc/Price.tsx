import React from 'react'
import Badge from './Badge'

const Price = (props:any) => {
    const price= props.price
    const pricefactor = props.pricefactor

    if(price*pricefactor < price){
        return <span className='font-semibold'> 
            <span className='line-through text-stone-500'>{`${price}${process.env.REACT_APP_CURRENCY} `}</span><span>{`${price*pricefactor}${process.env.REACT_APP_CURRENCY} `}</span>
            {pricefactor < 1 && <Badge info={`${(100-pricefactor*100)}% Off`}/>}
            </span>
    }

  return (

       <>{price}</>
    
  )
}

export default Price