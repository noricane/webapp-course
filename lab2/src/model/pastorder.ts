import { Product } from "./product";


/* Multiproduct specifies product, shoe size and amount of shoes with the first two properties */
export type multiProduct={
    item: Product; 
    size:number;
    amount: number;
}


/* PastOrder is a simple class that has an id and a list of multiproducts */
export class PastOrder{
    id:number;
    items: multiProduct[];

    constructor(id:number,items:multiProduct[]){
        this.id = id;
        this.items = items;
    }
}