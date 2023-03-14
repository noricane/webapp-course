import { stockedSize } from "./../src/model/product";
import { Admin } from "./../src/model/admin";
import { Schema, Model } from "mongoose";
import { conn } from "./conn";
import { Product } from "../src/model/product";
import { CATEGORY, GENERALCOLOR } from "../src/helper/utils";

export const productSchema: Schema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  brand: { type: String, required: true },
  description: { type: String, required: true },
  color: { type: String, required: true },
  generalColor: { type: String, enum: GENERALCOLOR, required: true },
  price: { type: Number, required: true },
  category: { type: String, enum: CATEGORY, required: true },
  stock: [
    {
      size: { type: Number, required: true },
      amount: { type: Number, required: true },
    },
  ],
  price_factor: { type: Number, required: true },
  images: { type: [String], required: true },
});

export const productModel = conn.model<Product>("Product", productSchema);
