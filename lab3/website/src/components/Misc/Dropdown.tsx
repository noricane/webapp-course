import React, { ReactNode, useState } from 'react'
import { GENERALCOLOR } from '../../model/product';
import useComponentVisible from '../hooks/useComponentVisible';


/* General list dropdown with state */
export const GeneralDropdown = ({state,items,children,onClick,action }:{items:any[],children:ReactNode,state:any,onClick:Function,action:string}) => {
  /* custom hook for detecting clicks outside Dropdown component */
  const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false);
    return (
      <div ref={ref} className=''> 
        <MenuButton onClick={()=>setIsComponentVisible(prev => !prev)}>{children}</MenuButton>
        <div className={`${isComponentVisible ? '' :'hidden'} absolute w-56 max-h-48 overflow-x-scroll bg-white rounded-md border-2 border-stone-200`}>
          {/* onclick is a useReducer dispatch function and is called with the object {type:string,payload:any} to update the usereducer state and closes the list*/}
          {items.map(e => <button onClick={() => {
            e != state ? onClick({type:action,payload:e}) : onClick({type:action,payload:null});
            setIsComponentVisible(false)
            }} className={`p-2 m-1 overflow-hidden text-ellipsis whitespace-nowrap ${state == e? 'bg-stone-900 text-white active:bg-white  active:text-black border-stone-900 hover:bg-stone-600': 'hover:bg-stone-200 bg-white active:bg-stone-900 active:border-stone-900 active:text-white border-stone-200' } border-2  rounded-full leading-[.25rem]`} m-1>{e}</button>)}
        </div>
      </div>);
}

/* Specific dropdown for the enum GENERALCOLOR */
export const ColorDropdown = ({state,items,children,onClick,action}:{items:any[],children:ReactNode,state:any,onClick:Function,action:string}) => {
  /* custom hook for detecting clicks outside Dropdown component */
  const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false);
  return (
    <div ref={ref}>
      <MenuButton onClick={()=>{setIsComponentVisible(prev => !prev)}}>{state == null ? `${children} ➤` : GENERALCOLOR[state]}</MenuButton>
      <div  className={`${isComponentVisible ? '' :'hidden'} absolute w-56  max-h-48 overflow-x-scroll bg-white rounded-md border-2 border-stone-200`}>
          {/* onclick is a useReducer dispatch function and is called with the object {type:string,payload:any} to update the usereducer state and closes the list*/}
        {items.map(e => <button onClick={() => {
          e != state ? onClick({type:action,payload:e}) : onClick({type:action,payload:null}); 
          setIsComponentVisible(false);
      }} className={`p-2 m-1 ${state == e? 'bg-stone-900 text-white active:bg-white  active:text-black border-stone-900 hover:bg-stone-600': 'hover:bg-stone-200 bg-white active:bg-stone-900 active:border-stone-900 active:text-white border-stone-200' } border-2  rounded-md leading-[.25rem]`} m-1><span className={`h-4 w-4 inline-block border-black border`} style={{background:`${e.toLowerCase() == 'multicolored' ? 'linear-gradient(90deg, red, yellow, green, blue)': e}`}}></span> {e}</button>)}
      </div>
    </div>   
    );
}

/* Simple menu button that passes onclick to the html button and children as buttons text value */
const MenuButton = ({children,onClick}:{children:ReactNode,onClick:Function})=>{
  return <button onClick={()=>onClick()} className='h-10 w-28 rounded-sm bg-white px-2 overflow-hidden inline-block text-ellipsis whitespace-nowrap' >{children}</button>
}

