import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard'
const Grid = () => {
    const [list,setList] = useState<any[]>([])
    useEffect(()=>{
        async function getTasks(){
            console.log("Before get");
            
            const resp =  await axios.get("http://localhost:8080/product")

            setList(prev => [...prev,resp.data])
        }
        
        getTasks();



        
    },[])
    useEffect(()=>{ 
      console.log(list)
    },[list]);
  return (
    <div className="min-h-screen flex items-center">
  <div className="flex-1 max-w-7xl mx-auto p-10">
    <ul className="grid  grid-cols-4 utxl:grid-cols-3 utlg:grid-cols-2 utsm:grid-cols-1 gap-8 md:gap-8">
     <ProductCard />

    </ul>
  </div>
</div>
  )
}

export default Grid
