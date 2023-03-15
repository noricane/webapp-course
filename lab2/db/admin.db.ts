import { Admin, AdminMethods } from "./../src/model/admin";
import { Schema, Model } from "mongoose";
import { conn } from "./conn";
import { hashize } from "../src/helper/utils";


/* Defined to enable method usage */
type AdminModel = Model<Admin,{},AdminMethods>

/* Defined type <Admin,AdminModel,AdminMethods> to enable method usage*/
/* Roughly translated admin interface to schema */
const adminSchema: Schema = new Schema<Admin,AdminModel,AdminMethods>({
  id: { type: Number, unique: true, required: true },
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

adminSchema.method('comparePassword' , function comparePassword(str:string):boolean{
  return this.password == hashize(str);
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
