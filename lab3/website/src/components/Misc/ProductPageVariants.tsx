
/* Not to be confused with product variants which are the items that are shown when hovering over a product while browsing
These are the variants shown on a product's page */

import { useNavigate } from 'react-router-dom'
import { Product } from '../../model/types'
const ProductPageVariants = ({items}:{items:Product[]|undefined}) => {
    //Hook for navigating without links
    const navigate = useNavigate()
    
    /* Redirect page to the product clicked */
    const goToVariant=(id:string,color:string)=>{
      let path:string =`../product/${id}?color=${color.replace(/\s/g, '').toLowerCase()}`;
      navigate(path);
      navigate(0)
    }

  if(items == null){
      return (<div className='h-32  flex justify-center items-center font-oswald text-5xl'>Loading...</div>)
  }
  return (
        <div>
          <span className='font-oswald text-xl font-bold'>Check out the variants</span>
          <div className='h-32  overflow-scroll flex items-center  gap-2 '>
            {/* Render all variants of a product and add redirection handler to onclick */}
            {items.map(e =>  <>{e.images.length > 0 ? <img onClick={() => {
              goToVariant(e.id,e.color)
            }} src={e.images[0]} alt="" className='h-32 w-32  hover:brightness-95 active:brightness-75 object-contain bg-white hover:border-2 ' /> : <div>No image found</div>}</>)}
          </div>
        </div>
  )
}

export default ProductPageVariants