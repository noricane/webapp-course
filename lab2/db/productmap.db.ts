import { productSchema } from './product.db';
import { stockedSize } from "./../src/model/product";
import { Admin } from "./../src/model/admin";
import { Schema, Model } from "mongoose";
import { conn } from "./conn";
import { Product } from "../src/model/product";
import { CATEGORY, GENERALCOLOR } from "../src/helper/utils";

export const productMapSchema: Schema = new Schema({
  id: { type: String, required: true },
  /* Holds all color variations that a product has */
  product:{ 
                type: Map,
                of:productSchema
            }


});

export const productMapModel = conn.model<Map<string,Product>>("ProductMap", productMapSchema);
