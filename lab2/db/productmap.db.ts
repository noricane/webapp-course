import { productSchema } from './product.db';
import { Schema, Model } from "mongoose";
import { conn } from "./conn";
import { Product } from "../src/model/product";

export const productMapSchema: Schema = new Schema({
  id: { type: String, required: true },
  /* Holds all color variations that a product has */
  product:{ 
                type: Map,
                of:productSchema
            }
});

export const productMapModel = conn.model<Map<string,Product>>("ProductMap", productMapSchema);
