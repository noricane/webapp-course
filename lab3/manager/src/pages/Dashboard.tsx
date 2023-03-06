import axios from 'axios'
import React, { useEffect, useReducer, useState } from 'react'
import { BrandDropdown, ColorDropdown } from '../components/Misc/Dropdown'
import Grid from '../components/Structural/Grid'
import { ToArray } from '../helper/utils'
import { config } from '../model/config'
import { CATEGORY, GENERALCOLOR } from '../model/misc'
import { Product } from '../model/product'


export type FilterState = {
  brand:    string       | null,
  category: CATEGORY     | null,
  color:    GENERALCOLOR | null,
}

type FilterAction = {
  type: 'set_brand' | 'set_category' | 'set_color',
  payload: FilterState
}

function reducer(state:FilterState, 
                  action:{type:FilterAction["type"],payload:string}):FilterState  {
  switch (action.type) {
    case 'set_brand':

      return {...state, brand: action.payload}
      
      
      
      
      case 'set_category':
        const categoryindex:number = Object.values(CATEGORY).indexOf(action.payload.toUpperCase());
        if(categoryindex < 0){
          return state
        }

        return {...state, category: categoryindex}


      
    case 'set_color':
      console.log(action.payload);
      

      const colorindex:number = Object.values(GENERALCOLOR).indexOf(action.payload.toUpperCase());
      if(colorindex < 0){
        return state
      }

      return {...state, color: colorindex}
      


    default:
      return state;
        

  }
}


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
  
  
  const initialState: FilterState = {
    brand:null,category:null,color:null
}

  const [state, dispatch] = useReducer(reducer ,initialState);
  const [prevState,setPrevState] = useState<FilterState>({brand:null,category:null,color:null})

  const [brands, setBrands] = useState<string[]>([])
  const categories:CATEGORY[] =[CATEGORY.LOW,CATEGORY.MID,CATEGORY.HIGH]
  const colors :string[] = ToArray().map((e:string) => e[0].toUpperCase().concat(e.substring(1).toLowerCase()))
  
  const [items, setItems] = useState<Product[]>([])
  const filterHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if(state.brand == prevState.brand && state.category == prevState.category && state.color == prevState.color ){return}
    else{
      axios.get()
      setPrevState(state)
    }
  }

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
          <BrandDropdown onClick={dispatch} action={"set_brand"} state={state.brand} items={brands}>{state.brand == null ?`Brand ➤` : state.brand}</BrandDropdown>
          <label htmlFor="category">Category:</label>
          {/* <Dropdown items={categories.map(e => CATEGORY[e])} /> */}
          <BrandDropdown onClick={dispatch} action={"set_category"} state={state.category} items={categories.map(e => CATEGORY[e])}>{state.category == null ?`Category ➤` : CATEGORY[state.category]}</BrandDropdown>
          {/* <div className=' text-green'>
            <select className='bg-stone-50  h-10 rounded-lg px-3 w-32 text-center text-ellipsis       whitespace-nowrap text-stone-800'>
            <option value="none" selected disabled hidden>Choose an option</option>
             {categories.map(e => CATEGORY[e]).map(e =>  <option value={`${e}`}>{e}</option>)}
            </select>
          </div> */}

          <label htmlFor="category">Color:</label>
          <ColorDropdown onClick={dispatch} action={"set_color"} state={state.color} items={colors} >Colors</ColorDropdown>

          <Button desc='Filter Selection' onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{}} />


        </div>
        <Grid items={items}/>
    </div>
  )
}

export default Dashboard