import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import Dropdown from '../components/Misc/Dropdown'
import Card from '../components/Structural/Card'
import Grid from '../components/Structural/Grid'
import { ToArray } from '../helper/utils'
import { config } from '../model/config'
import { CATEGORY, GENERALCOLOR } from '../model/misc'
import { Product } from '../model/product'




const Dashboard = () => {
  async function getTasks(){
    try {
    let arr:Product[]= []
    const {data}:{data:Map<string,Map<string,Product>>} =  await axios.get(`${config.URL}/product`);
    Array.from(data.values()).forEach((e:any) => {
      e.value.forEach((element:any) => {
        arr.push(element.value)
      })        
    })
    console.log("Arr",arr);
    setItems(prev => [...prev,...arr])
    } catch (error) {
    }
  }
  
  async function getBrands(){
    try {
    const {data}:{data:string[]} =  await axios.get(`${config.URL}/product/brands`);
    setBrands(prev => [...prev,...data])
    } catch (error) {
    }
}
  useEffect(()=>{
    
    getTasks();   
    getBrands();   
  },[])
  
  
  

  const selectedBrand = useRef<string>()
  const selectedCategory = useRef<string>()
  const [selectedColor, setSelectedColor] = useState<GENERALCOLOR>()

  const [brands, setBrands] = useState<string[]>([])
  const categories:CATEGORY[] =[CATEGORY.LOW,CATEGORY.MID,CATEGORY.HIGH]
  const colors :string[] = ToArray().map((e:string) => e[0].toUpperCase().concat(e.substring(1).toLowerCase()))
  
  const [items, setItems] = useState<Product[]>([])
  const filterHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {}

  const Button = ({desc}:{desc:string,onClick?:Function}) => {
    return (
      <button onClick={()=>{}}  className='bg-stone-800 text-stone-50 h-12 w-36 hover:bg-stone-900 rounded-sm active:bg-stone-50 active:text-stone-800 transition-all'>{desc}</button>

    )
  }
  
  
  
  return (
    <div className='bg-stone-200 m-4 rounded-md min-h-screen p-4'>
        <div className='text-center flex items-center justify-center gap-3'>
          <Button desc='Add Product +' />
          <Button desc='Edit Batch' />

          <label htmlFor="brand">Brand:</label>
          <Dropdown selected={} items={brands} />
          <label htmlFor="category">Category:</label>
          <Dropdown selected={} items={categories} />
          <label htmlFor="category">Color:</label>
          <Dropdown selected={} items={colors} />

          <Button desc='Filter Selection' onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{}} />


        </div>
        <Grid items={items}/>
    </div>
  )
}

export default Dashboard