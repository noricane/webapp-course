import React, { useEffect, useState } from 'react'
import { config } from '../model/config';
import { Product } from '../model/product';
import { useLocation, useNavigate } from "react-router-dom";


import { useAtom } from 'jotai';
import axios from 'axios';
import { sessionAtom } from '../model/jotai.config';
import ProductImages from '../components/Structural/ProductImages';
import { MenuButton } from '../components/Misc/Dropdown';
import { CategoryToArray, GeneralColorToArray } from '../helper/utils';
import { GENERALCOLOR } from '../model/misc';

const AddProduct = () => {
  
     
  
  const [size, setSize] = useState<{size:number,amount:number}>() 
  const [name, setName] = useState<string>() 
  const [brand, setBrand] = useState<string>() 
  const [color, setColor] = useState<string>() 
  const [generalColor, setGeneralColor] = useState<string>() 
  const [category, setCategory] = useState<string>() 
  const [categoryOpen, setCategoryOpen] = useState<boolean>(false) 
  const [desc, setDesc] = useState<string>() 
  const [price, setPrice] = useState<string>() 
  const [priceFactor, setPriceFactor] = useState<string>() 
  const [images, setImages] = useState<string[]>([]) 
  const [link, setLink] = useState<string>("") 
  const [error, setError] = useState<boolean>(false) 
  const [session, ] = useAtom(sessionAtom)
  const colors :string[] = GeneralColorToArray().map((e:string) => e[0].toUpperCase().concat(e.substring(1).toLowerCase()))
  const categories :string[] = CategoryToArray().map((e:string) => e[0].toUpperCase().concat(e.substring(1).toLowerCase()))

    

   

  return (
    <>
    <div className='min-h-[50rem] bg-blue-300 p-8 grid grid-cols-2 relative -z-[0] utsm:flex utsm:flex-col'>
        <div id='images'>
            <ProductImages images={images}/>
        </div>

        {/* Product Brand and Name */}
        <article className='p-8 grid grid-cols-2 gap-2' id='info'>
        <label htmlFor="brand" className='flex p-1 items-center font-bold col-span-1 bg-blue-500'>Brand: &nbsp;</label>
        <input name={'brand'} className='text-2xl text-stone-700 h-10 rounded-sm col-span-1 font-oswald' value={brand} onChange={e=>setBrand(e.target.value)}/>
        
        <label htmlFor="" className='flex p-1 items-center font-bold bg-blue-500'>Name: &nbsp;</label>
        <input className='text-2xl text-stone-700 h-10 rounded-sm font-oswald' value={name} onChange={e=>setName(e.target.value)}/>


        {/* Color and general color */}
        <label htmlFor="" className='flex p-1 items-center font-bold bg-blue-500'>
            Color: &nbsp;
            <input className='text-2xl text-stone-700 h-10 rounded-sm font-oswald' value={color} onChange={e=>setColor(e.target.value)}/>

        </label>
        <label htmlFor="" className='flex p-1 items-center font-bold bg-blue-500'>
            General Color: &nbsp;
             <ColorDropdown color={generalColor} setColor={setGeneralColor}  colors={colors} />

        </label>
        <label htmlFor="" className='flex p-1 items-center font-bold bg-blue-500'>
            Category: &nbsp;

            <div>
            <button onClick={()=>{setCategoryOpen(prev => !prev)}} className='w-48 h-10 bg-stone-50  relative z-10 rounded-sm '>{category == null ? 'Categories':category}</button>
            <ul className={`${!categoryOpen && 'hidden' } w-48 h-12 bg-stone-50 rounded-sm border-2 flex justify-around items-center absolute`}>
                {categories.map(e=><li onClick={()=>{setCategory(categories.indexOf(e)+"");setCategoryOpen(false)}} className='hover:bg-stone-200 border-2  px-1 rounded-lg'>{e}</li>)}
               
            </ul>

            </div>
        </label>

        {/* Descritpion and Price */}
        <label htmlFor="" className='flex p-1 items-center font-bold bg-blue-500'>
            Description: &nbsp;
            <input className='text-2xl text-stone-700 h-10  rounded-sm font-oswald' value={desc} onChange={e=>setDesc(e.target.value)}/>

        </label>
        <label htmlFor="" className='flex p-1 items-center font-bold bg-blue-500'>
            Price: &nbsp;
            <input className='text-2xl text-stone-700 h-10 rounded-sm font-oswald' value={price} onChange={e=>setPrice(prev => {
                if(prev != null && prev?.length < e.target.value.length && isNaN(parseInt(e.target.value.slice(prev?.length,)))){
                    return prev
                }
                return e.target.value
            })}/>

        </label>
        <label htmlFor="" className='flex p-1 text-sm items-center font-bold bg-blue-500'>
            Discount &#40;%&#41;: &nbsp;
            <input className='text-2xl text-stone-700 h-10 rounded-sm font-oswald' value={priceFactor} onChange={e=>setPriceFactor(prev => {
                if(prev != null && prev?.length < e.target.value.length && isNaN(parseInt(e.target.value.slice(prev?.length,)))){
                    return prev
                }
                return e.target.value
            })}/>


        </label>

        {/* Add Product Images */}
        <label htmlFor="" className='flex p-1 items-center font-bold bg-blue-500'>
            Image: &nbsp;
            <input className='text-2xl text-stone-700 h-10 font-oswald rounded-l-sm' value={link} onChange={e=>setLink(e.target.value)}/>
            <button onClick={()=>{setImages(prev => [...prev,link]);setLink("")}} className='h-10 rounded-r-sm bg-stone-800 w-8'>+</button>
        </label>
            {/* <h1 className='text-4xl font-oswald font-bold'>{Product.name}</h1>
            <h3 className='text-xl text-stone-500 font-oswald'>"{Product.color}"</h3>
            <span className='text-xl font-semibold mb-3'>{Product.price*Product.price_factor} {config.CURRENCY}</span> */}




{/* 
            <section className='mt-3'>{Product.description}</section> */}


            <button onClick={()=>{}} className='w-36 rounded-sm p-1 h-12 font-bold bg-stone-900 text-stone-50 active:bg-stone-100 active:text-stone-900 transition-all'>Add Product +</button>

        </article>
    </div>
   

    
    </>
  )
}

export default AddProduct




const ColorDropdown = (props:any) => {
  const [open, setOpen] = useState<boolean>() 
    
    const {color,setColor,colors} = props
  return (
    <div>
        <button onClick={()=>{setOpen(prev => !prev)}} className='h-10 w-36 rounded-sm bg-white px-2 overflow-hidden inline-block text-ellipsis whitespace-nowrap' >{color == null ? `Color ►` : GENERALCOLOR[colors.indexOf(color)]}</button>

      <div className={`${open ? '' :'hidden'} absolute z-20 w-56  max-h-48 overflow-x-scroll bg-white rounded-md border-2 border-stone-200`}>
        {colors.map((e:any) => <button onClick={() => e != color ? setColor(e) : setColor(undefined)} className={`p-2 m-1 ${color == e? 'bg-stone-900 text-white active:bg-white  active:text-black border-stone-900 hover:bg-stone-600': 'hover:bg-stone-200 bg-white active:bg-stone-900 active:border-stone-900 active:text-white border-stone-200' } border-2  rounded-md leading-[.25rem]`} m-1><span className={`h-4 w-4 inline-block border-black border`} style={{background:`${e.toLowerCase() == 'multicolored' ? 'linear-gradient(90deg, red, yellow, green, blue)': e}`}}></span> {e}</button>)}
      </div>
    </div>  
  )
}

