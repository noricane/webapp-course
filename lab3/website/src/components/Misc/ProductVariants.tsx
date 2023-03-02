import React, { useEffect } from 'react'
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
    const product = map.get(color.replace(/\s/g, '').toLowerCase())
    if(product!=null){
        arr.push(product)
    }

    

    
  return (
    <PopUp items={arr.reverse()} />
  )
}


const PopUp = ({items}:{items:Product[]}) => {


    const error = items.length == 0;
    let arr:JSX.Element[] = []
    const mapItems = () => {
        items.map(e => arr.push(<div>a</div>))
}
    return (
        <div id='variants' className={`h-0 w-full relative bottom-0 overflow-hidden bg-stone-100 opacity-50 transition-all ${error && 'flex justify-center items-center font-bold text-red-800'}`}>
            {items.length == 0 && 'Error'}
            <ul className='flex h-full items-center gap-3 px-4'>
                {items.length != 0 && items.map(e => <li className='h-14 w-14 bg-stone-50'><img className='h-full w-full object-cover' src={e.images[0]} alt="" /></li>)}
            </ul>
        </div>
    )
}

export default ProductVariants