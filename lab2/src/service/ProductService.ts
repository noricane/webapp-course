import { CATEGORY, checkLatinCharacters, normalizeString } from './../helper/utils';
import { GENERALCOLOR } from '../helper/utils';
import { stockedSize } from '../model/product';
import { Product } from "../model/product";

import { User } from '../model/user';
import { productConstructor } from '../helper/utils';
import { initShoes } from './dummyproducts';
import { multiProduct } from '../model/pastorder';
import { LongWithoutOverridesClass } from 'bson';

export interface IProductService {
    //Returns a list of all listed products
    getProducts() : Promise<Map<string,Map<string,Product>>|ProductError>;

    //Returns list of brands
    getBrands(): Promise<string[]>;
    
    //Return specific product
    getProduct(id:string) : Promise<Map<string,Product>|ProductError>;
    //Returns specific product and its color
    getProductColor(id:string,color:string) : Promise<Product|ProductError>;

    //Returns lists of products in category
    getCategoryProducts(category:CATEGORY): Promise<Product[]|ProductError>//FChange to enum probably
    //Returns lists of products with color
    getColorProducts(color:GENERALCOLOR): Promise<Product[]|ProductError>


    // Adds a product with the given description to the stores listings
    // and returns the created Product object
    addProduct(desc:Object): Promise<Product|ProductError>//Technically equivalent to an addProductColor method

    // Restocks existing product with the given amount,
    // and returns true if restock was successful
    editProduct(desc:Object): Promise<Product|ProductError> 

    // Removes a product with the given id from stock,
    // and returns the removed Map<string(id),Product> object
    removeProduct(id:string): Promise<Map<string,Product>|ProductError> 

    // Removes a color within the given product from id from stock,
    // and returns the removed product object
    removeProductColor(id: string, color:string): Promise<Product|ProductError> 

 /*    addUser(): Promise<User|ProductError> //Change name of ProductError type?
    removeUser(id:number): Promise<User|ProductError> 

    addAdmin(): Promise<User|ProductError> //Change name of ProductError type?
    removeAdmin(id:number): Promise<User|ProductError>  */
}

export class ProductError{
    code:number;
    message:string;

    constructor(code:number, message:string){
        this.code = code;
        this.message = message;
    }
}

export class ProductService implements IProductService{
     processOrder(...order:multiProduct[]):multiProduct[]{
        const result:multiProduct[] = []
        let processable = true;
        order.forEach(async e => {
            /* First check if we can process this order and then process it. If order is invalid 
            e.g you want to buy 44/44 shoes while someone has just bought one. Return an error instead of buying 43 */
            const query = await this.getProductColor(e.item.id,normalizeString(e.item.color));
            /* Check that query is valid */
            if(query instanceof Product && query.stock.find(elem => elem.size == e.size) != null){
                const find = query.stock.find(elem => elem.size == e.size)

                if(find == null){return}

                if(find.amount < e.amount){
                    processable = false;
                }
            }
        })

        if(!processable){            
            return []
        }
        order.forEach(async e => {
            /* First check if we can process this order and then process it. If order is invalid 
            e.g you want to buy 44/44 shoes while someone has just bought one. Return an error instead of buying 43 */
            const query = await this.getProductColor(e.item.id,normalizeString(e.item.color));

            
            if(query instanceof Product && query.stock.find(elem => elem.size == e.size) != null){
                const find = query.stock.find(elem => elem.size == e.size)

                if(find == null){return}
                console.log("not null");
                
                if(find.amount >= e.amount){
                    const index = query.stock.indexOf(find);
                    const list = query.stock
                    const stock = {size:e.size,amount:find.amount-e.amount}
                    console.log("indexof", index);
                    query.setStock([...list.slice(0,index),stock,...list.slice(index+1,)])
                    result.push(e)
                }
            }
        })
        console.log("resraiosdaoisdj",result);
        
        return result;
    }
    
