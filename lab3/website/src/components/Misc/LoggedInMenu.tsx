import React from 'react'
import { MdOutlineShoppingBag,MdPersonOutline, MdOutlinePersonOutline  } from "react-icons/md";
import { IoBagOutline, IoPersonOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { hover } from '@testing-library/user-event/dist/hover';
import PersonalInfo from '../Account/PersonalInfo';
import PrevOrders from '../Account/PrevOrders';
import ProfileSettings from '../Account/ProfileSettings';

const LoggedInMenu = ({firstColor,secondColor, mobile}:{firstColor:[firstBg:string,firstText:string,firstHex:string],secondColor:[secondBg:string,secondText:string,secondHex:string],mobile:boolean}) => {
    const [firstBg,firstText,] = firstColor
    const [secondBg,secondText,secondHex] = secondColor
    
    const component = {PersonalInfo:<PersonalInfo/>,PrevOrders:<PrevOrders/>,ProfileSettings:<ProfileSettings/>}
  return (
    <div className="sm:absolute   [&>*]:hover:cursor-pointer right-0 mx-4 flex gap-2">
          <Link to="/cart"    className={`rounded-sm flex justify-center items-center ${secondText} ${firstBg} hover:${secondBg} hover:${firstText} w-12 h-12 p-1  border-4`} style={{borderColor:secondHex}}>
            <IoBagOutline size={24} />
          </Link>
          
          <Link to="/account" className={`rounded-sm flex justify-center items-center ${firstText} ${secondBg} hover:${firstBg} hover:text-stone-900 w-12 h-12 p-1  border-4`} style={{borderColor:secondHex}}>
            <IoPersonOutline   size={24}/>
          </Link>
          

    </div>
  )
}

export default LoggedInMenu