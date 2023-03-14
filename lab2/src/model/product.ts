
import { GENERALCOLOR, CATEGORY } from './../helper/utils';
import { hashize } from "../helper/utils";

/* This will probably not be implemented */
export interface paymentInformation{
    card_holder:string; //Encrypt, How to hide encryption algorithm, .env var?
    card_number:string;//Encrypt
    csv_number:string; //can start with 0? //Encrypt
    expiration_date:string; //Encrypt
    isencrypted:boolean; //dont forger to check dis
}

/* Stocked size is the format of saving a size and amount of that size in stock */
export interface stockedSize{
    size:number;
    amount:number;
}

/* Product class */
export interface Product{
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
}

export interface ProductMethods{
    setStock(list:stockedSize[]):void
}



  