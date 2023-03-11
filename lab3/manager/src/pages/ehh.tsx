import { useAtom } from "jotai";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { sessionAtom } from "../model/jotai.config";

//Input component for adding a new product


const AddProduct = () => {

  useEffect(()=>{
    if(session ==null){
      nav('/')
    }
  },[])
const nav = useNavigate()
const [session,] = useAtom(sessionAtom)

  return (
    <div className="bg-stone-200 m-4 rounded-md min-h-screen p-4">
      <div className="text-center flex items-center  justify-center gap-3">
        <form className="grid grid-cols-2 gap-4 w-96">
            <label htmlFor="brand" className="mr-2 self-center font-bold ">Name:</label>
            <input className="h-9 rounded-lg bg-stone-50 p-2" name="brand" type="text" />

            <label htmlFor="brand" className="mr-2">Brand</label>
            <input name="brand" type="text" />         

            <label htmlFor="brand" className="mr-2">Description</label>
            <input name="brand" type="text" />
        </form>
      </div>
    </div>
  );
};

export default AddProduct;



