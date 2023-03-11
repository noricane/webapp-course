import { useAtom } from "jotai";
import Cookies from "js-cookie";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { sessionAtom } from "../../model/jotai.config";

const Layout = ({ children }: any) => {

  const [session,setSession] = useAtom(sessionAtom)
  const nav = useNavigate()
  
  return (
    <div className="bg-stone-50 min-h-screen">
      <Link to='onclick overrides this' onClick={(e)=>{
        e.preventDefault();
        if(session == null){
          nav('/')
        }else{
          nav('/dashboard')

        }
      }}>
        <video
          onClick={() => {}}
          muted
          playsInline
          draggable="false"
          autoPlay
          className="hover:cursor-pointer h-28 mx-auto md:left-0 video mix-blend-darken"
        >
          <source src={"media/logohb.mp4"} type="video/mp4" />
          <p>Aesthetic video loop of logo</p>
        </video>
        <div className="text-center  text-2xl font-oswald font-bold ">
          ADMIN
        </div>
        {session && <button className="h-12 w-36 absolute z-10 top-12 mr-12 bg-stone-800 text-stone-50 active:bg-stone-200 active:text-stone-800 font-oswald text-xl rounded-sm right-0" onClick={(e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
          e.preventDefault();
          Cookies.remove('user')
          setSession(undefined)
        }}>Log Out</button>}
        {/* relative mt-[-1rem] */}
      </Link>
      {children}
    </div>
  );
};

export default Layout;
