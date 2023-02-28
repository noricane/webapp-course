import React from "react";
import Card from "../components/Structural/Card";
const Login = () => {
  return (
    <div className=" font-bold font-oswald flex items-center ">
      <Card>

        <h1 className="font-oswald text-3xl font-bold my-24">ADMIN LOGIN</h1>
        <form className="flex flex-col  justify-center gap-6">
            <Input title="USERNAME" type="text" />

            <Input title="PASSWORD" type="password" />

            <span className="[&>button]:mx-2 utxs:[&>button]:my-2">
                <Button title="LOG IN" onClick={function(){}}/>
                <Button title="CANCEL" onClick={function(){}}/>
            </span>
        </form>
      </Card>
    </div>
  );
};

export default Login;





export const Button = ({title,onClick}:{title:string,onClick:Function}) => {
  return (
    <button className="bg-stone-300 w-36 h-10 hover:bg-stone-400 active:bg-stone-50 active:text-stone-800" onClick={(e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>
        {
            e.preventDefault(); 
            onClick()
        }}>{title}</button>
  )
}


 const Input = ({type,title}: {type:string, title:string} ) => {
    const titleLowerCase = title.toLowerCase()
  return (
    <div className="flex utxs:flex-col  self-center items-center justify-center">
        <label htmlFor={`${titleLowerCase}`} className=" text-lg ">{title}</label>
            <input type={`${type}`} name={`${titleLowerCase}`} id={`${titleLowerCase}`} className="bg-stone-50 h-8 utxs:w-48 p-2 w-64 ml-4" />
    </div>
  )
}
