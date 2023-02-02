export class Product{
    id:number;
    name:string;
    description:string;
    price:number;
    category:string;
    in_stock:boolean;
    price_factor:number; //if factor < 1 then product is on sale

    constructor(name:string,description:string,price:number,category:string,in_stock:boolean,price_factor:number){
        this.id = Date.now()
        this.name =name;
        this.description =description;
        this.price = price;
        this.category =category;
        this.in_stock = in_stock;
        this.price_factor = price_factor;

    }



}