import React, { useEffect, useState } from 'react'





import { config } from '../model/config';
import { Product } from '../model/product';
import { Link, useLocation, useNavigate } from "react-router-dom";


import { useAtom } from 'jotai';
import axios from 'axios';
import { getProduct, editProduct, removeProduct, removeVariant } from '../components/api';
import ProductImages from '../components/Structural/ProductImages';
import SizeList from '../components/Misc/SizeList';
import ProductLink from '../components/Logic/ProductLink';
import TextArea from '../components/HTML/TextArea';
import Input from '../components/HTML/Input';
import { checkString } from '../helper/utils';
import ProductPageVariants from '../components/Misc/ProductPageVariants';

const ProductPage = () => {

  const removeVariantHandler = () => {
    if(Product == null) return
    (async()=>{
      const resp = await removeVariant(Product.id,Product.color)
      if(resp != null){
        setMessage("successfully removed product")
        setTimeout(()=>nav('/'),500)
        return
      }
      setMessage("Something went wrong")

      
    })()
  }
  const removeProductHandler = () => {
    (async()=>{
    if(Product == null) return
      const resp = await removeProduct(Product.id)
      if(resp != null){
        setMessage("successfully removed product")
        setTimeout(()=>nav('/'),500)
        return
      }
      setMessage("Something went wrong")
    })()
  }

  const submitHandler = () => {

    if(sizeList.length == 0 || !checkString(color) || !checkString(desc) || price == null || isNaN(parseInt(price)) || priceFactor == null || isNaN(parseInt(priceFactor)) || images.length ==0    ){
      setMessage("Input nonvalid")
      return
    }
    (async () => {
      let pf = 1- parseInt(priceFactor)/100 > 0 &&1- parseInt(priceFactor)/100 <= 1 ? 1- parseInt(priceFactor)/100 : 1 
      /* @ts-ignore - Typescript doesn't realize that we've checked name etc in the checkString function. */
      const resp = await editProduct(Product.name,Product.brand,desc,Product.color,Product.generalColor+"",Product.category+"",parseInt(price),pf,sizeList,images)
      if(resp == true){
        setMessage("Successfully edited product")
        setTimeout(()=>setMessage(undefined),2000)

      }
      
    })()
  }
  
  const location = useLocation()
  const {pathname,search} = location
  const id = pathname.split('/')[pathname.split('/').length-1]
  const color = search.split('=')[search.split('=').length-1]
  const nav = useNavigate()
  
  const [sizeList, setSizeList] = useState<{size:number,amount:number}[]>([]) 
  const [Product, setProduct] = useState<Product>() 
  const [variants, setVariants] = useState<Product[]>([]) 
  const [message, setMessage] = useState<string>() 
  const [price, setPrice] = useState<string>() 
  const [priceFactor, setPriceFactor] = useState<string>('0') 
  const [initial, setInitial] = useState<boolean>(true) 


  const [desc, setDesc] = useState<string>() 
  const [images, setImages] = useState<string[]>([]) 
  const [link, setLink] = useState<string>() 

    useEffect(()=>{
      (async ()=>{
        const p = await getProduct(id,color)
        if(p == undefined){
          setMessage("Error Fetching product")
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
        setPriceFactor((100-Product.price_factor*100)+"")
        setDesc(Product.description);
        setImages(Product.images);
        setSizeList(Product.stock)

      })()
      
    },[Product])
    if(Product == null){
        return (<div className='utsm:min-h-screen h-[50rem] flex justify-center items-center font-oswald text-5xl'>Loading...</div>)
    }
  

  return (
    <>
    <div className='min-h-[50rem] bg-stone-200 m-4 rounded-lg p-8 grid grid-cols-2 relative -z-[0] utsm:flex utsm:flex-col'>
        <div id='images'>
            <ProductImages setImages={setImages} images={images}/>
        </div>
        
        <article className='p-8' id='info'>
            <h2 className='text-2xl text-stone-700  font-oswald'>{Product.brand}</h2>
            <h1 className='text-4xl font-oswald font-bold'>{Product.name}</h1>
          
            {/* <ul className='flex w-auto gap-2 overflow-scroll'>
        {variants.map(e => <button className='w-24' onClick={(evt)=>{
          evt.preventDefault();
          nav(`/edit/${e.id}?color=${e.color.replace(/\s/g, '').toLowerCase()}`)
          nav(0)
          }} ><img className='w-24 h-24 object-cover' src={e.images[0]}></img></button>)}
        </ul> */}
            <ProductPageVariants items={variants} />
            <label htmlFor="price" className=' flex p-1 h-10 text-sm items-center font-bold '>Price:</label>
            <Input name="price" value={price} onChange={(e:string)=>{
              setPrice(prev => {
                if(prev != null && prev?.length < e.length && isNaN(parseInt(e.slice(prev?.length,)))){
                    return prev
                }
                if(isNaN(parseInt(e))){ return "" }
                return e.replace(/^0+/, '')})}}/>


            <label htmlFor="pricefactor" className='flex p-1 h-10 text-sm items-center font-bold '>Discount &#40;%&#41;: &nbsp;</label>
            <Input name="pricefactor" onChange={(e:string)=>{
              if(initial){setInitial(false)}
              setPriceFactor(prev => {
                if(prev != null && prev?.length < e.length && isNaN(parseInt(e.slice(prev?.length,)))){
                    return prev
                }
                if(isNaN(parseInt(e))){ return "" }
                return e.replace(/^0+/, '')})}} 
                value={initial ? priceFactor : priceFactor  }  />
      
   



            <label htmlFor="desc" className='flex p-1 h-10 text-sm items-center font-bold '>Description: </label>
            <TextArea name='desc' value={desc} onChange={setDesc} />
            
            <label htmlFor="" className=' flex p-1 h-10 items-center font-bold '>Stock: &nbsp;</label>
            <SizeList useError={[message,setMessage]}  useSize={[sizeList,setSizeList]} />

            <label htmlFor="" className=' flex p-1 h-10 items-center font-bold '>Image: &nbsp;</label>
            <span className='flex w-full'>
              <input className='text-2xl text-stone-700 h-10 w-full font-oswald rounded-l-sm' value={link} onChange={e=>setLink(e.target.value)}/>
              <button onClick={()=>{link && setImages(prev => [...prev,link]);setLink("")}} className='h-10 rounded-r-sm bg-stone-800 text-white font-oswald w-12 text-3xl active:bg-stone-100 active:text-stone-900 transition-all'>+</button>
            </span>
            <button onClick={()=>{submitHandler()}} className='w-40 mt-4 rounded-sm p-1 h-12 font-bold bg-stone-900 text-stone-50 active:bg-stone-100 active:text-stone-900 transition-all'>Confirm changes</button>
            <div>
            <button onClick={()=>{removeVariantHandler()}} className='w-36 mt-4 rounded-md p-1 h-12 font-bold bg-stone-50  hover:bg-red-50   text-red-500 active:bg-red-300 active:text-red-700 transition-all'>Remove Variant</button>
            <button onClick={()=>{removeProductHandler()}} className='w-36 mt-4 ml-3 rounded-md p-1 h-12 font-bold bg-stone-50  hover:bg-red-50   text-red-500 active:bg-red-300 active:text-red-700 transition-all'>Remove Product</button>
              
            </div>
            {message && <span className='text-stone-500  font-bold ml-12'>{message}</span>}
        </article>
    </div>
   
    
    </>
  )
}

export default ProductPage