import { useEffect } from 'react'
import { Product } from '../../model/product'
import ProductCard from './ProductCard'
const Grid = ({items,loading}:{items:Product[] | undefined,loading:boolean}) => {
  if(loading){
    return (
    <div className="min-h-screen flex justify-center py-10">
        <div className="flex utxs:max-w-xl utsm:max-w-md max-w-8xl mx-auto utxs:px-5 justify-center font-oswald text-3xl">
          Loading
          </div>
    </div>)
  }
  return (
    <div className="min-h-screen flex justify-center py-10">
  <div className="flex utxs:max-w-xl utsm:max-w-md max-w-8xl mx-auto utxs:px-5  px-10">{/* utxs:px-2 */}
  { items == null && <div className='font-bold text-2xl font-oswald flex-col flex justify-center items-center h-[50%] text-center'><span className='text-4xl'>Error occured in getting a response </span>Contact Admin</div>} 
    
    {Array.isArray(items) && items.length == 0 && <div className='font-bold text-2xl font-oswald flex-col flex justify-center items-center h-[50%] text-center'><span className='text-4xl'>No Products Found. </span>Consider Applying a Different Filter or Adding A Product</div>} 
    
    <ul className="grid  grid-cols-4 utxl:grid-cols-3 utlg:grid-cols-2 utsm:grid-cols-1 gap-8 md:gap-8">
     {Array.isArray(items) && items.map((e:Product) => <ProductCard item={e} key={`${e}`}/>
     )}


     

    </ul>
  </div>
</div>
  )
}

export default Grid
