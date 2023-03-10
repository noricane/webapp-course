import { productMapModel } from './../../db/productmap.db';
import { CATEGORY, checkLatinCharacters, hashize, normalizeString } from './../helper/utils';
import { GENERALCOLOR } from '../helper/utils';
import { stockedSize } from '../model/product';
import { Product } from "../model/product";

import { User } from '../model/user';
import { productConstructor } from '../helper/utils';
import { initShoes } from './dummyproducts';
import { multiProduct } from '../model/pastorder';
import { productModel } from '../../db/product.db';


export interface IProductService {
    //Returns a list of all listed products
    getProducts() : Promise<Map<string,Map<string,Product>>|ProductError>;
    
    //Returns a list of updated products
    updateClientList(list:multiProduct[]) : Promise<multiProduct[]|ProductError>;

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

    async processOrder(...order:multiProduct[]):Promise<multiProduct[]>{
        
      
        return await (async()=>{
            let processable = true;
            const result:multiProduct[] = []
            const pending:multiProduct[] = []
            for (const e of order) {
                try {
                  const query = await this.getProductColor(e.item.id,normalizeString(e.item.color));
            
                  if(!(query instanceof ProductError) && query.stock.find(elem => elem.size == e.size) != null){
                    const find = query.stock.find(elem => elem.size == e.size)
            
                    if(find == null){return []}

                    const queryDb = await productModel.findOne({id:query.id})
                    if(queryDb == null){return []}

                    if(find.amount >= e.amount){
                      const index = query.stock.indexOf(find);
                      const list = query.stock
                      const stock = {size:e.size,amount:find.amount-e.amount}
                      console.log("indexof", index);
                      queryDb.setStock([...list.slice(0,index),stock,...list.slice(index+1,)])
                      result.push(e)
                    } else {
                      processable = false;
                      pending.push({size:e.size,item:query ,amount:find.amount});

                    }
                  } 
                } catch (error) {
                  // handle any errors thrown by inner functions
                }
              }
              return [result,pending,processable]
        })().then((props:any) =>{
            console.log("HERE");
            const [r,p,b] = props;
            console.log(r);
            console.log(p);
            
            if(!b){
                console.log("Not processable");
                return p;
              }
             console.log("processable");
             
              
              return r;}
        )
        
          
      }
    
    /* The collection of products is represented as a Map with the id of the product that leads to a map with all the product's color variations */
    //products : Map<string,Map<string,Product>> = new Map();
    //products : Map<string,Map<string,Product>> = initShoes();
    /* List of recorded brands */
    brands: string[] = ["Nike","Louis Vuitton","Adidas","Yeezy", "Maison Margiela","Off-White x Nike"]
    constructor(){
        //console.log("Initialized shoe collection",this.products);
    }
    async updateClientList(clientList: multiProduct[]): Promise<multiProduct[]> {
        console.log("hello");
        const products = await this.getProducts();
        if(products instanceof ProductError){
            console.log("ERROR: status",products.code,"message",products.message);

            return []
        }
        const list: multiProduct[]=[];
        clientList.forEach(e => {
            const query = products.get(e.item.id)?.get(normalizeString(e.item.color))
            if(query==null){return}
            const findsize = query.stock.filter(elem => elem.size == e.size )[0]
            if(findsize == null){return;} //probably because server initializes random sizes every time
            let size = findsize.amount < e.amount? findsize.amount : e.amount 
            list.push({item:query, size:e.size, amount:size})
        })

        console.log("Sending products",products);
        return list; 

    }

    /* Returns list of products within the given category */
    async getCategoryProducts(category: CATEGORY): Promise<ProductError | Product[]> {
        const products = await productMapModel.find({}) 
        const productList:Product[] = []
        products.forEach(
            doc=> Array.from((doc.get('product') as Map<string,Product>).values()).forEach(
            (product => {
                console.log("Equal",product.category == category);
                
                if(product.category == category){ productList.push(product) }}//While no enum this is fine
            )))
        return productList
    }

