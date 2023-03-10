import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { getProducts } from '../../api'
import { config } from '../../model/config'
import { Product } from '../../model/product'
import ProductCard from './ProductCard'
const Grid = () => {
    const [list,setList] = useState<Product[]>([])
    useEffect(()=>{
       (async()=>{
        const resp = await getProducts();
        if(resp == undefined ){
          return
        }
        setList(resp)
       })()       
    },[])

  return (
    <div className="min-h-screen flex justify-center py-10">
  <div className="flex-1 utxs:max-w-xl utsm:max-w-md max-w-8xl mx-auto utxs:px-5  px-10">{/* utxs:px-2 */}
    <ul className="grid  grid-cols-4 utxl:grid-cols-3 utlg:grid-cols-2 utsm:grid-cols-1 gap-8 md:gap-8">
    {list.map(e => <ProductCard key={e.id.concat(e.color)} item={e}/>)}

    </ul>
  </div>
</div>
  )
}

export default Grid
