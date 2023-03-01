import React, { useState } from 'react'
import Dropdown from '../components/Misc/Dropdown'
import Card from '../components/Structural/Card'
import Grid from '../components/Structural/Grid'

const Dashboard = () => {
  const [brands, setBrands] = useState<string[]>(["rackowens"])
  const [categories, setCategories] = useState<string[]>(["looasjkdhakjshdkahsdksajhtop"])
  const [colors, setCColors] = useState<string[]>(["bloo","red"])
  
  const Button = ({desc}:{desc:string}) => {
    return (
      <button className='bg-stone-800 text-stone-50 h-12 w-36 hover:bg-stone-900 rounded-sm active:bg-stone-50 active:text-stone-800 transition-all'>{desc}</button>

    )
  }
  
  
  
  return (
    <div className='bg-stone-200 m-4 rounded-md min-h-screen p-4'>
        <div className='text-center flex items-center justify-center gap-3'>
          <Button desc='Add Product +' />
          <Button desc='Edit Batch' />

          <label htmlFor="brand">Brand:</label>
          <Dropdown items={brands} />
          <label htmlFor="category">Category:</label>
          <Dropdown items={categories} />
          <label htmlFor="category">Color:</label>
          <Dropdown items={colors} />

        </div>
        <Grid />
    </div>
  )
}

export default Dashboard