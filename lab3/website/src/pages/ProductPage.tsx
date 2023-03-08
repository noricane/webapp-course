import React from 'react'

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
          size: 42,
          amount: 999,
        }],
        price_factor: 1,
        images: ["https://cdn.shopify.com/s/files/1/1626/5391/products/Air-Jordan-1-Low-True-Blue-_GS_-Crepslocker-Front_970x.jpg?v=1674236361","https://cdn.shopify.com/s/files/1/1626/5391/products/Air-Jordan-1-Low-True-Blue-_GS_-Crepslocker-Top_970x.jpg?v=1676626230","https://cdn.shopify.com/s/files/1/1626/5391/products/Air-Jordan-1-Low-True-Blue-_GS_-Crepslocker-Front-Side_970x.jpg?v=1674236361","https://cdn.shopify.com/s/files/1/1626/5391/products/Air-Jordan-1-Low-True-Blue-_GS_-Crepslocker-Back_970x.jpg?v=1676626230"],
    };
  return (
    <div className='min-h-[50rem] grid grid-cols-2'>
        <div id='images'>
            {Product.images.map(e => <img src={e} alt="" />)}
        </div>

        <div id='info'>

        </div>
    </div>
  )
}

export default ProductPage