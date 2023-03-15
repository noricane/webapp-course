import { createHash } from "crypto";
import { Product } from "./product";

interface BaseUser {
    profilepic:string | undefined;//url TODO
     id: number; 
     name: string;
    email: string;
     password: string;
}


export interface PastOrder{
    id:number;
    items: multiProduct[];

   
}
export interface stockedSize  {
    size:number;
    amount:number;
}
export interface multiProduct{
    item: Product; //product id 
    size:number;
    amount: number;
}

export enum UserType {
    ADMIN,
    CUSTOMER
}
export enum addressType {
    BILLING,
    DELIVERY
}
interface address {
    id: number;
    addressType: addressType;
    street: string;
    city: string;
    country: string; 
    zip: string;

}


export interface ProductError{
    code:number;
    message:string;
}

export interface User extends BaseUser{
    phonenumber: string;
    birthdate: Date;
    orders: PastOrder[]
    adresses: address[];
    
}