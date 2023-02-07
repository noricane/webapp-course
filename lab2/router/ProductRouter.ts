import { Product } from "../model/product";

export interface IProductService {
    //Returns a list of all listed products
    getProducts() : Promise<Array<ProductCollection>>;

    // Adds a product with the given description to the stores listings
    // and returns the created Product object
    addProduct(desc:Object): Promise<Product>

    // Restocks existing product with the given amount,
    // and returns true if restock was successful
    restockProduct(id:number,size:string,amount:number): Promise<boolean>

    // Removes a product with the given id from stock,
    // and returns the removed Task object
    removeProduct(id:number): Promise<Product>



}
export type ProductCollection = {
    id:number;//!Maybe hash model name instead, now the id of a color will depend on Date.now() not good
    variations: Map<string,Product>;//{"red":{red sneaker}, "green":{green sneaker},... }

}
export class ProductService implements IProductService{
    products : Array<ProductCollection> = [];

    async getProducts(): Promise<Array<ProductCollection>> {
        return this.products;
    }
    addProduct(desc: Object): Promise<Product> {
        throw new Error("Method not implemented.");
    }
    restockProduct(id: number, size: string, amount: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    removeProduct(id: number): Promise<Product> {
        throw new Error("Method not implemented.");
    }

}

export function makeProductService(): ProductService{
    return new ProductService();
}