import React, { useEffect, useState } from 'react'





import { config } from '../model/config';
import { Product } from '../model/product';
import { Link, useLocation, useNavigate } from "react-router-dom";


import { useAtom } from 'jotai';
import axios from 'axios';
import { getProduct } from '../components/api';
import ProductImages from '../components/Structural/ProductImages';
import SizeList from '../components/Misc/SizeList';
import ProductLink from '../components/Logic/ProductLink';

const ProductPage = () => {
  
  
  const location = useLocation()
  const {pathname,search} = location
  const id = pathname.split('/')[pathname.split('/').length-1]
  const color = search.split('=')[search.split('=').length-1]
  const nav = useNavigate()
  
  const [size, setSize] = useState<{size:number,amount:number}[]>([]) 
  const [Product, setProduct] = useState<Product>() 
  const [variants, setVariants] = useState<Product[]>([]) 
  const [error, setError] = useState<boolean>(false) 
  const [price, setPrice] = useState<string>() 
  const [priceFactor, setPriceFactor] = useState<string>() 
  const [desc, setDesc] = useState<string>() 
  const [images, setImages] = useState<string[]>([]) 


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
        setPrice(Product.price+"")
        setPriceFactor(Product.price_factor+"")
        setDesc(Product.description);
        setImages(Product.images);
  
      })()
      
    },[Product])
    if(Product == null){
        return (<div className='utsm:min-h-screen h-[50rem] flex justify-center items-center font-oswald text-5xl'>Loading...</div>)
    }
  

  return (
    <>
    <div className='min-h-[50rem] p-8 grid grid-cols-2 relative -z-[0] utsm:flex utsm:flex-col'>
        <div id='images'>
            <ProductImages setImages={setImages} images={images}/>
        </div>
        
        <article className='p-8' id='info'>
            <h2 className='text-2xl text-stone-700  font-oswald'>{Product.brand}</h2>
            <h1 className='text-4xl font-oswald font-bold'>{Product.name}</h1>
          
            <ul className='flex gap-2'>
        {variants.map(e => <Link to='disabled' onClick={(evt)=>{
          evt.preventDefault();
          nav(`/edit/${e.id}?color=${e.color.replace(/\s/g, '').toLowerCase()}`)
          nav(0)
          }} ><img className='w-24' src={e.images[0]}></img></Link>)}
        </ul>
            
            <label htmlFor="" className=' flex p-1 h-10 text-sm items-center font-bold '>Price:</label>
            <input className='text-2xl text-stone-700 h-10 rounded-sm font-oswald' value={price} onChange={e=>setPrice(prev => {
                    if(prev != null && prev?.length < e.target.value.length && isNaN(parseInt(e.target.value.slice(prev?.length,)))){
                        return prev
                    }
                    return e.target.value
                })}/>


            <label htmlFor="" className='flex p-1 h-10 text-sm items-center font-bold '>Discount &#40;%&#41;: &nbsp;</label>
            <input className='text-2xl text-stone-700 h-10 rounded-sm font-oswald' value={priceFactor} onChange={e=>setPriceFactor(prev => {
                    if(prev != null && prev?.length < e.target.value.length && isNaN(parseInt(e.target.value.slice(prev?.length,)))){
                        return prev
                    }
                    return e.target.value
                })}/>
   



            <label htmlFor="" className='flex p-1 h-10 text-sm items-center font-bold '>Description: </label>
            <textarea rows={3} className='text-2xl w-full text-stone-700 h-10 rounded-sm font-oswald' value={desc} onChange={e=>setDesc(e.target.value)}>
                  {desc}
                </textarea>
            <SizeList useError={[error,setError]} useSize={[size,setSize]} />

            <button onClick={()=>{}} className='w-40 rounded-sm p-1 h-12 font-bold bg-stone-900 text-stone-50 active:bg-stone-100 active:text-stone-900 transition-all'>Confirm changes</button>
            {error && <span className='text-red-500 font-bold ml-12'>{"Error occured, follow the instructions"}</span>}
        </article>
    </div>
   
    
    </>
  )
}

export default ProductPage