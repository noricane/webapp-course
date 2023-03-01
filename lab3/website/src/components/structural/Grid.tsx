import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { config } from '../../model/config'
import ProductCard from './ProductCard'
const Grid = () => {
    const [list,setList] = useState<any[]>([])
    useEffect(()=>{
        async function getTasks(){
            console.log("Before get");
            
            const resp =  await axios.get(`${config.URL}/product`)

            setList(prev => [...prev,resp.data])
        }
        
        getTasks();



        
    },[])
    useEffect(()=>{ 
      console.log(list)
    },[list]);
  return (
    <div className="min-h-screen flex justify-center py-10">
  <div className="flex-1 utxs:max-w-xl utsm:max-w-md max-w-8xl mx-auto utxs:px-5  px-10">{/* utxs:px-2 */}
    <ul className="grid  grid-cols-4 utxl:grid-cols-3 utlg:grid-cols-2 utsm:grid-cols-1 gap-8 md:gap-8">
  

    </ul>
  </div>
</div>
  )
}

export default Grid
