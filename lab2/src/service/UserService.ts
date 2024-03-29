import { userModel } from './../../db/user.db';
import { ProductService } from './ProductService';
import { arraysEqual, CATEGORY, GENERALCOLOR, isUser } from './../helper/utils';
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
import { newsletterModel } from '../../db/newsletter.db';
import { ProductError } from '../model/ProductError';

export interface IUserService {
    logInUser(mail: string,password:string) : Promise<User|ProductError>;
    
    
    //Return specific product
    getUser(mail: string) : Promise<User|ProductError>;
    //Returns specific product and its color
    getUserOrders(id:string) : Promise<PastOrder[]|ProductError>;
    // Adds a product with the given description to the stores listings
    // and returns the created Product object
    addUser(name: string,email: string,password:string,phonenumber: string,birthdate: Date,adresses: address[], ...orders:PastOrder[]): Promise<User|ProductError>

    // Restocks existing product with the given amount,
    // and returns true if restock was successful
    addUserOrder(id: string, ...order: multiProduct[]): Promise<PastOrder |{error:true,items: multiProduct[]}|ProductError> 

    addNewsLetterMail(email:string):Promise<true>
    
    removeUser(id:string): Promise<User|ProductError> 

    

}



export class UserService implements IUserService{

    
    /* Checks if user exists and compares password returning a ProductError if any of these checks fail */
    async logInUser(mail: string, password: string): Promise<User | ProductError> {
        const user = await userModel.findOne({email:mail})
        if (user == null){
            return new ProductError(404,"Email or password was not found")
        }else{
            if(user.comparePassword(password)){
                return user
            }else{
                return new ProductError(404,"Email or password was not found")
            }
        }
    }

    /* Dependency injection, to process orders and add to user */
    productService:ProductService;



    /* Add email to newsletter document  */
    async addNewsLetterMail(email: string): Promise<true> {
        const res =await newsletterModel.create({email:email})
        console.log("Added Email", res, "to newsletter");
        
        return true
    }
    
    constructor(service:ProductService){
        this.productService=service;
        
        /* console.log("Removing all");
        (async()=>{
        const resp = await userModel.deleteMany({});
        console.log("resp1",resp);      
        })() */
    }
    
    /* Retrieves user if it is found. Returns ProductError if user isn't found. */
    async getUser(mail: string): Promise<ProductError | User> {
        const mongoQuery = await userModel.findOne({email:mail})
        
        if(mongoQuery != null){
            return mongoQuery
        }else{
            return new ProductError(404, "No user found with that email")
        }
       
    }

    /* Retrieves all previous orders of a specific user and returns ProductError if user not found.*/
    async getUserOrders(email: string /* mail */): Promise<ProductError | PastOrder[]> {
        const query = await userModel.findOne({email:email})

        if(query != null){
            return query.getOrders()
        }else{
            return new ProductError(404, "No user found")
        }

    }

    /* Adds user if the user email doesn't exist in Map and returns it, returns a ProductError if user exists*/
    async addUser(name: string,email: string,password:string,phonenumber: string,birthdate: Date,adresses: address[], ...orders:PastOrder[]): Promise<ProductError | User> {
            return userModel.create({
                id:Date.now(),
                name:name,
                email:email,
                password:password,
                birthdate:birthdate,
                phonenumber:phonenumber,
                orders:[...orders],
                adresses:[...adresses]
            }).then((e:any) => {
                //Success return newly creted object
                return e
            }).catch((e:any) => {
                /* Duplicate key error code is 11000, don't know what other errors may arise */
                console.log(e);
                return new ProductError(400, e.code == 11000 ? 'Email already exists' : e.message)
            })
    }
    

    /* Processes order through product_service */
    async processOrder(...order:multiProduct[]):Promise<multiProduct[]>{
        return await this.productService.processOrder(...order)
    }
    
    /* Processes order through product_service, if the call was successful an object of type PastOrder is returned, 
       otherwise a {error:true, items:multiProduct[]} is returned to be handled,
       returns a ProductError if user wasn't  found*/
    async addUserOrder(id: string, ...order: multiProduct[]): Promise< PastOrder | {error:true, items:multiProduct[]} | ProductError> {
        const query = await userModel.findOne({email:id});
        if(query != null){
            const processed =  await this.processOrder(...order);
           
            //If length is unchanged the order might've been processed
            if(processed.length == order.length){
                //If the arrays are equal the order has been successfully processed
                let unchanged = arraysEqual(order,processed);
                //Unsucessfully processed
                if(!unchanged){
                    return {error:true,items:processed}
                }
                //Sccessfully processed
                const addOrder =  query.addOrder(processed)
                query.save()
                return addOrder 
            }
            return {error:true,items:processed}
        }else{
            return new ProductError(404, "User doesn't exist")
        }
    }

    // Removes user if id(email) is found, returns a ProductError if user isn't found.
    async removeUser(id: string): Promise<ProductError | User> {
        const query = await userModel.findOne({email:id})
        if(query != null){
            query.deleteOne()  
            return query
        }else{
            return new ProductError(404, "User not found")
        }
    }
  
   
   
}

export function makeUserService(service:ProductService): UserService{
    return new UserService(service);
}
