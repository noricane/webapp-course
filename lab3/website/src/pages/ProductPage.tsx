import React from 'react'
import Carousel from '../components/structural/Carousel';
import ProductImages from '../components/structural/ProductImages';
import SizeList from '../components/structural/SizeList';
import { config } from '../model/config';

const ProductPage = () => {
    const Product = {
        name: "Name",
        brand: "Brand",
        description: "888 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos, dolorem id modi, perspiciatis ullam possimus, assumenda quam quibusdam inventore consequuntur aliquam. Temporibus ipsam deserunt totam laborum beatae maxime, reiciendis consequuntur ex molestiae. Dicta minima molestias incidunt. Numquam distinctio a quis laboriosam, assumenda ducimus eveniet. Rerum placeat minus officiis possimus? Debitis.",
        color: "Midnight",
        generalColor:"BLACK",
        category:"LOW",
        price: 777,
        stock: [{
            size: 39,
            amount: 999,
          },{
            size: 40,
            amount: 0,
          },{
            size: 41,
            amount: 4,
          },{
            size: 42,
            amount: 999,
          },{
            size: 44,
            amount: 29,
          },],
        price_factor: 1,
        images: ["https://cdn.shopify.com/s/files/1/1626/5391/products/Air-Jordan-1-Low-True-Blue-_GS_-Crepslocker-Front_970x.jpg?v=1674236361","https://cdn.shopify.com/s/files/1/1626/5391/products/Air-Jordan-1-Low-True-Blue-_GS_-Crepslocker-Top_970x.jpg?v=1676626230","https://cdn.shopify.com/s/files/1/1626/5391/products/Air-Jordan-1-Low-True-Blue-_GS_-Crepslocker-Front-Side_970x.jpg?v=1674236361","https://cdn.shopify.com/s/files/1/1626/5391/products/Air-Jordan-1-Low-True-Blue-_GS_-Crepslocker-Back_970x.jpg?v=1676626230"],
    };

    return (<div className='utsm:min-h-screen h-[50rem] flex justify-center items-center font-oswald text-5xl'>Erro message</div>)

  return (
    <>
    <div className='min-h-[50rem] p-8 grid grid-cols-2 relative -z-[0] utsm:flex utsm:flex-col'>
        <div id='images'>
            <ProductImages images={Product.images}/>
        </div>

        <article className='p-8' id='info'>
            <h2 className='text-2xl text-stone-700  font-oswald'>{Product.brand}</h2>
            <h1 className='text-4xl font-oswald font-bold'>{Product.name}</h1>
            <h3 className='text-xl text-stone-500 font-oswald'>"{Product.color}"</h3>
            <span className='text-xl font-semibold mb-3'>{Product.price*Product.price_factor} {config.CURRENCY}</span>

            <div className=' h-32 w-[] my-8 bg-stone-300'>

            </div>

            <section>{Product.description}</section>

            <SizeList items={Product.stock} />
            <button className='w-36 rounded-sm p-1 h-12 font-bold bg-stone-900 text-stone-50 active:bg-stone-100 active:text-stone-900 transition-all'>Add To Cart +</button>

        </article>
    </div>
    <div className='h-[30rem] bg-stone-700'>
        <span className='font-oswald w-full inline-block my-2 text-stone-300 text-2xl text-center'>Check out Similar Products</span>
    <div className='h-[26rem]'>
    <Carousel items={[]} id="similar"></Carousel>
    </div>
    </div>
    
    </>
  )
}

export default ProductPage