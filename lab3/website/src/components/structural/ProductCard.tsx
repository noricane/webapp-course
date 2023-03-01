import React, { useEffect, useState } from 'react'
import Badge from '../Misc/Badge'
import Price from '../Misc/Price'
import { AiOutlineInfoCircle } from "react-icons/ai";
import { GrCircleInformation } from "react-icons/gr";
import { Product } from '../../model/product';
import axios from 'axios';
import { config } from '../../model/config';
import ProductVariants from '../Misc/ProductVariants';
class MapAndColor {
    constructor(public map: Map<string, Product>, public color: string) {}
}
  
interface Props {
    item:(MapAndColor|Product)
}
const ProductCard = ({item}:Props //in some places we already have acces to the map. In some places we don't, if only product is passed, fetch data here.
) => {
    const [color, setColor] = useState<string>()
    const [product, setProduct] = useState<Product>()
    const [map, setMap] = useState<Map<string,Product>>()
    const getProducts = async (item:Product) => {
        const resp = await axios.get(`${config.URL}/products/${item.id}`)
        if (resp instanceof Map<string,Product>){
            setMap(resp)
        }
    }
    
  useEffect(() => {
    if (item instanceof MapAndColor) {
      setProduct(item.map.get(item.color));
      setColor(item.color)
      setMap(item.map)
    } else {
        setProduct(item);
        setColor(item.color)
      getProducts(item)
    }
  }, [item]);
    const variantStyles = "[&>*>#variants]:hover:opacity-100 [&>*>#variants]:hover:bottom-[4rem] [&>*>#variants]:hover:h-[4rem]"
    const price = 2000
    const pricefactor = 0.8
  return (
     <li className={`bg-stone-50 ${variantStyles}  rounded-sm shadow-xl`}>
        <div className="h-96">
        {product == null ? 'ERROR' : <img className='h-full object-cover '  src={product.images[0]} alt="" />}
        <ProductVariants color={item.color} map={map}/>
        </div>
        <div className='  px-3 py-2  bg-stone-50 border-t-2 border-stone-200 overflow-hidden whitespace-nowrap text-ellipsis'>
            <span className='font-bold text-xl  whitespace-nowrap max-h-4 text-ellipsis'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Est, commodi! Aliquid, nisi. Sapiente, quisquam dicta qui nostrum sunt corporis est.</span>
            <div className='flex items-center justify-between my-2'>
                <Price price={price} pricefactor={pricefactor}/>


               

                <div className='flex gap-2'>
                    <button className='w-20 h-12  bg-stone-800 border-2 text-xl border-stone-900 font-[750] hover:font-[900] text-stone-100 rounded-sm shadow-sm hover:shadow-md hover:scale-110 transition-all '>BUY</button>
                    <button className='w-12 h-12 bg-stone-200  rounded-sm shadow-sm hover:shadow-md hover:scale-110 transition-all'><AiOutlineInfoCircle size={27.5}  className='fill-stone-500 ml-auto mr-auto' /></button>
                </div>
            </div>
        </div>
        </li>
     
  )
}

export default ProductCard