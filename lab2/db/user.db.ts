import { multiProduct } from './../src/model/archive/pastorder';
import { Schema, Model } from "mongoose";
import { addressType } from "../src/model/adress";
import { PastOrder } from "../src/model/pastorder";
import { User, UserMethods } from "../src/model/user";
import { conn } from "./conn";
import { productSchema } from "./product.db";
import { hashize } from '../src/helper/utils';


/* Defined to enable method usage */
type UserModel = Model<User,{},UserMethods>

/* Defined type <User,UserModel,UserMethods> to enable method usage*/
/* Roughly translated user interface to schema */
const userSchema: Schema = new Schema<User,UserModel,UserMethods>({
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
        id: {type:Number},
        addressType: { type: String, enum: addressType, required: true },
        street: String,
        city: String,
        country: String,
        zip: String,
      },
    ],
    required: true,
  },
});

/* Relevant methods */
userSchema.method('comparePassword' , function comparePassword(str:string):boolean{
    return this.password == hashize(str);
})
userSchema.method('changePassword' , function changePassword(str:string):boolean{
    this.password = str
    return true
})
userSchema.method('changeEmail' , function comparePassword(str:string):boolean{
    this.eamil = str
    return true
})

userSchema.method('getOrders' , function getOrders():PastOrder[]{
    return this.orders
})
userSchema.method('addOrder' , function addOrder(list:multiProduct[]):PastOrder{
    const newOrder  ={id:Date.now(),items:list};
    this.orders.push(newOrder)
    return newOrder
})

userSchema.method('setOrders' , function getOrders(list:PastOrder[]):void{
    this.orders = list
})

export const userModel = conn.model<User,UserModel>("User", userSchema);