    /* Returns list of products that are of the color x with type GENERALCOLOR */
    async getColorProducts(color: number): Promise<ProductError | Product[]> {
        const products = await productMapModel.find({})
        const productList:Product[] = []
        products.forEach(
            doc=> Array.from((doc.get('product') as Map<string,Product>).values()).forEach(
                (product:Product) => {               
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
    async getProducts(): Promise<Map<string, Map<string, Product>> | ProductError> {
        const productDoc = await productMapModel.find({});
        if (productDoc != null) {
          const productsMap = new Map<string, Map<string, Product>>();
          for (const [id, productMap] of Object.entries(productDoc)) {
            const products = new Map<string, Product>();
            for (const [productId , product] of Object.entries(productMap)) {
              products.set(productId, product as Product);
            }
            productsMap.set(id, products);
          }
          return productsMap;
        } else {
          return new ProductError(404, "There are no products added yet");
        }
      }

    /* Returns map of specific product which contains all the color variants of that product */
    async getProduct(id: string): Promise<ProductError | Map<string, Product>> {
        const query = await productMapModel.findOne({id:id})
        if(query!=null){
            return query.get('product');           
        }
        return new ProductError(404,"Product not found")
    }

    /* Returns the specific product with the requested color */
    async getProductColor(id: string, color: string): Promise<ProductError |  Product> {
        const query = await productMapModel.findOne({id:id})
        if(query!=null){
            const color_query = query.get(color)
            if(color_query!=null){
                color_query
                return color_query;
            }else{
                return new ProductError(404,"Product was found but color was not found, consider adding color to this product first")
            }
        }
        return new ProductError(404,"Product not found")
    }


    /* Adds product if it doesn't exist */
    async addProduct(desc: productConstructor): Promise<Product|ProductError> {   
        const {color} = desc;

        const id = hashize(normalizeString(desc.brand.concat(desc.name)))
        const findEntry = await productMapModel.findOne({id:id})

        const newProd = await productModel.create({id:id,name:desc.name, brand:desc.brand, description:desc.description, color:desc.color,generalColor:desc.generalColor, price:desc.price, category:desc.category, stock:desc.stock, price_factor:desc.price_factor, images:desc.images})

       // const findEntry = this.products.get(item.id);
        if(findEntry != null){
            if(findEntry.get(color)!=null){
                //color exists
                return new ProductError(409,"Product already exists, did you mean to restock?")
            }else{
                findEntry.set(normalizeString(color),newProd)
                findEntry.save()
            }
        }else{//Product doesn't exist

            productMapModel.create({id:id,product:newProd})


        }
        //If brand doesn't exist add it.
        if(this.brands.filter(e => checkLatinCharacters(e) == checkLatinCharacters(desc.brand)).length == 0){
            this.brands.push(desc.brand)
        }
        return newProd;
    }

    /* Edits product if it exists */
    async editProduct(desc: productConstructor): Promise<Product | ProductError> {
        const color  = normalizeString(desc.color)
        const id = hashize(normalizeString(desc.brand.concat(desc.name)))
        const newProd = await productModel.create({ id: id, name: desc.name, brand: desc.brand, description: desc.description, color: desc.color, generalColor: desc.generalColor, price: desc.price, category: desc.category, stock: desc.stock, price_factor: desc.price_factor, images: desc.images })
        const findEntry = await productMapModel.findOneAndUpdate({ id: id }, { $set: { [`product.${color}`]: newProd } }, { new: true })
      
        if (findEntry != null) {
          const updatedProd = findEntry.get(`product.${color}`) as Product
      
          if (updatedProd != null) {
            return updatedProd
          } else {
            return new ProductError(409, "Product colorway not found, did you mean to add?")
          }
        } else {
          // Product doesn't exist
          return new ProductError(409, "Product not found, did you mean to add?")
        }
      }



    /* Removes product's Map if found */
    async removeProduct(id: string):  Promise<Map<string,Product>|ProductError>  {
        const query = await productMapModel.findOne({id:id})


        if(query != null){
            const productData = query.get('product');
            await query.deleteOne();
            return productData;
        }
        return new ProductError(404,"Product was not found")
    }

    /* Removes a product's specific color variant if it's found */
    async removeProductColor(id: string, color: string): Promise<Product | ProductError> {
        const query = await productMapModel.findOne({ id: id })
      
        if (query != null) {
          const productData = query.get('product')
          const color_query = productData.get(color)
      
          if (color_query != null) {
            productData.delete(color)
            await query.save() // save the updated document
            return color_query
          } else {
            return new ProductError(404, "Product was found but color was not found, consider adding color to this product first")
          }
        }
      
        return new ProductError(404, "Product was not found")
      }
      
}

export function makeProductService(): ProductService{
    return new ProductService();
}