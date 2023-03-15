import { ProductMethods, stockedSize } from "./../src/model/product";
import { Schema, Model } from "mongoose";
import { conn } from "./conn";
import { Product } from "../src/model/product";
import { CATEGORY, GENERALCOLOR } from "../src/helper/utils";

/* Defined to enable method usage */
type ProductModel = Model<Product,{},ProductMethods>


/* Defined type <Product,ProductModel,ProductMethods> to enable method usage*/
/* Roughly Translated product interface to schema here  */
export const productSchema: Schema = new Schema<Product,ProductModel,ProductMethods>({
  id: { type: String, required: true },
  name: { type: String, required: true },
  brand: { type: String, required: true },
  description: { type: String, required: true },
  color: { type: String, required: true },
  generalColor: { type: Number, enum: GENERALCOLOR, required: true },
  price: { type: Number, required: true },
  category: { type: Number, enum: CATEGORY, required: true },
  stock: [
    {
      size: { type: Number, required: true },
      amount: { type: Number, required: true },
    },
  ],
  price_factor: { type: Number, required: true },
  images: { type: [String], required: true },
});

/* Relevant method */
productSchema.method('setStock' , function setStock(stock:stockedSize[]):void{
  this.stock = stock;
})

export const productModel = conn.model<Product, ProductModel>("Product", productSchema);
