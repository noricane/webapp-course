import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Grid = () => {
    const [list,setList] = useState<any[]>([])
    useEffect(()=>{
        async function getTasks(){
            console.log("Before get");
            
            const {data} =  await axios.get("http://localhost:8080/product")
            setList(prev => {
                console.log("After get",list);
                return [...prev,data]})
            
            list.forEach(e=> console.log(e.id))
        }
        
        getTasks();

        
    },[])
    
  return (
    <div>
        
    </div>
  )
}

export default Grid