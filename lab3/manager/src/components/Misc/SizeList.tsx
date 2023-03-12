import React, { useState } from "react";

const SizeList = ({useError, useSize,}: {
  useError: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  useSize: [{size:number,amount:number}[], React.Dispatch<React.SetStateAction<{size:number,amount:number}[]>>];
}) => {
  const [sizeOpen, setSizeOpen] = useState<boolean>(false);
  const [error, setError] = useError;
  const [sizeList, setSizeList] = useSize;
  return (
    <div className="flex relative">
      <button
        onClick={() => {
          setSizeOpen((prev:boolean) => !prev);
        }}
        className="w-full h-10 bg-white  relative z-10 rounded-sm "
      >
        Sizes
      </button>
      <button
        onClick={() => {
          setError(false);
          const inputs = prompt(
            "Enter  size and stock separated by a - eg. size:42 stock:55 = 42-55"
          );
          if (
            inputs == null ||
            inputs.split("-").length > 2 ||
            inputs.split("-").length < 2
          ) {
            setError(true);
            return;
          }
          const input: number[] = inputs
            .split("-")
            .filter((e) => !isNaN(parseInt(e)))
            .map((e) => parseInt(e));

          setSizeList((prev) => [
            ...prev,
            { size: input[0], amount: input[1] },
          ]);
        }}
        className="h-10 rounded-r-sm bg-stone-800 text-white font-oswald w-12 text-3xl active:bg-stone-100 active:text-stone-900 transition-all"
      >
        +
      </button>
    </div>
  );
};

export default SizeList;
