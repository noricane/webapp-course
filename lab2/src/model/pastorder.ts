import { Product } from "./product";


/* Multiproduct specifies product, shoe size and amount of shoes with the first two properties */
export interface multiProduct{
    item: Product; 
    size:number;
    amount: number;
}


/* PastOrder is a simple class that has an id and a list of multiproducts */
export interface PastOrder{
    id:number;
    items: multiProduct[];
}