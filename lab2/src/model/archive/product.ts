import { GENERALCOLOR, CATEGORY, hashize } from "../../helper/utils";




/* This will probably not be implemented */
export type paymentInformation={
    card_holder:string; //Encrypt, How to hide encryption algorithm, .env var?
    card_number:string;//Encrypt
    csv_number:string; //can start with 0? //Encrypt
    expiration_date:string; //Encrypt
    isencrypted:boolean; //dont forger to check dis
}

/* Stocked size is the format of saving a size and amount of that size in stock */
export type stockedSize = {
    size:number;
    amount:number;
}

/* Product class */
export class Product{
    id:string; 
    name:string;
    brand: string;
    description:string;
    color:string;
    generalColor:GENERALCOLOR;
    price:number;
    category:CATEGORY; 
    stock:stockedSize[]; //List of sizes in stock 
    price_factor:number; //if factor < 1 then product is on sale
    images: string[];//array of urls.


    isInStock(){
        return !(this.stock.length == 0)
    }
    setStock(list:stockedSize[]){
        this.stock = list
    }

    constructor(name:string, brand:string,description:string, color:string,generalColor:GENERALCOLOR,price:number,category:CATEGORY,stock:stockedSize[],price_factor:number, url:string[]){
        this.id = hashize(brand.concat(name));//different brands may have the exact same modelname and this will make it easier to bundle products of the same brand and name
        this.name =name;
        this.brand =brand;
        this.description =description;
        this.color =color;
        this.generalColor = generalColor
        this.price = price;
        this.category =category;
        this.stock = []
        stock.forEach(e => this.stock.push(e));
        this.price_factor = price_factor;
        this.images = [];
        url.forEach(e => this.images.push(e))
    }



}



  