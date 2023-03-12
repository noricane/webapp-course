import React from 'react'
import { Link } from 'react-router-dom';

const ProductLink = (props:{to:string,id:string;color:string;children: React.ReactNode}) => {
    return (
      <Link to={`/${props.to}/${props.id}?color=${props.color.replace(/\s/g, '').toLowerCase()}`}>{props.children}</Link>
    )
  }
  

export default ProductLink