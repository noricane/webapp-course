import React, { useState } from "react";

const SizeList = ({useError, useSize,}: {
  useError: [string|undefined, React.Dispatch<React.SetStateAction<string|undefined>>];
  useSize: [{size:number,amount:number}[], React.Dispatch<React.SetStateAction<{size:number,amount:number}[]>>];
}) => {
  const [sizeOpen, setSizeOpen] = useState<boolean>(false);
  const [error, setError] = useError;
  const [sizeList, setSizeList] = useSize;
  return (
    <><div className="flex relative">
      <button
        onClick={() => {
          setSizeOpen(prev => !prev);
        }}
        className="w-full h-10 bg-white  relative z-10 rounded-sm "
      >
        Sizes
      </button>
      <button
        onClick={() => {
          setError(undefined);
          const inputs = prompt(
            "Enter  size and stock separated by a - eg. size:42 stock:55 = 42-55"
          );
          if (
            inputs == null ||
            inputs.split("-").length > 2 ||
            inputs.split("-").length < 2
          ) {
            setError("Error parsing input: please follow the instructions");
            return;
          }
          const input: number[] = inputs
            .split("-")
            .filter((e) => !isNaN(parseInt(e)))
            .map((e) => parseInt(e));

            setSizeList(prev => {
              const obj = {size:input[0],amount:input[1]}
              let find = prev.find(e => e.size == input[0])
              
              if(find != null){
                return [...prev.filter(e=>e.size!=input[0]),obj].sort((a,b)=>  a.size - b.size)
              }

              return [...prev,obj].sort((a,b)=>  a.size - b.size)
            })
        }}
        className="h-10 rounded-r-sm bg-stone-800 text-white font-oswald w-12 text-3xl active:bg-stone-100 active:text-stone-900 transition-all"
      >
        +
      </button>
    </div>
    <div> 
                <ul className={`${!sizeOpen && 'hidden' } w-48 min-h-12 bg-stone-50 rounded-sm border-2 gap-2 py-4 flex flex-col overflow-scroll justify-around items-center absolute`}>
                    {sizeList.map(e=><li onClick={()=>{setSizeList(prev => prev.filter(elem => elem != e));}} className='hover:bg-stone-200 border-2  cursor-pointer px-1 rounded-lg'>Size: {e.size} - Stock: {e.amount}</li>)}
                </ul>
              </div>
    </>
  );
};

export default SizeList;
