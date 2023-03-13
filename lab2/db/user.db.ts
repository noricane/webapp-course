import { Schema, Model } from "mongoose";
import { addressType } from "../src/model/adress";
import { Product } from "../src/model/product";
import { User } from "../src/model/user";




import { conn } from "./conn";
import { productModel } from "./product.db";



const userSchema : Schema = new Schema({


    id: {type:Number,required : true}, 
    name: {type:String, required: true},
    email: {type:String, unique:true ,required:true, },
    password: {type:String,required:true,},
    phonenumber: {type:String,required:true,},
    birthdate: {type:Date,required:true,},
    orders:{type:[
        {
            id:Number,
            items: [
                {item: productModel,
                size:Number,
                amount: Number,}
            ]
        }
    ],
    required:true},

    adresses: {type:[
        { id: Number,
         type: addressType,
         street: String,
         city: String,
         country: String, 
         zip: String,}
     ],
    required:true}

})

export const userModel = conn.model<User>("User", userSchema);
