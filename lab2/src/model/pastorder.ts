import { Product } from "./product";

export type multiProduct={
    item: Product; //product id 
    size:number;
    amount: number;
}


export class PastOrder{
    id:number;
    items: multiProduct[];

    constructor(id:number,items:multiProduct[]){
        this.id = id;
        this.items = items;
    }
}