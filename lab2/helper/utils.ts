import { stockedSize } from "../src/model/product";

const crypto = require('crypto');

export function normalizeString(str: string){
    return str.replace(/\s/g, '').toLowerCase();
}

export function hashize(str:string) {
    return crypto.createHmac('sha256', normalizeString(str)).digest('hex');
}
export enum UserType {
    ADMIN,
    CUSTOMER
}

/*ANY CHANGES IN CONSTRUCTOR MUST REFLECT IN FUNCTION BELOW "isProduct" */
export type productConstructor= {
    name:string;
    brand: string;
    description:string;
    color:string;
    price:number;
    category:string;
    stock:stockedSize[];
    price_factor:number;
    url: string[];
}
/* Check that object is of type productConstructtor couldn't think of better way */

export function isProduct(arg: any){
    let nameCheck:boolean    = arg?.name != null && typeof(arg.name)== "string"
    let brandCheck:boolean   = arg?.brand != null && typeof(arg.brand)== "string"
    let descCheck:boolean    = arg?.description != null && typeof(arg.description)== "string"
    let colorCheck:boolean   = arg?.color != null && typeof(arg.color)== "string"
    let categoryCheck:boolean= arg?.category != null && typeof(arg.category)== "string"
    let priceCheck:boolean   = arg?.price != null && typeof(arg.price)== "number"
    let pfactorCheck:boolean = arg?.price_factor != null && typeof(arg.price_factor)== "number"
    let stockCheck:boolean = arg?.stock != null && Array.isArray(arg.stock)
    let urlCheck:boolean = arg?.url != null &&  Array.isArray(arg.url)
    let checks = [nameCheck,brandCheck,descCheck,colorCheck,categoryCheck,priceCheck,pfactorCheck,stockCheck,urlCheck]
    if (!nameCheck || !brandCheck || !descCheck || !colorCheck || !categoryCheck || !priceCheck 
        || !pfactorCheck || !stockCheck || !urlCheck||Object.keys(arg).length > checks.length) {
        return false
    }
    return true
}