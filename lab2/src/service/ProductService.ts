import { productMapModel } from './../../db/productmap.db';
import { CATEGORY, CategoryToArray, checkLatinCharacters, GeneralColorToArray, hashize, normalizeString } from './../helper/utils';
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
          console.log("lets start");
          
            let processable = true;
            const pending:multiProduct[] = []
            for (const e of order) {
                try {
                  const query = await this.getProductColor(e.item.id,normalizeString(e.item.color));
                  console.log("query L:82",query);
                  
                  if(!(query instanceof ProductError) && query.stock.find(elem => elem.size == e.size) != null){
                    const find = query.stock.find(elem => elem.size == e.size)
            
                    if(find == null){return []}

                    const mapquery = await productMapModel.findOne({id:query.id})
                    if(mapquery == null){return []}
                    console.log("aquery get",query);
                    
                    console.log("query get",mapquery);
                    const queryDb = mapquery.get('product').get(normalizeString(query.color))
                    if(!(find.amount >= e.amount)){
                      console.log("not processable assjakdaksdhasdkjhaskdjh l110");
                      
                      processable = false;
                      pending.push({size:e.size,item:query ,amount:find.amount});
                      
                    } 
                  } 
                } catch (error) {
                  // handle any errors thrown by inner functions
                }
              }
              return [order,pending,processable]
        })().then(async (props:any) =>{
            const [o,p,b]:[multiProduct[],multiProduct[],boolean] = props;
            if(!b){
              console.log("before",p);
                o.forEach((element:multiProduct) => {
                  if(!p.find(e => e.item.id == element.item.id && e.size == element.size)){
                    p.push(element)
                  }
                });
                console.log("Not processable");
                console.log("after",p);
                
                return p;
            }
            const result:multiProduct[] = []
            for (const e of o) {
              try {
                const query = await this.getProductColor(e.item.id,normalizeString(e.item.color));
                console.log("query L:82",query);
                
                if(!(query instanceof ProductError) && query.stock.find(elem => elem.size == e.size) != null){
                  const find = query.stock.find(elem => elem.size == e.size)
          
                  if(find == null){return []}

                  const mapquery = await productMapModel.findOne({id:query.id})
                  if(mapquery == null){return []}
                  console.log("aquery get",query);
                  
                  console.log("query get",mapquery);
                  const queryDb = mapquery.get('product').get(normalizeString(query.color))
                  if(find.amount >= e.amount){
                    console.log("here");
                      
                    const index = query.stock.indexOf(find);
                    const list = query.stock
                    const stock = {size:e.size,amount:find.amount-e.amount}
                    console.log("indexof", index);
                    console.log("newlist",[...list.slice(0,index),stock,...list.slice(index+1,)]);
                    
                    queryDb.setStock([...list.slice(0,index),stock,...list.slice(index+1,)])
                    mapquery.set(normalizeString(query.color),queryDb)
                    mapquery.save()
                    console.log("new obj",);
                    result.push(e)
                    
                  } 
                } 
              } catch (error) {
                // handle any errors thrown by inner functions
              }
            }

             
              
              return result;}
        )
        
          
      }
    
    /* The collection of products is represented as a Map with the id of the product that leads to a map with all the product's color variations */
    //products : Map<string,Map<string,Product>> = new Map();
    //products : Map<string,Map<string,Product>> = initShoes();
    /* List of recorded brands */
    brands: string[] = ["Nike","Louis Vuitton","Adidas","Yeezy", "Maison Margiela","Off-White x Nike"]
    
    constructor(){
      console.log("creating");
      /* console.log("Removing all");
       (async()=>{
        const resp = await productModel.deleteMany({});
      const resp2 = await productMapModel.deleteMany({});
      
      console.log("resp1",resp);
      console.log("resp2",resp2);
      
      })() */
      
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

        /*Productdoc is a list of these innermaps  
          innermap {
          _id: new ObjectId("6410fe9843a6cafc65d2b078"),
           id: 'bf2dcb62f86df8f457779333a1a87c067f9268a6b26d5d424ff66a03eda5cfff',
          product: Map(1) { 'green' => [Object] },
           __v: 0
          }, */
        if (productDoc != null) {
          const productsMap = new Map<string, Map<string, Product>>();
          for (const [id, innerMap] of Object.entries(productDoc)) {
            const id =innerMap.get('id')
            const productVars =  innerMap.get('product')
            productVars.forEach((element:any) => {
              console.log("hello element",element);
              const query = productsMap.get(element.id)
              if(query != null){
                query.set(normalizeString(element.color),element)
              }else{
                productsMap.set(element.id,new Map<string,Product>([[normalizeString(element.color),element]]))
              }
              
            });
            const q =productsMap.get(id)
            console.log("id",id,"product",productVars,"bigmap",productsMap,"qmap",q);
            if(q != null) {
              //console.log("color",product.c);
              
              //q.set(product.color,product)
            }else{

             // productsMap.set(product.id,product);
            }
            
          }
          return productsMap;
        } else {
          return new ProductError(404, "There are no products added yet");
        }
      }

    /* Returns map of specific product which contains all the color variants of that product */
    async getProduct(id: string): Promise<ProductError | Map<string, Product>> {
      console.log("getProduct line 208, prod service");
      const query = await productMapModel.findOne({id:id})
      
      if(query!=null){

        return query.get('product');           
      }
      return new ProductError(404,"Product not found")
    }
    
    /* Returns the specific product with the requested color */
    async getProductColor(id: string, color: string): Promise<ProductError |  Product> {
      console.log("getProductcolor line 220, prod service");
        const query = await productMapModel.findOne({id:id})
        if(query!=null){



          
            const color_query = query.get('product').get(normalizeString(color))
            
            if(color_query!=null){
              console.log("not lol");
              
                color_query
                return color_query;
            }else{
                console.log("lol");

              
                return new ProductError(404,"Product was found but color was not found, consider adding color to this product first")
            }
        }
        return new ProductError(404,"Product not found")
    }


    /* Adds product if it doesn't exist */
    async addProduct(desc: productConstructor): Promise<Product|ProductError> {   
        const {color} = desc;
        console.log("generalcolor",desc.generalColor);
        let gc = GeneralColorToArray().indexOf(desc.generalColor);

        
        console.log(desc.category);
        console.log();
        
        const id = hashize(normalizeString(desc.brand.concat(desc.name)))
        const query = await productMapModel.findOne({id:id})

        const newProd = await productModel.create({id:id,name:desc.name, brand:desc.brand, description:desc.description, color:desc.color,generalColor:desc.generalColor, price:desc.price, category:desc.category, stock:desc.stock, price_factor:desc.price_factor, images:desc.images})
        console.log("newprod is",newProd);
        
       // const findEntry = this.products.get(item.id);
        if(query != null){
            const getproduct = query.get('product')
            if(getproduct.get(color)!=null){
                //color exists
                return new ProductError(409,"Product already exists, did you mean to restock?")
            }else{
              console.log("should be here");
              console.log(desc);
              
                getproduct.set(normalizeString(color),newProd)
                query.save()

                
            }
        }else{//Product doesn't exist
            console.log("here");
            
            productMapModel.create({id:id,product:new Map<string,Product>([[normalizeString(color),newProd]])})


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
    async removeProductColor(id: string, c: string): Promise<Product | ProductError> {
        const query = await productMapModel.findOne({ id: id })
        const color = normalizeString(c)
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
  return new ProductService()
}