    /* The collection of products is represented as a Map with the id of the product that leads to a map with all the product's color variations */
    //products : Map<string,Map<string,Product>> = new Map();
    products : Map<string,Map<string,Product>> = initShoes();
    /* List of recorded brands */
    brands: string[] = ["Nike","Louis Vuitton","Adidas","Yeezy", "Maison Margiela","Off-White x Nike"]
    constructor(){
        console.log("Initialized shoe collection",this.products);
    }

    /* Returns list of products within the given category */
    async getCategoryProducts(category: CATEGORY): Promise<ProductError | Product[]> {
        const productList:Product[] = []
        Array.from(this.products.values()).forEach(
            innermap=> Array.from(innermap.values()).forEach
            (product => {
                console.log("Equal",product.category == category);
                
                if(product.category == category){ productList.push(product) }}//While no enum this is fine
            ))
        return productList
    }

    /* Returns list of products that are of the color x with type GENERALCOLOR */
    async getColorProducts(color: number): Promise<ProductError | Product[]> {
        const productList:Product[] = []
        Array.from(this.products.values()).forEach(
            innermap=> Array.from(innermap.values()).forEach
            (product => {               
                if(product.generalColor == color){                     
                    productList.push(product) 
                }}
            ))
        return productList
    }
    
    /* Returns list of recorded brands */
    async getBrands(): Promise<string[]>{
        return this.brands
    }

    /* Returns collection of all products */
    async getProducts(): Promise<Map<string,Map<string,Product>>|ProductError> {
        if(this.products.size > 0){
            console.log("Sending products",this.products);
            return this.products; //Send an array of Map<string,product> instead?
        }else{
            return new ProductError(404,"There are no products added yet") 
        }
            
    }

    /* Returns map of specific product which contains all the color variants of that product */
    async getProduct(id: string): Promise<ProductError | Map<string, Product>> {
        const query = this.products.get(id);
        if(query!=null){
            return query
        }
        return new ProductError(404,"Product not found")
    }

    /* Returns the specific product with the requested color */
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


    /* Adds product if it doesn't exist */
    async addProduct(desc: productConstructor): Promise<Product|ProductError> {   
        const {color} = desc;
        const item = new Product(desc.name, desc.brand, desc.description, desc.color,desc.generalColor, desc.price, desc.category, desc.stock, desc.price_factor, desc.images);

        const findEntry = this.products.get(item.id);
        if(findEntry != null){
            if(findEntry.get(color)!=null){
                //color exists
                return new ProductError(409,"Product already exists, did you mean to restock?")
            }else{
                findEntry.set(color,item)
            }
        }else{//Product doesn't exist
            this.products.set(item.id,new Map<string,Product>([[color,item]]))
        }
        //If brand doesn't exist add it.
        if(this.brands.filter(e => checkLatinCharacters(e) == checkLatinCharacters(desc.brand)).length == 0){
            this.brands.push(desc.brand)
        }
        return item;
    }

    /* Edits product if it exists */
    async editProduct(desc: productConstructor): Promise<Product|ProductError> {   
        const {color} = desc;
        const item = new Product(desc.name, desc.brand, desc.description, desc.color,desc.generalColor, desc.price, desc.category, desc.stock, desc.price_factor, desc.images);
        const findEntry = this.products.get(item.id);
        if(findEntry != null){
            if(findEntry.get(normalizeString(color))!=null){
                //color exists, update it
                findEntry.set(normalizeString(color),item)
            }else{
                return new ProductError(409,"Product colorway not found, did you mean to add?")
            }
        }else{
            //Product doesn't exist
            return new ProductError(409,"Product not found, did you mean to add?")
        } 
        return item;        
    }

    //Probably will be discarded in favor of editProduct
    /* async restockProduct(id: string, color:string, new_stock : stockedSize  ): Promise<true|ProductError> {
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
    } */

    /* Removes product's Map if found */
    async removeProduct(id: string):  Promise<Map<string,Product>|ProductError>  {
        const query = this.products.get(id);
        if(query != null){
         this.products.delete(id)
         return query   
        }
        return new ProductError(404,"Product was not found")
    }

    /* Removes a product's specific color variant if it's found */
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