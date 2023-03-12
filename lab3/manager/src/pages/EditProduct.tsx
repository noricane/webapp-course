import React, { useEffect, useState } from 'react'





import { config } from '../model/config';
import { Product } from '../model/product';
import { useLocation } from "react-router-dom";


import { useAtom } from 'jotai';
import axios from 'axios';
import { getProduct } from '../components/api';
import ProductImages from '../components/Structural/ProductImages';
import SizeList from '../components/Misc/SizeList';

const ProductPage = () => {
  
  
  const location = useLocation()
  const {pathname,search} = location
  const id = pathname.split('/')[pathname.split('/').length-1]
  const color = search.split('=')[search.split('=').length-1]
  
  
  const [size, setSize] = useState<{size:number,amount:number}[]>([]) 
  const [Product, setProduct] = useState<Product>() 
  const [variants, setVariants] = useState<Product[]>() 
  const [error, setError] = useState<boolean>(false) 



    useEffect(()=>{
      (async ()=>{
        const p = await getProduct(id,color)
        if(p == undefined){
          setError(true)
          return
        }
        setProduct(p)
      })()
    },[])

   useEffect(()=>{
    if(Product == null){return}
      (async ()=>{
        const {data}:{data:{key:string,value:Product}[]|string} = await axios.get(`${config.URL}/product/${Product.id}`)
        if(typeof(data) == "string"){return}
        const list:Product[] = []
        console.log(data)
        data.forEach(e => e.value.color != Product.color && list.push(e.value))

        setVariants([Product,...list])

  
      })()
      
    },[Product])
    if(Product == null){
        return (<div className='utsm:min-h-screen h-[50rem] flex justify-center items-center font-oswald text-5xl'>Loading...</div>)
    }
    if(error){
        return (<div className='utsm:min-h-screen h-[50rem] flex justify-center items-center font-oswald text-5xl'>Erro message</div>)
    }

  return (
    <>
    <div className='min-h-[50rem] p-8 grid grid-cols-2 relative -z-[0] utsm:flex utsm:flex-col'>
        <div id='images'>
            <ProductImages images={Product.images}/>
        </div>

        <article className='p-8' id='info'>
            <h2 className='text-2xl text-stone-700  font-oswald'>{Product.brand}</h2>
            <h1 className='text-4xl font-oswald font-bold'>{Product.name}</h1>
            <h3 className='text-xl text-stone-500 font-oswald'>"{Product.color}"</h3>
            <span className='text-xl font-semibold mb-3'>{Product.price*Product.price_factor} {config.CURRENCY}</span>





            <section className='mt-3'>{Product.description}</section>

            <SizeList useError={[error,setError]} useSize={[size,setSize]} />
            <button onClick={()=>{}} className='w-36 rounded-sm p-1 h-12 font-bold bg-stone-900 text-stone-50 active:bg-stone-100 active:text-stone-900 transition-all'>Add To Cart +</button>

        </article>
    </div>
   
    
    </>
  )
}

export default ProductPage