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

export interface IUserService {
    logInUser(mail: string,password:string) : Promise<User|ProductError>;
    
    
    //Return specific product
    getUser(mail: string) : Promise<User|ProductError>;
    //Returns specific product and its color
    getUserOrders(id:string) : Promise<PastOrder[]|ProductError>;
    // Adds a product with the given description to the stores listings
    // and returns the created Product object
    addUser(id:number,name: string,email: string,password:string,phonenumber: string,birthdate: Date,adresses: address[], ...orders:PastOrder[]): Promise<User|ProductError>

    // Restocks existing product with the given amount,
    // and returns true if restock was successful
    addUserOrder(id: string, ...order: multiProduct[]): Promise<PastOrder |{error:true,items: multiProduct[]}|ProductError> 

    addNewsLetterMail(email:string):true
    
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
        //const user = await this.getUser(mail)
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
    /* Map of users in the form of <email,User> */



    addNewsLetterMail(email: string): true {
        newsletterModel.create({email:email})
        return true
    }
    
    constructor(service:ProductService){
        this.productService=service;

        (async() => {
            const user =  await userModel.create({id:Date.now(),name:"James Brown",email:"jb@gmail.com",password:"jb123",phonenumber:"0731231234",birthdate:new Date(1978),orders:[],adresses:[{id:Date.now(),addressType:addressType.DELIVERY,street:"Saxophonestreet 45",city:"New York",country:"USA",zip:"4423"}]})
            console.log("creating user",user);
        })()
        

    }
    
    /* Retrieves user if it is found */
    async getUser(mail: string): Promise<ProductError | User> {
        const mongoQuery = await userModel.findOne({email:mail})
        
        if(mongoQuery != null){
            return mongoQuery
        }else{
            return new ProductError(404, "No user found with that email")
        }
       
    }

    /* Retrieves all previous orders of a specific user*/
    async getUserOrders(email: string /* mail */): Promise<ProductError | PastOrder[]> {
        const query = await userModel.findOne({email:email})

        if(query != null){
            return query.getOrders()
        }else{
            return new ProductError(404, "No user found")
        }

    }

    /* Adds user if the user email doesn't exist in Map */

    async addUser(id:number,name: string,email: string,password:string,phonenumber: string,birthdate: Date,adresses: address[], ...orders:PastOrder[]): Promise<ProductError | User> {
        
            return userModel.create({
                id:id,
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
                return new ProductError(500, e.code == 11000 ? 'Email already exists' : e.message)
            })

            
            
    }
    

    /* Processes order through product_service */
    async processOrder(...order:multiProduct[]):Promise<multiProduct[]>{
        return await this.productService.processOrder(...order)
    }
    
    /* Processes order through product_service and then add's order to user */
    async addUserOrder(id: string, ...order: multiProduct[]): Promise< PastOrder | {error:true, items:multiProduct[]} | ProductError> {
        const query = await userModel.findOne({email:id});
        if(query != null){
            
            const processed =  await this.processOrder(...order);
            console.log(order);
            console.log("lenproc",processed);
            
            if(processed.length == order.length){
                let unchanged = arraysEqual(order,processed);
                if(!unchanged){
                    return {error:true,items:processed}
                }
                
                const addOrder =  query.addOrder(processed)
                return addOrder 
            }
            return {error:true,items:processed}
        }else{
            return new ProductError(400, "User doesn't exist")
        }
    }

    // Removes user if id(email) is found
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
