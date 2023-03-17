import { useAtom } from "jotai";
import Cookies from "js-cookie";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { sessionAtom } from "../../model/jotai.config";
import { removeAdmin } from "../api";

const Layout = ({ children }: any) => {

  const [session,setSession] = useAtom(sessionAtom)
  const nav = useNavigate()
  
  return (
    <div className="bg-stone-50 min-h-screen">
      <div className="h-auto  w-full">
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
          className="hover:cursor-pointer max-h-48 mx-auto md:left-0 video mix-blend-darken"
        >
          <source src={ window.location.protocol + "//" + window.location.host + "/media/logohb.mp4" } type="video/mp4" />
          <p>Aesthetic video loop of logo</p>
        </video>
        <div className="text-center  text-2xl font-oswald font-bold ">
          ADMIN
        </div>
        
        {/* relative mt-[-1rem] */}
      </Link>
        {session && <>
          <button className="h-12 w-36 absolute z-10 top-12 mr-12 bg-stone-800 text-stone-50 active:bg-stone-200 active:text-stone-800 font-oswald text-xl rounded-sm right-0" onClick={(e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
          e.preventDefault();
          Cookies.remove('user');
          setSession(undefined);
          nav('/')
          nav(0)

        }}>Log Out</button>
          <button className="h-12 w-36 mt-14 absolute z-10 top-12 mr-12 bg-stone-800 text-stone-50 active:bg-stone-200 active:text-stone-800 font-oswald text-xl rounded-sm right-0" onClick={(e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
          e.preventDefault();
          nav('/signup')


        }}>Add Admin</button>
          <button className="h-12 w-36 mt-14 absolute z-10 top-[6.5rem] mr-12 bg-stone-800 text-stone-50 active:bg-stone-200 active:text-stone-800 font-oswald text-xl rounded-sm right-0" onClick={(e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
          e.preventDefault();
          (async()=>{
            const resp = await removeAdmin(session.email)
            console.log(resp);
            if(typeof resp == "string"){
              return
            }else{
              Cookies.remove('user')
              setSession(undefined)
              nav('/')
              nav(0)
            }

          })()


        }}>Delete Admin</button>
        </>}
      </div>
      {children}
    </div>
  );
};

export default Layout;
