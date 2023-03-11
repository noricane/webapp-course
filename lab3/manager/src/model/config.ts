import { Product } from "./product";

//👋😳
export const config = {
    URL:"http://localhost:8080",
    CURRENCY:'kr',
}


interface BaseUser {
    profilepic:string | undefined;//url TODO
     id: number; 
     name: string;
    email: string;
     password: string;
}


interface PastOrder{
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
 enum addressType {
    BILLING,
    DELIVERY
}
interface address {
    id: number;
    type: addressType;
    street: string;
    city: string;
    country: string; 
    zip: string;

}


export interface ProductError{
    code:number;
    message:string;
}

export interface Admin extends BaseUser{
    
}