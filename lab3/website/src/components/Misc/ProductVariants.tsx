import React from 'react'
import { Product } from '../../model/product'
interface Props {
    map: Map<string,Product>|undefined;
    color:string
}
const ProductVariants = ({map,color}:Props) => {
    if(map == null){
        map = new Map()
    }
    const arr = Array.from(map.values()).filter(e => e.color != color);
    const product = map.get(color)
    if(product!=null){arr.push(product)}
  return (
    <PopUp items={arr.reverse()} />
  )
}


const PopUp = ({items}:{items:Product[]}) => {
    const error = items.length == 0;
    const mapItems = () => {return ''}
    return (
        <div id='variants' className={`h-0 w-full relative bottom-0 overflow-hidden bg-stone-200 opacity-50 transition-all ${error && 'flex justify-center items-center font-bold text-red-800'}`}>
            {items.length == 0 ? 'Error' : mapItems()}
        </div>
    )
}

export default ProductVariants