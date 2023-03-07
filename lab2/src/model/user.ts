import { PastOrder, multiProduct } from './pastorder';
import { UserType } from "../helper/utils";
import { address } from "./adress";
import { BaseUser } from "./baseuser";

export class User extends BaseUser{
    phonenumber: string;
    birthdate: string;
    orders: PastOrder[]
    adresses: address[];
    
    constructor(id: number,name: string,email: string,phonenumber: string,birthdate: string,adresses: address[], ...orders:PastOrder[]){
        super(id,name,email)
        this.phonenumber = phonenumber;
        this.birthdate = birthdate;
        this.adresses = adresses;
        this.orders = [];
        orders.forEach((e:PastOrder) => {
            this.orders.push(e)
        });
    }
    addOrder(...multi:multiProduct[]){
        const item:PastOrder = new PastOrder(Date.now(),multi)
        this.orders.push(item)
    }
    
    getType():string {
        return UserType[UserType.CUSTOMER]
    }
}