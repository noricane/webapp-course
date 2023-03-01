import React from 'react'
import { Product } from '../../model/product'
interface Props {
    map: Map<string,Product>|undefined
}
const ProductVariants = (props:Props) => {
  return (
    <div id='variants' className='h-0 w-full relative bottom-0 overflow-hidden bg-green-200 opacity-50 transition-all'>HAHAHOHO</div>
  )
}

export default ProductVariants