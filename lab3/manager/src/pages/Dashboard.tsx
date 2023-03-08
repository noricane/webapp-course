import axios from 'axios'
import React, { useEffect, useReducer, useState } from 'react'
import { Link } from 'react-router-dom'
import { ColorDropdown, GeneralDropdown } from '../components/Misc/Dropdown'
import Grid from '../components/Structural/Grid'
import { checkLatinCharacters, ToArray } from '../helper/utils'
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
  async function getTasksPayload({category,color,brand}:{category:CATEGORY | null, color:GENERALCOLOR | null, brand:string | null}){
    try {

    const {data}:{data:Product[]} =  await axios.get(`${config.URL}/product?${category != null ? `category=${category}&` : ''}${color != null ? `color=${color}`: ''}`);
    console.log("DATA IS ",data);
    

    setItems(data)
    
    if (brand != null) {
      setFiltered(data == null ? undefined :  data.filter((e:Product) => checkLatinCharacters(e.brand) == checkLatinCharacters(brand)))
    } else{
      setFiltered(data)
      
    }
  
    } catch (error) {
    }
  }
  async function getTasks(){
    try {
    let arr:Product[]= []
    const {data}:{data:Map<string,Map<string,Product>>} =  await axios.get(`${config.URL}/product`);
    Array.from(data.values()).forEach((e:any) => {
      e.value.forEach((element:any) => {
        arr.push(element.value)
      })        
    })
    console.log("DTATA",data);
    
    setFiltered([...arr])
    setItems([...arr])
    } catch (error) {
    }
  }
  
  async function getBrands(){
    try {
    const {data}:{data:string[]} =  await axios.get(`${config.URL}/product/brands`);
    setBrands(prev => [...data])
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
  
  const [items, setItems] = useState<Product[]>()
  const [filtered, setFiltered] = useState<Product[]>()

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

  const Button = ({desc,onClick}:{desc:string,onClick?:Function}) => {
    return (
      <button onClick={()=>{onClick != null && onClick()}}  className='bg-stone-800 text-stone-50 h-12 w-36 hover:bg-stone-900 rounded-sm active:bg-stone-50 active:text-stone-800 transition-all'>{desc}</button>

    )
  }
  
  
  
  return (
    <div className='bg-stone-200 m-4 rounded-md min-h-screen p-4'>
        <div className='text-center flex items-center justify-center gap-3'>
          <Link to={'/addproduct'}> <Button desc='Add Product +' /></Link>
          <Button desc='Edit Batch' />

          <label htmlFor="brand">Brand:</label>
          <GeneralDropdown onClick={dispatch} action={"set_brand"} state={state.brand} items={brands}>{state.brand == null ?`Brand ➤` : state.brand}</GeneralDropdown>
          <label htmlFor="category">Category:</label>
          {/* <Dropdown items={categories.map(e => CATEGORY[e])} /> */}
          <GeneralDropdown onClick={dispatch} action={"set_category"} state={state.category} items={categories.map(e => CATEGORY[e])}>{state.category == null ?`Category ➤` : CATEGORY[state.category]}</GeneralDropdown>
          {/* <div className=' text-green'>
            <select className='bg-stone-50  h-10 rounded-lg px-3 w-32 text-center text-ellipsis       whitespace-nowrap text-stone-800'>
            <option value="none" selected disabled hidden>Choose an option</option>
             {categories.map(e => CATEGORY[e]).map(e =>  <option value={`${e}`}>{e}</option>)}
            </select>
          </div> */}

          <label htmlFor="category">Color:</label>
          <ColorDropdown onClick={dispatch} action={"set_color"} state={state.color} items={colors} >Colors</ColorDropdown>

          <Button desc='Filter Selection' onClick={filterHandler} />


        </div>
        <Grid items={filtered}/>
    </div>
  )
}

export default Dashboard