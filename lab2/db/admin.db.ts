import { Admin, AdminMethods } from "./../src/model/admin";
import { Schema, Model } from "mongoose";

import { conn } from "./conn";

type AdminModel = Model<Admin,{},AdminMethods>


const adminSchema: Schema = new Schema<Admin,AdminModel,AdminMethods>({
  id: { type: Number, unique: true, required: true },
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

adminSchema.method('comparePassword' , function comparePassword(str:string):boolean{
  return this.password == str;
})
adminSchema.method('changePassword' , function changePassword(str:string):boolean{
  this.password = str
  return true
  
})
adminSchema.method('changeEmail' , function comparePassword(str:string):boolean{
  this.eamil = str
  return true
})

export const adminModel = conn.model<Admin,AdminModel>("Admin", adminSchema);
