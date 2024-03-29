import React, { useEffect, useState } from 'react'
import { config } from '../model/config';
import { Product } from '../model/product';
import { useLocation, useNavigate } from "react-router-dom";


import { useAtom } from 'jotai';
import axios from 'axios';
import { sessionAtom } from '../model/jotai.config';
import ProductImages from '../components/Structural/ProductImages';
import { MenuButton } from '../components/Misc/Dropdown';
import { CategoryToArray, checkString, GeneralColorToArray } from '../helper/utils';
import { GENERALCOLOR } from '../model/misc';
import { addProduct } from '../components/api';
import Input from '../components/HTML/Input';

const AddProduct = () => {
  /* State management */
  const [sizeList, setSizeList] = useState<{size:number,amount:number}[]>([]) 
  const [sizeOpen, setSizeOpen] = useState<boolean>(false) 
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
  const [error, setError] = useState<string>() 
  const [session, ] = useAtom(sessionAtom)
  const colors :string[] = GeneralColorToArray().map((e:string) => e[0].toUpperCase().concat(e.substring(1).toLowerCase()))
  const categories :string[] = CategoryToArray().map((e:string) => e[0].toUpperCase().concat(e.substring(1).toLowerCase()))
  const nav = useNavigate()
 
    
  const submitHandler = () => {
    /* Check that input is valid */
    if(sizeList.length == 0 || !checkString(name) || !checkString(brand) || !checkString(color) || colors.filter(e => e.toLowerCase()==generalColor?.toLowerCase()).length == 0 ||category == null || categories[parseInt(category as string)]==null || !checkString(desc) || price == null || isNaN(parseInt(price)) || priceFactor == null || isNaN(parseInt(priceFactor)) || images.length ==0    ){
      setError("Input nonvalid")
      return
    }
    /* Send request */
    (async () => {
      let pf = 1- parseInt(priceFactor)/100 > 0 &&1- parseInt(priceFactor)/100 <= 1 ? 1- parseInt(priceFactor)/100 : 1 
      /* @ts-ignore - Typescript doesn't realize that we've checked name etc in the checkString function. */
      const resp = await addProduct(name,brand,desc,color,(generalColor+"").toUpperCase(),(category+"").toUpperCase(),parseInt(price),pf,sizeList,images)
      console.log("log",resp);
      
      if(resp == true){
        setError("Successfully added product")
        setTimeout(()=>nav('/'),2000)
        return
      }
      setError("Something went wrong, please try again");
      setTimeout(()=>setError(undefined),2000)
      
    })()
  }
   

  return (
    <>
    <div className='min-h-[50rem] bg-stone-200 m-4 rounded-md p-8 grid grid-cols-2 relative -z-[0] utmd:flex utmd:flex-col'>
        <div id='images'>
            <ProductImages setImages={setImages} images={images}/>
        </div>

        {/* Product Brand and Name */}
        <article className='p-8 grid grid-cols-2 gap-2' id='info'>
            <label htmlFor="brand" className='justify-end flex p-1 h-10 items-center font-bold col-span-1 '>Brand: &nbsp;</label>
            <Input name='brand' value={brand} onChange={setBrand} />


            <label htmlFor="name" className='justify-end  h-10 col-span-1 flex p-1 items-center font-bold '>Name: &nbsp;</label>
            <Input name='name' value={name} onChange={setName} />


            {/* Color and general color */}
            <label htmlFor="color" className='justify-end  h-10 col-span-1 flex p-1 items-center font-bold '>Color: &nbsp;</label>
            <Input name='color' value={color} onChange={setColor} />

            <label htmlFor="" className='justify-end flex p-1 h-10 items-center font-bold '>General Color: &nbsp;</label>
            <ColorDropdown color={generalColor} setColor={setGeneralColor}  colors={colors} />

            <label  className='justify-end flex p-1 h-10 items-center font-bold '>Category: &nbsp;</label>
            <div>
                <button onClick={()=>{setCategoryOpen(prev => !prev)}} className='w-full h-10 bg-white  relative z-10 rounded-sm '>{category == null ? 'Categories':category}</button>
                <ul className={`${!categoryOpen && 'hidden' } w-48 h-12 z-[15] bg-stone-50 rounded-sm border-2 flex justify-around items-center absolute`}>
                    {categories.map(e=><li onClick={()=>{setCategory(categories.indexOf(e)+"");setCategoryOpen(false)}} className='hover:bg-stone-200 border-2  px-1 rounded-lg'>{e}</li>)}
                </ul>
            </div>

            {/* Descritpion and Price */}
            <label htmlFor="desc" className='justify-end flex p-1 h-10 items-center font-bold '>Description: &nbsp;</label>
            <Input name='desc' value={desc} onChange={setDesc} />

            <label className='justify-end flex p-1 h-10 items-center font-bold '>Price: &nbsp;</label>
            <Input name="price" value={price} onChange={(e:string)=>{
              setPrice(prev => {
                if(prev != null && prev?.length < e.length && isNaN(parseInt(e.slice(prev?.length,)))){
                  return prev
                }
                if(isNaN(parseInt(e))){ return "" }
                return e.replace(/^0+/, '')})}}/>
      

                {/* Label and input for discount, discount checks that the input is only of type number and. */}
            <label className='justify-end flex p-1 h-10 text-sm items-center font-bold '>Discount &#40;%&#41;: &nbsp;</label>
            <Input name="price" value={priceFactor} onChange={(e:string)=>{
              setPriceFactor(prev => {
                if(prev != null && prev?.length < e.length && isNaN(parseInt(e.slice(prev?.length,)))){
                  return prev
                }
                if(isNaN(parseInt(e))){ return "" }
                return e.replace(/^0+/, '')})}}/>

            {/* Add Product Images */}
            <label htmlFor="link" className='justify-end flex p-1 h-10 items-center font-bold '>Image: &nbsp;</label>
            <span className='flex w-full'>
              <Input name='link'  value={link} onChange={setLink} />

              <button onClick={()=>{ link!= null && setImages(prev => [...prev,link]);setLink("")}} className='h-10 rounded-r-sm bg-stone-800 text-white font-oswald w-12 text-3xl active:bg-stone-100 active:text-stone-900 transition-all'>+</button>
            </span>
            {/* Add Stocked Size Images */}
            <label className='justify-end flex p-1 h-10 items-center font-bold '>Stock: &nbsp;</label>
            <span className='flex flex-col w-full'>
              <div className='flex relative'>
              <button onClick={()=>{setSizeOpen(prev => !prev)}} className='w-full h-10 bg-white  relative z-10 rounded-sm '>Sizes</button>
              <button onClick={()=>{
                setError(undefined)
                const inputs = prompt("Enter  size and stock separated by a - eg. size:42 stock:55 = 42-55");
                if(inputs == null || (inputs.split("-").length>2 || inputs.split("-").length<2)){
                  setError("Input incorrect")
                  return
                }
                const input:number[] = inputs.split("-").filter(e => !isNaN(parseInt(e))).map(e => parseInt(e))

                setSizeList(prev => {
                  const obj = {size:input[0],amount:input[1]}
                  let find = prev.find(e => e.size == input[0])
                  console.log("haha");
                  
                  if(find != null){
                    console.log("heeh");
                    return [...prev.filter(e=>e.size!=input[0]),obj].sort((a,b)=>  a.size - b.size)
                  }

                  return [...prev,obj].sort((a,b)=>  a.size - b.size)
                })
                
              }} className='h-10 rounded-r-sm bg-stone-800 text-white font-oswald w-12 text-3xl active:bg-stone-100 active:text-stone-900 transition-all'>+</button>
              </div>
              
              <div> 
                <ul className={`${!sizeOpen && 'hidden' } w-48 min-h-12 bg-stone-50 rounded-sm border-2 gap-2 py-4 flex flex-col overflow-scroll justify-around items-center absolute`}>
                    {sizeList.map(e=><li onClick={()=>{setSizeList(prev => prev.filter(elem => elem != e));}} className='hover:bg-stone-200 border-2  cursor-pointer px-1 rounded-lg'>Size: {e.size} - Stock: {e.amount}</li>)}
                </ul>
              </div>
           
            </span>
            {error && <div className='absolute text-stone-600 text-xl bottom-4 font-bold utsm:col-span-2 md:col-span-1 md:col-start-2   utmd:justify-self-center'>{error}</div>}
            <button onClick={()=>{submitHandler()}} className='col-span-2 mt-4 justify-self-center w-36 rounded-sm p-1 h-12 font-bold bg-stone-900 text-stone-50 active:bg-stone-100 active:text-stone-900 transition-all'>Add Product +</button>

        </article>
    </div>  
    </>
  )
}

