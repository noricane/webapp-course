import React from 'react'
import { MdOutlineShoppingBag,MdPersonOutline, MdOutlinePersonOutline  } from "react-icons/md";
import { IoBagOutline, IoPersonOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { hover } from '@testing-library/user-event/dist/hover';

const LoggedInMenu = ({firstColor,secondColor, mobile}:{firstColor:[firstBg:string,firstText:string,firstHex:string],secondColor:[secondBg:string,secondText:string,secondHex:string],mobile:boolean}) => {
    const [firstBg,firstText,] = firstColor
    const [secondBg,secondText,secondHex] = secondColor
    
  return (
    <div className="sm:absolute   [&>*]:hover:cursor-pointer right-0 mx-4 flex gap-2">

          <Link to="/cart"    className={`rounded-sm flex justify-center items-center ${secondText} ${firstBg} hover:${secondBg} hover:${firstText} w-12 h-12 p-1  border-4`} style={{borderColor:secondHex}}>
            <IoBagOutline size={24} />
          </Link>
          {mobile === false && 
            <ul className='absolute top-12 right-0 w-48 rounded-b-md p-2 rounded-l-md bg-stone-200 border-stone-900 border-2'>
                <li>asd</li>
                <li>asd</li>
                <li>asd</li>
            </ul>
          }
          <Link to="/account" className={`rounded-sm flex justify-center items-center ${firstText} ${secondBg} hover:${firstBg} hover:text-stone-900 w-12 h-12 p-1  border-4`} style={{borderColor:secondHex}}>
            <IoPersonOutline   size={24}/>
          </Link>
          {false && 
            <ul className='absolute top-12 right-[0em] w-48 rounded-b-md p-2 rounded-l-md bg-stone-200 border-stone-900 border-2'>
                <li>asd</li>
                <li>asd</li>
                <li>asd</li>
            </ul>
          }

    </div>
  )
}

export default LoggedInMenu