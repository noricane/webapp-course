

/* 
Not to be confused with productpagevariant which are the variants that are shown while on a specific product's page 
These are shown when hovering over ProductCards while browsing*/

import { Product } from '../../model/types'
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
    //Get product variants that are not current product
    const arr = Array.from(map.values()).filter(e => e.color != color);
    //Get current product
    const product = map.get(color.replace(/\s/g, '').toLowerCase())
    
    //add current product last to reverse list and show current product first
    if(product!=null){
        arr.push(product)
    }

    

    
  return (
    <PopUp setCurrent={setCurrent} parentImage={parentImage} items={arr.reverse()} />
  )
}

/* Popup component */
const PopUp = ({items,setCurrent,parentImage}:{items:Product[],setCurrent:Function,parentImage:string}) => {
    const error = items.length == 0;

 
    return (
        <div onClick={(e:React.MouseEvent<HTMLDivElement, MouseEvent>) => {e.stopPropagation();
        }} id='variants' className={`h-0 w-full relative z-10 bottom-0 overflow-x-scroll overflow-y-hidden bg-stone-100 opacity-50 transition-all ${error && 'flex justify-center items-center font-bold text-red-800'}`}>
            {/* Show error if list is empty */}
            {items.length == 0 && 'Error'}
            {/* Map out list as a row of clickable images to go to the respective product's page */}
            <ul className='flex w-fit h-full items-center gap-3 px-4'>
                {items.length != 0 && items.map(e => <li className='h-14 w-14 bg-stone-50'><ProductLink id={e.id} color={e.color}><img className='h-full w-full object-cover' onMouseEnter={()=>setCurrent(e.images[0])} src={e.images[0]} onMouseLeave={()=>setCurrent(parentImage)} alt="" /></ProductLink></li>)}
            </ul>
        </div>
    )
}

export default ProductVariants