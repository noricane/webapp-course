import { ProductMethods, stockedSize } from "./../src/model/product";
import { Admin } from "./../src/model/admin";
import { Schema, Model } from "mongoose";
import { conn } from "./conn";
import { Product } from "../src/model/product";
import { CATEGORY, GENERALCOLOR } from "../src/helper/utils";

type ProductModel = Model<Product,{},ProductMethods>


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

productSchema.method('setStock' , function setStock(stock:stockedSize[]):boolean{
  return this.stock == stock;
})

export const productModel = conn.model<Product, ProductModel>("Product", productSchema);
