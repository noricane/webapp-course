import { stockedSize } from './../model/product';
import { Product } from "../model/product";

import { User } from '../model/user';
import { productConstructor } from '../../helper/utils';

export interface IProductService {
    //Returns a list of all listed products
    getProducts() : Promise<Map<string,Map<string,Product>>|ProductError>;
    
    //Return specific product
    getProduct(id:string) : Promise<Map<string,Product>|ProductError>;
    //Returns specific product and its color
    getProductColor(id:string,color:string) : Promise<Product|ProductError>;
    // Adds a product with the given description to the stores listings
    // and returns the created Product object
    addProduct(desc:Object): Promise<Product|ProductError>

    // Restocks existing product with the given amount,
    // and returns true if restock was successful
    restockProduct(id: string, color:string, instructions : {size:number ,amount:number}): Promise<boolean|ProductError> 

    // Removes a product with the given id from stock,
    // and returns the removed Map<string(id),Product> object
    removeProduct(id:string): Promise<Map<string,Product>|ProductError> 

    // Removes a color within the given product from id from stock,
    // and returns the removed product object
    removeProductColor(id: string, color:string): Promise<Product|ProductError> 

    addUser(): Promise<User|ProductError> //Change name of ProductError type?
    removeUser(id:number): Promise<User|ProductError> 

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
/* @ts-ignore */
export class ProductService implements IProductService{
   
    //productid:{"red":{red sneaker}, "green":{green sneaker},... }
    products : Map<string,Map<string,Product>> = new Map();

    async getProducts(): Promise<Map<string,Map<string,Product>>|ProductError> {
        if(this.products.keys.length > 0){
            return this.products; //Send an array of Map<string,product> instead?
        }else{
            return new ProductError(204,"There are no products added yet") 
        }
            
    }
    async getProduct(id: string): Promise<ProductError | Map<string, Product>> {
        const query = this.products.get(id);
        if(query!=null){
            return query
        }
        return new ProductError(404,"Product not found")
    }
    async getProductColor(id: string, color: string): Promise<ProductError |  Product> {
        const query = this.products.get(id);
        if(query!=null){
            const color_query  = query.get(color)
            if(color_query!=null){
                return color_query
            }else{
                return new ProductError(404,"Product found but color was not found")

            }
        }

        return new ProductError(404,"Product not found")

    }



    async addProduct(desc: productConstructor): Promise<Product|ProductError> {   
        const {color} = desc;
        const item = new Product(desc.name, desc.brand, desc.description, desc.color, desc.price, desc.category, desc.stock, desc.price_factor, desc.url);

        const findEntry = this.products.get(item.id);
        if(findEntry != null){
            if(findEntry.get(color)!=null){
                //color exists
                return new ProductError(409,"Product already exists, did you mean to restock?")
            }else{
                findEntry.set(color,item)
                return item
            }
        }else{//Product doesn't exist
            this.products.set(item.id,new Map<string,Product>([[color,item]]))
            return item;
        }
        
        
    }
    async restockProduct(id: string, color:string, new_stock : stockedSize  ): Promise<true|ProductError> {
        const {size, amount} = new_stock
        const query = this.products.get(id);
         
        if(query!=null){
            const color_query = query.get(color)
            if(color_query!=null){
                const index = color_query.stock.findIndex(e => e.size == size)
                index < 0  ? 
                    //Increase amount stock
                    color_query.stock[index].amount = color_query.stock[index].amount + amount : 
                    //Size not previously stocked, add it
                    color_query.stock.push(new_stock);
                //Sort for zestiness
                color_query.stock.sort();
                return true
                
            }else{
                return new ProductError(404,"Product was found but color was not found, consider adding color to this product first")
            }
        }
        
        return new ProductError(404,"Product was not found")
    }
    async removeProduct(id: string):  Promise<Map<string,Product>|ProductError>  {
        const query = this.products.get(id);
        if(query != null){
         this.products.delete(id)
         return query   
        }
        return new ProductError(404,"Product was not found")
    }
    async removeProductColor(id: string, color:string): Promise<Product|ProductError> {
        const query = this.products.get(id);
        if(query!=null){
            const color_query = query.get(color)
            if(color_query!=null){

                query.delete(color)
                return color_query;
            }else{
                return new ProductError(404,"Product was found but color was not found, consider adding color to this product first")

            }
        }
        return new ProductError(404,"Product was not found")
    }
    
}

export function makeProductService(): ProductService{
    return new ProductService();
}