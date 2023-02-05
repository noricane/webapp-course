export type multiProduct{
    id: number; //product id
    amount: number;
}


export class pastorder{
    id:number;
    items: multiProduct[];
}