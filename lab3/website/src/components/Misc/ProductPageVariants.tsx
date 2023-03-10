/* Not to be confused with product variants which are the items that are shown when hovering over a product while browsing */

import React from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { Product } from '../../model/product'
const ProductPageVariants = ({items}:{items:Product[]|undefined}) => {
    const navigate = useNavigate()
    
    const goToVariant=(id:string,color:string)=>{
      let path:string =`../product/${id}?color=${color.replace(/\s/g, '').toLowerCase()}`;
      navigate(path);
      navigate(0)
    }

  if(items == null){
      return (<div className='h-32  flex justify-center items-center font-oswald text-5xl'>Loading...</div>)
  }
  return (
        <div>

        <span className='font-oswald text-xl font-bold'>Check out the variants</span>
        <div className='h-32  overflow-scroll flex items-center  gap-2 '>
            {items.map(e =>  <>{e.images.length > 0 ? <img onClick={() => {
              goToVariant(e.id,e.color)
            }} src={e.images[0]} alt="" className='h-32   hover:brightness-95 active:brightness-75  hover:border-2 ' /> : <div>No image found</div>}</>)}
        </div>
        </div>
    /* <Link to={`/product/${e.id}?color=${e.color}`}> */
  )
}

export default ProductPageVariants