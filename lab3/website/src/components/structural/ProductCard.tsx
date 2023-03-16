import React, { useEffect, useState } from 'react'
import Badge from '../Misc/Badge'
import Price from '../Misc/Price'
import { AiOutlineInfoCircle } from "react-icons/ai";
import { Product } from '../../model/types';
import axios from 'axios';
import { config } from '../../model/config';
import ProductVariants from '../Misc/ProductVariants';
import ProductLink from '../Logic/ProductLink';
class MapAndColor {
    constructor(public map: Map<string, Product>, public color: string) {}
}
  
interface Props{
    item:(MapAndColor|Product);
    key:string,
}


/* Component for displaying and linking to products and their various variations when browsing a grid or a carousel */
const ProductCard = ({item,key}:Props //in some places we already have acces to the map. In some places we don't, if only product is passed, fetch data here.
) => {
    /* State management */
    const [currentImage, setCurrentImage] = useState<string>()
    const [product, setProduct] = useState<Product>()
    const [map, setMap] = useState<Map<string,Product>>()
    /* Get product's variants */
    const getProducts = async (item:Product) => {
        const {data}:{data:any[]} = await axios.get(`${config.URL}/product/${item.id}`)
        const toMap = new Map<string,Product>()
        data.forEach(e => toMap.set(e.key,e.value))
        if (toMap instanceof Map<string,Product>){
            setMap(toMap)
        }
    }
    /* Check if items is map or product. Unnecessary to make a http request if we have the map */
  useEffect(() => {
    if (item instanceof MapAndColor) {
        const product = item.map.get(item.color);
        setProduct(product);
        setMap(item.map)
        setCurrentImage(product?.images[0])
    } else {
        setCurrentImage(item.images[0])
        setProduct(item);
        getProducts(item)
    }    
  }, []);
  /* Default message */
  if(product == null ){return <div>Loading..</div>}
    const variantStyles = "[&>*>#variants]:hover:opacity-100 [&>*>#variants]:hover:bottom-[4rem] [&>*>#variants]:hover:h-[4rem]"
    const price = 2000
    const pricefactor = 0.8
  
    return (
     <li key={key} className={`bg-white ${variantStyles}  rounded-sm shadow-xl`}>
        <div className="h-96  ">
            {product == null ? 'ERROR' :<ProductLink color={product.color} id={product.id}> <img className='h-full w-full object-contain'  src={currentImage} alt="" />  </ProductLink>}
            <ProductVariants parentImage={product.images[0]} setCurrent={setCurrentImage} color={item.color} map={map}/>
        </div>
        <div className='  px-3 py-2  bg-stone-50 border-t-2 border-stone-200 overflow-hidden whitespace-nowrap text-ellipsis'>
            <div className='font-bold text-lg mb-2  whitespace-nowrap max-h-4 text-ellipsis'>{product.brand} </div>
            <span className='font-bold text-xl  whitespace-nowrap max-h-4 text-ellipsis'>{product.name} </span>
            <br /><span className='text-stone-600 text-lg font-semibold'>{product.color}</span>
            <div className='flex items-center justify-between my-2'>
                <Price price={product.price} pricefactor={product.price_factor}/>

                <div className='flex gap-2'>
                {product != null ? <ProductLink color={product.color} id={product.id}> <button className='w-20 h-12  bg-stone-800 border-2 text-xl border-stone-900 font-[750] hover:font-[900] text-stone-100 rounded-sm shadow-sm hover:shadow-md hover:scale-110 transition-all '>BUY</button> </ProductLink> :  <button className='w-20 h-12  bg-stone-800 border-2 text-xl border-stone-900 font-[750] hover:font-[900] text-stone-100 rounded-sm shadow-sm hover:shadow-md hover:scale-110 transition-all '>BUY</button>}

                </div>
            </div>
        </div>
    </li>

     
  )
}

export default ProductCard








