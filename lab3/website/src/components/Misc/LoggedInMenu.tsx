import React from 'react'
import { MdOutlineShoppingBag,MdPersonOutline, MdOutlinePersonOutline  } from "react-icons/md";
import { IoBagOutline, IoPersonOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { hover } from '@testing-library/user-event/dist/hover';
import PersonalInfo from '../Account/PersonalInfo';
import PrevOrders from '../Account/PrevOrders';
import ProfileSettings from '../Account/ProfileSettings';
import { cartAtom } from '../../model/jotai.config';
import { useAtom } from 'jotai';

const LoggedInMenu = ({open,firstColor,secondColor, mobile}:{open?:boolean,firstColor:[firstBg:string,firstText:string,firstHex:string],secondColor:[secondBg:string,secondText:string,secondHex:string],mobile:boolean}) => {
    const [firstBg,firstText,] = firstColor
    const [secondBg,secondText,secondHex] = secondColor
    const [cart,] = useAtom(cartAtom)
    const component = {PersonalInfo:<PersonalInfo/>,PrevOrders:<PrevOrders/>,ProfileSettings:<ProfileSettings/>}
  return (
    <div className="sm:absolute   [&>*]:hover:cursor-pointer right-0 mx-4 flex gap-2">
          <Link to="/cart"    className={`rounded-sm flex justify-center items-center ${secondText} ${firstBg} hover:${secondBg} hover:${firstText} w-12 h-12 p-1  border-4`} style={{borderColor:secondHex}}>
            <IoBagOutline className={`utsm:absolute ${open == null || open == true ? 'opacity-100' : 'opacity-0'}  duration-300 transition-all`} size={24} />

            <div className={`rounded-full utsm:-ml-12 utsm:mt-12 utsm:border-2 border-stone-200 bg-stone-900 text-stone-100 flex justify-center items-center sm:absolute ${cart.length < 100  ? 'w-7 h-7 z-10 utsm:bottom-[22.5rem]  utsm:left-[2rem] sm:bottom-[-.75em] sm:left-[-.75em]':'h-9 w-9 bottom-[-1em] left-[-1em]'}`}>{cart.length < 100 ? cart.length : '99+'}</div>
          </Link>
          
          <Link to="/account" className={`rounded-sm flex justify-center items-center ${firstText} ${secondBg} hover:${firstBg} hover:text-stone-900 w-12 h-12 p-1  border-4`} style={{borderColor:secondHex}}>
            <IoPersonOutline   size={24}/>
          </Link>
          

    </div>
  )
}

export default LoggedInMenu