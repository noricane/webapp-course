import { hashize } from "../../helper/utils";

export type paymentInformation={
    card_holder:string; //Encrypt, How to hide encryption algorithm, .env var?
    card_number:string;//Encrypt
    csv_number:string; //can start with 0? //Encrypt
    expiration_date:string; //Encrypt
    isencrypted:boolean; //dont forger to check dis
}

export type stockedSize = {
    size:number;
    amount:number;
}
export class Product{
    id:string; // different id for different sizes? multiProduct is a failed type without this.
    name:string;
    brand: string;
    description:string;
    color:string;
    price:number;
    category:string;//Remove? sneakers only I'm thnking
    stock:stockedSize[]; 
    price_factor:number; //if factor < 1 then product is on sale
    images: string[];//array of urls.

    isInStock(){
        return !(this.stock.length == 0)
    }

    constructor(name:string, brand:string,description:string, color:string,price:number,category:string,stock:stockedSize[],price_factor:number, url:string[]){
        this.id = hashize(brand.concat(name));//different brands may have the exact same modelname
        this.name =name;
        this.brand =brand;
        this.description =description;
        this.color =color;
        this.price = price;
        this.category =category;
        this.stock = []
        stock.forEach(e => this.stock.push(e));
        this.price_factor = price_factor;
        this.images = [];
        url.forEach(e => this.images.push(e))
    }



}



  