export type multiProduct={
    id: number; //product id 
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