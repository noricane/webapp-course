import { PastOrder, multiProduct } from './pastorder';
import { UserType } from "../helper/utils";
import { address } from "./adress";
import { BaseUser } from "./baseuser";


/* User Class */
export class User extends BaseUser{
    phonenumber: string;
    birthdate: Date;
    orders: PastOrder[]
    adresses: address[];
    
    constructor(name: string,email: string,password:string,phonenumber: string,birthdate: Date,adresses: address[], ...orders:PastOrder[]){
        super(name,email,password)
        this.phonenumber = phonenumber;
        this.birthdate = birthdate;
        this.adresses = adresses;
        this.orders = [];
        /* If a user has products upon creation, push them to this.orders */
        orders.forEach((e:PastOrder) => {
            this.orders.push(e)
        });
    }
    /* Add a new address to user */
    addAddress(desc:any){
        this.adresses.push(new address(desc.type,desc.street,desc.city,desc.country, desc.zip))
    }
    /* Create order and return it*/
    addOrder(...multi:multiProduct[]):PastOrder{
        const item:PastOrder = new PastOrder(Date.now(),multi)
        this.orders.push(item)
        return item
    }
    
    getType():string {
        return UserType[UserType.CUSTOMER]
    }
}