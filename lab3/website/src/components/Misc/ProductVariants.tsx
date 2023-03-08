/* Not to be confused with productpagevariant which are the variants that are shown while on a specific product's page */


import React, { useEffect } from 'react'
import { Product } from '../../model/product'
import ProductLink from '../Logic/ProductLink';
interface Props {
    map: Map<string,Product>|undefined;
    color:string;
    setCurrent:Function;
    parentImage:string;
}
const ProductVariants = ({map,color,setCurrent,parentImage}:Props) => {
    if(map == null){
        map = new Map()
    }
    const arr = Array.from(map.values()).filter(e => e.color != color);
    const product = map.get(color.replace(/\s/g, '').toLowerCase())
    if(product!=null){
        arr.push(product)
    }

    

    
  return (
    <PopUp setCurrent={setCurrent} parentImage={parentImage} items={arr.reverse()} />
  )
}


const PopUp = ({items,setCurrent,parentImage}:{items:Product[],setCurrent:Function,parentImage:string}) => {


    const error = items.length == 0;
    let arr:JSX.Element[] = []
    const mapItems = () => {
        items.map(e => arr.push(<div>a</div>))
}
    return (
        <div onClick={(e:React.MouseEvent<HTMLDivElement, MouseEvent>) => {e.stopPropagation();console.log("lehprezz");
        }} id='variants' className={`h-0 w-full relative z-10 bottom-0 overflow-x-scroll overflow-y-hidden bg-stone-100 opacity-50 transition-all ${error && 'flex justify-center items-center font-bold text-red-800'}`}>
            {items.length == 0 && 'Error'}
            <ul className='flex w-fit h-full items-center gap-3 px-4'>
                {items.length != 0 && items.map(e => <li className='h-14 w-14 bg-stone-50'><ProductLink id={e.id} color={e.color}><img className='h-full w-full object-cover' onMouseEnter={()=>setCurrent(e.images[0])} src={e.images[0]} onMouseLeave={()=>setCurrent(parentImage)} alt="" /></ProductLink></li>)}
            </ul>
        </div>
    )
}

export default ProductVariants