export default AddProduct



/* Can't remember why I use this local component instead of the one defined in /Misc, the code isn't identical and when trying to replace it I receive errors, no time to refactor */
const ColorDropdown = (props:any) => {
  const [open, setOpen] = useState<boolean>() 
  const {color,setColor,colors} = props
  return (
    <div>
    <button onClick={()=>{setOpen(prev => !prev)}} className='h-10 w-full rounded-sm bg-white px-2 overflow-hidden inline-block text-ellipsis whitespace-nowrap' >{color == null ? `Color ►` : GENERALCOLOR[colors.indexOf(color)]}</button>
      <div className={`${open ? '' :'hidden'} absolute z-20 w-56  max-h-48 overflow-x-scroll bg-white rounded-md border-2 border-stone-200`}>
        {colors.map((e:any) => <button onClick={() => e != color ? setColor(e) : setColor(undefined)} className={`p-2 m-1 ${color == e? 'bg-stone-900 text-white active:bg-white  active:text-black border-stone-900 hover:bg-stone-600': 'hover:bg-stone-200 bg-white active:bg-stone-900 active:border-stone-900 active:text-white border-stone-200' } border-2  rounded-md leading-[.25rem]`} m-1><span className={`h-4 w-4 inline-block border-black border`} style={{background:`${e.toLowerCase() == 'multicolored' ? 'linear-gradient(90deg, red, yellow, green, blue)': e}`}}></span> {e}</button>)}
      </div>
    </div>  
  )
}

