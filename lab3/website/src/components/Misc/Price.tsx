import React from "react";
import { config } from "../../model/config";
import Badge from "./Badge";

/* Component for displaying price or discounted price */
const Price = (props: {price:number,pricefactor:number,gap?:boolean}) => {
  const price = props.price;
  const pricefactor = props.pricefactor;
  
  if (price == -1) {
    return <div className="font-bold text-stone-500">Out of Stock</div>;
  }

  if (price * pricefactor < price) {
    return (
      <div className={`${props?.gap && 'utsm:flex-col utsm:flex utsm:gap-2' }`}>
        <div className="w-auto [&>*]:h-2.5 mb-3 gap-2 flex flex-wrap px-0 font-semibold">
          <span className="line-through text-stone-500">{`${price.toLocaleString()}${
            config.CURRENCY
          } `}</span>
          <span className="">{`${(price * pricefactor).toLocaleString()} ${
            config.CURRENCY
          } `}</span>
        </div>
        <div>
          {pricefactor < 1 && (
            <Badge info={`${100 - pricefactor * 100}% Off`} />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="w-auto [&>*]:h-2.5 text-lg mb-3 gap-2 flex flex-wrap px-0 font-semibold">
      {" "}
      {`${price.toLocaleString()} ${config.CURRENCY}`}
    </div>
  );
};

export default Price;
