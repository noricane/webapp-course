import axios from 'axios'
import React, { useEffect, useReducer, useState } from 'react'
import { Link } from 'react-router-dom'
import { getFilteredProducts, getProductBrands, getProducts } from '../api'
import { ColorDropdown, GeneralDropdown } from '../components/Misc/Dropdown'

import Grid from '../components/structural/Grid'

import { checkLatinCharacters, ToArray } from '../helper/utils'


import { CATEGORY, GENERALCOLOR, Product } from '../model/types'

/* Object that represents filtering functionality. */
export type FilterState = {
  brand:    string       | null,
  category: CATEGORY     | null,
  color:    GENERALCOLOR | null,
}

/* Object that represents reducer call. */
type FilterAction = {
  type: 'set_brand' | 'set_category' | 'set_color',
  payload: FilterState
}

/* Reducer to handle filtering. Modifies all three possible filter properties of FilterState object. */
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


const Browse = () => {
  /* State managing function for filter requests */
  async function getTasksPayload({category,color,brand}:{category:CATEGORY | null, color:GENERALCOLOR | null, brand:string | null}){
    try {
      const data:Product[] = await getFilteredProducts(category,color)
      console.log("data is",data);
      
      setItems(data)      
      if (brand != null) {
        setFiltered(data == null ? undefined :  data.filter((e:Product) => checkLatinCharacters(e.brand) == checkLatinCharacters(brand)))
      } else{
        setFiltered(data)
      }
    } catch (error) {
      console.log(error);
    }
  }
  /* Get */
  async function fetchProducts(){
    try {
      const arr:Product[] = await getProducts()
      setFiltered(arr)
      setItems(arr)
    } catch (error) {
    }
  }
  
  async function getBrands(){
    try {
    const data:string[] =  await getProductBrands();
    setBrands(prev => [...data])
    } catch (error) {
    }
}
  useEffect(()=>{
    
    const res = [fetchProducts(),getBrands()]
    Promise.all(res)
    setLoading(false)
  },[])
  
  
  const initialState: FilterState = {
    brand:null,category:null,color:null
}

  const [state, dispatch] = useReducer(reducer ,initialState);
  const [prevState,setPrevState] = useState<FilterState>({brand:null,category:null,color:null})

  const [brands, setBrands] = useState<string[]>([])
  const categories:CATEGORY[] =[CATEGORY.LOW,CATEGORY.MID,CATEGORY.HIGH]
  const colors :string[] = ToArray().map((e:string) => e[0].toUpperCase().concat(e.substring(1).toLowerCase()))
  
  const [items, setItems] = useState<Product[]>()
  const [filtered, setFiltered] = useState<Product[]>()
  const [loading, setLoading] = useState<boolean>(true)

  const filterHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {    

    if(state.brand == prevState.brand && state.category == prevState.category && state.color == prevState.color ){return}
    else if ( state.category != prevState.category || state.color != prevState.color){/*  if (state.category != prevState.category || state.color != prevState.color) */
    console.log("Here");
    
      getTasksPayload({category:state.category,color:state.color,brand:state.brand})
      setPrevState(state)
      
    } else if (state.brand != null){
      
      setFiltered(prev => {
        if(prev != null && state.brand != null)/* @ts-ignore */{
          return items.filter((e:Product) => checkLatinCharacters(e.brand) == checkLatinCharacters(state.brand))
        }
      })

    }
    console.log(state);

  }

 
  
  
  return (
    <div className='  rounded-md min-h-screen '>
        <div className='text-center sm:h-36 flex utsm:flex-col h-auto items-center bg-stone-300 p-3 justify-center gap-3'>

         <span className='grid grid-cols-2 sm:flex utsm:w-full gap-2'>
         <label className='self-center justify-self-end ' htmlFor="brand">Brand:</label>
          <span className='justify-self-start'>
          <GeneralDropdown onClick={dispatch} action={"set_brand"} state={state.brand} items={brands}>{state.brand == null ?`Brand ➤` : state.brand}</GeneralDropdown>
          </span>
         </span>

         <span className='grid grid-cols-2 sm:flex utsm:w-full gap-2'>


          <label className='self-center justify-self-end ' htmlFor="category">Category:</label>
          {/* <Dropdown items={categories.map(e => CATEGORY[e])} /> */}
          <span className='justify-self-start'>

          <GeneralDropdown onClick={dispatch} action={"set_category"} state={state.category} items={categories.map(e => CATEGORY[e])}>{state.category == null ?`Category ➤` : CATEGORY[state.category]}</GeneralDropdown>
          </span>
          </span>
          {/* <div className=' text-green'>
            <select className='bg-stone-50  h-10 rounded-lg px-3 w-32 text-center text-ellipsis       whitespace-nowrap text-stone-800'>
            <option value="none" selected disabled hidden>Choose an option</option>
             {categories.map(e => CATEGORY[e]).map(e =>  <option value={`${e}`}>{e}</option>)}
            </select>
          </div> */}
         <span className='grid grid-cols-2 sm:flex utsm:w-full gap-2'>

            <label className='self-center justify-self-end ' htmlFor="category">Color:</label>
            <span className='justify-self-start'>
              <ColorDropdown onClick={dispatch} action={"set_color"} state={state.color} items={colors} >Colors</ColorDropdown>
            </span>
          </span>
          <Button desc='Filter Selection' onClick={filterHandler} />


        </div>
        <Grid loading={loading} items={filtered}/>
    </div>
  )
}

export default Browse

const Button = ({desc,onClick}:{desc:string,onClick?:Function}) => {
  return (
    <button onClick={()=>{onClick != null && onClick()}}  className='bg-stone-800 text-stone-50 h-12 w-36 hover:bg-stone-900 rounded-sm active:bg-stone-50 active:text-stone-800 transition-all'>{desc}</button>

  )
}
