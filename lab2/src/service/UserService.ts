import { ProductService } from './ProductService';
import { CATEGORY, GENERALCOLOR } from './../helper/utils';
import { addressType } from './../model/adress';
import { multiProduct } from './../model/pastorder';
import { stockedSize } from '../model/product';
import { Product } from "../model/product";

import { User } from '../model/user';
import { productConstructor } from '../helper/utils';
import { initShoes } from './dummyproducts';
import { PastOrder } from '../model/pastorder';
import { Admin } from '../model/admin';
import { address } from '../model/adress';
import { product_service } from '../router/ProductRouter';

export interface IUserService {
    logInUser(mail: string,password:string) : Promise<User|ProductError>;
    
    
    //Return specific product
    getUser(mail: string) : Promise<User|ProductError>;
    //Returns specific product and its color
    getUserOrders(id:string) : Promise<PastOrder[]|ProductError>;
    // Adds a product with the given description to the stores listings
    // and returns the created Product object
    addUser(desc:Object): Promise<User|ProductError>

    // Restocks existing product with the given amount,
    // and returns true if restock was successful
    addUserOrder(id: string, ...order: multiProduct[]): Promise<PastOrder | multiProduct[]|ProductError> 

    
    removeUser(id:string): Promise<User|ProductError> 

    

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
    /* Logs in user if there is an entry in user map that matches email and password  */
    async logInUser(mail: string, password: string): Promise<User | ProductError> {
        const user = await this.getUser(mail)
        if (user instanceof User){
            if(user.comparePassword(password)){
                return user
            }else{
                return new ProductError(404,"Email or password was not found")
            }
        }else{
            return new ProductError(404,"Email or password was not found")
        }
    }

    /* Dependency injection, to process orders and add to user */
    productService:ProductService;
    /* Map of users in the form of <email,User> */
    users: Map<string,User> = new Map<string,User>()

    
    constructor(service:ProductService){
        this.productService=service;
        const user = new User("James Brown","jb@gmail.com","jb123","0731231234",new Date(1978),[new address(addressType.DELIVERY,"Saxophonestreet 45","New York","USA","4423")])
        this.users.set(user.email,user)
    }
    
    /* Retrieves user if it is found */
    async getUser(mail: string): Promise<ProductError | User> {
        const query: User | undefined = this.users.get(mail);

        if(query != undefined){
            return query;
        }else{
            return new ProductError(404, "No user found with that email")
        }
    }

    /* Retrieves all previous orders of a specific user*/
    async getUserOrders(email: string /* mail */): Promise<ProductError | PastOrder[]> {
        const query: User | undefined = this.users.get(email);
        if(query != undefined){
            return query.orders
        }else{
            return new ProductError(404, "No user found")
        }

    }

    /* Adds user if the user email doesn't exist in Map */
    async addUser(user: User): Promise<ProductError | User> {
        const query = this.users.get(user.email)
        if(query == null){
            this.users.set(user.email,user)
            return user
        }else{
            return new ProductError(400, "User already exists")
        }
    }

    /* Processes order through product_service */
    processOrder(...order:multiProduct[]):multiProduct[]{
        return this.productService.processOrder(...order)
    }
    
    /* Processes order through product_service and then add's order to user */
    async addUserOrder(id: string, ...order: multiProduct[]): Promise< PastOrder | multiProduct[] | ProductError> {
        const query = this.users.get(id)
        if(query != null){
            
            const processed =  this.processOrder(...order);

            if(processed.length == order.length){
                const order = query.addOrder(...processed)
                return order
            }
            return processed
        }else{
            return new ProductError(400, "User doesn't exist")
        }
    }

    // Removes user if id(email) is found
    async removeUser(id: string): Promise<ProductError | User> {
        const query = this.users.get(id)
        if(query != null){
            this.users.delete(id)
            return query
        }else{
            return new ProductError(404, "User not found")
        }
    }
  
   
   
}

export function makeUserService(service:ProductService): UserService{
    return new UserService(service);
}
