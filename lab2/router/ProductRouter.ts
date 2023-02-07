import { Product } from "../model/product";

export interface IProductService {
    //Returns a list of all listed products
    getProducts() : Promise<Array<Product>>;

    // Adds a product with the given description to the stores listings
    // and returns the created Product object
    addProduct(desc:Object): Promise<Product>

    // Restocks existing product with the given amount,
    // and returns true if restock was successful
    restockProduct(id:number,amount:number): Promise<boolean>

    // Removes a product with the given id from stock,
    // and returns the removed Task object
    removeProduct(id:number): Promise<Product>



}
export class ProductService implements IProductService{

}

export function makeProductService(): ProductService{
    return new ProductService();
}