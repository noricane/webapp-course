import { Admin } from './../src/model/admin';
import { Schema, Model } from "mongoose";







import { conn } from "./conn";



const adminSchema : Schema = new Schema({


    id: {type:Number,unique:true,required : true}, 
    name: {type:String, required: true},
    email: {type:String, unique:true ,required:true, },
    password: {type:String,required:true,},
     

})

export const adminModel = conn.model<Admin>("Admin", adminSchema);
