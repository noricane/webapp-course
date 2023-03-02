import React from 'react'
import { Link } from 'react-router-dom';

const ProductLink = (props:{id:string;color:string;children: React.ReactNode}) => {
    return (
      <Link to={`/product/${props.id}?color=${props.color.replace(/\s/g, '').toLowerCase()}`}>{props.children}</Link>
    )
  }
  

export default ProductLink