import { PastOrder, multiProduct } from './pastorder';
import { UserType } from "../helper/utils";
import { address, addressType } from "./adress";
import { BaseUser } from "./baseuser";



//Rough translation of User class
export interface User extends BaseUser{
    phonenumber: string;
    birthdate: Date;
    orders: PastOrder[]
    adresses: {
        id: number;
        type: addressType;
        street: string;
        city: string;
        country: string; 
        zip: string;
    }[];
}
//User schema method interface
export interface UserMethods{
    comparePassword(str:string):boolean
    changePassword(str:string):boolean
    changeEmail(str:string):boolean
    getOrders():PastOrder[]
    addOrder(list:multiProduct[]):PastOrder
    setOrders(list:PastOrder[]):void  
}