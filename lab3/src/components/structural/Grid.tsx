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
    <div className="min-h-screen flex justify-center py-10">
  <div className="flex-1 utxs:max-w-xl utsm:max-w-md max-w-8xl mx-auto utxs:px-2 px-10">
    <ul className="grid  grid-cols-4 utxl:grid-cols-3 utlg:grid-cols-2 utsm:grid-cols-1 gap-8 md:gap-8">
     <ProductCard />
     <ProductCard />
     <ProductCard />
     <ProductCard />
     <ProductCard />
     <ProductCard />
     <ProductCard />
     <ProductCard />
     

    </ul>
  </div>
</div>
  )
}

export default Grid
