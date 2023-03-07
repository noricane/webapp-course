import React from "react";
import { Link } from "react-router-dom";

const Layout = ({ children }: any) => {
  return (
    <div className="bg-stone-50 min-h-screen">
      <Link to={'/'}>
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
        {/* relative mt-[-1rem] */}
      </Link>
      {children}
    </div>
  );
};

export default Layout;
