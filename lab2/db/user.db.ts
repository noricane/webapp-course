import { Schema, Model } from "mongoose";
import { addressType } from "../src/model/adress";
import { Product } from "../src/model/product";
import { User } from "../src/model/user";

import { conn } from "./conn";
import { productModel, productSchema } from "./product.db";

const userSchema: Schema = new Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  phonenumber: { type: String, required: true },
  birthdate: { type: Date, required: true },
  orders: {
    type: [
      {
        id: Number,
        items: [{ item: productSchema, size: Number, amount: Number }],
      },
    ],
    required: true,
  },

  adresses: {
    type: [
      {
        id: Number,
        type: { type: String, enum: addressType, required: true },
        street: String,
        city: String,
        country: String,
        zip: String,
      },
    ],
    required: true,
  },
});


userSchema.methods.comparePassword = function(str:string):boolean{
    return this.password == str
}
userSchema.methods.changePassword = function(str:string):void{
    this.password = str
}
userSchema.methods.changeEmail = function(str:string):void{
    this.eamil = str
}


export const userModel = conn.model<User>("User", userSchema);
