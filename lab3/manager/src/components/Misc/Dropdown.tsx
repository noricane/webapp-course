import React from 'react'

const Dropdown = ({items}:{items:string[]}) => {
    return (

        <div className=' text-green'>
     
          <select className='bg-stone-50  h-10 rounded-lg px-3 w-32 text-center text-ellipsis whitespace-nowrap text-stone-800'>
          <option value="none" selected disabled hidden>Choose and option</option>
           {items.map(e =>  <option value={`${e}`}>{e}</option>)}
     
     
     
          </select>
     
        </div>
     
      );
}

export default Dropdown