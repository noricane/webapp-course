import React from 'react'
import { Link } from 'react-router-dom';

const ProductLink = (props:{id:string;color:string;children: React.ReactNode}) => {
  const state = {id:props.id, color:props.color}
    return (
      <Link 
      to={`/product/${props.id}?color=${props.color.replace(/\s/g, '').toLowerCase()}`}
      //state={{info:state}}
      
      >{props.children}</Link>
    )
  }
  

export default ProductLink