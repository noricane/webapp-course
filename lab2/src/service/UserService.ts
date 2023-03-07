import { stockedSize } from '../model/product';
import { Product } from "../model/product";

import { User } from '../model/user';
import { productConstructor } from '../helper/utils';
import { initShoes } from './dummyproducts';
import { PastOrder } from '../model/pastorder';

export interface IUserService {
    logInUser(mail: string,password:string) : Promise<boolean|ProductError>;
    //Returns a list of all listed products
    getUsers() : Promise<User[]|ProductError>;
    
    //Return specific product
    getUser(mail: string) : Promise<User|ProductError>;
    //Returns specific product and its color
    getUserOrders(id:string) : Promise<PastOrder[]|ProductError>;
    // Adds a product with the given description to the stores listings
    // and returns the created Product object
    addUser(desc:Object): Promise<User|ProductError>

    // Restocks existing product with the given amount,
    // and returns true if restock was successful
    addUserOrder(id: string, order:PastOrder): Promise<PastOrder|ProductError> 

    // Removes a product with the given id from stock,
    // and returns the removed Map<string(id),Product> object
    removeUser(id:string): Promise<User|ProductError> 

    



    addAdmin(): Promise<User|ProductError> //Change name of ProductError type?
    removeAdmin(id:number): Promise<User|ProductError> 
}

export class ProductError{
    code:number;
    message:string;

    constructor(code:number, message:string){
        this.code = code;
        this.message = message;
    }
}

export class UserService implements IUserService{
    logInUser(mail: string, password: string): Promise<boolean | ProductError> {
        throw new Error('Method not implemented.');
    }
    users: Map<string,User> = new Map<string,User>()

    admins: Map<number,User> = new Map<number,User>()
    
    async getUsers(): Promise<User[]> {
        return Array.from(this.users.values())
    }
    async getUser(mail: string): Promise<ProductError | User> {
        const query: User | undefined = this.users.get(mail);

        if(query != undefined){
            return query;
        }else{
            return new ProductError(404, "No user found with that email")
        }
    }
    async getUserOrders(id: string /* mail */): Promise<ProductError | PastOrder[]> {
        const query: User | undefined = this.users.get(id);
        if(query != undefined){
            return query.orders
        }else{
            return new ProductError(404, "No user found")
        }

    }
    async addUser(desc: Object): Promise<ProductError | User> {
        throw new Error('Method not implemented.');
    }
    async addUserOrder(id: string, order: PastOrder): Promise<PastOrder | ProductError> {
        throw new Error('Method not implemented.');
    }
    async removeUser(id: string): Promise<ProductError | User> {
        throw new Error('Method not implemented.');
    }
    async addAdmin(): Promise<ProductError | User> {
        throw new Error('Method not implemented.');
    }
    async removeAdmin(id: number): Promise<ProductError | User> {
        throw new Error('Method not implemented.');
    }
   
   
}

export function makeUserService(): UserService{
    return new UserService();
}