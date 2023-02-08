import { Product } from "../model/product";

export interface IProductService {
    //Returns a list of all listed products
    getProducts() : Promise<Map<string,Map<string,Product>>>;

    // Adds a product with the given description to the stores listings
    // and returns the created Product object
    addProduct(desc:Object): Promise<Product|{}>

    // Restocks existing product with the given amount,
    // and returns true if restock was successful
    restockProduct(id: number, color:"string", instructions : {size:number ,amount:number}): Promise<boolean>

    // Removes a product with the given id from stock,
    // and returns the removed Task object
    removeProduct(id:number): Promise<Product>



}
type productConstructor= {
    name:string;
    brand: string;
    description:string;
    color:string;
    price:number;
    category:string;
    in_stock:boolean;
    price_factor:number;
    url: string[];
}
export class ProductService implements IProductService{
    //productid:{"red":{red sneaker}, "green":{green sneaker},... }
    products : Map<string,Map<string,Product>> = new Map();

    async getProducts(): Promise<Map<string,Map<string,Product>>> {
        return this.products; //Send an array of Map<string,product> instead?
    }
    async addProduct(desc: productConstructor): Promise<Product|{}> {   
        const {color} = desc;
        const item = new Product(desc.name, desc.brand, desc.description, desc.color, desc.price, desc.category, desc.in_stock, desc.price_factor, ...desc.url);

        const findEntry = this.products.get(item.id);
        if(findEntry != null){
            if(findEntry.get(color)!=null){
                //color exists
                return {error:"Product already exists, did you mean to restock?"}
            }else{
                findEntry.set(color,item)
                return item
            }
        }else{//Product doesn't exist
            this.products.set(item.id,new Map<string,Product>([[color,item]]))
            return item;
        }
        
        
    }
    async restockProduct(id: number, color:"string", instructions : {size:number ,amount:number}  ): Promise<boolean> {
        return false
    }
    removeProduct(id: number): Promise<Product> {
        throw new Error("Method not implemented.");
    }

}

export function makeProductService(): ProductService{
    return new ProductService();
}