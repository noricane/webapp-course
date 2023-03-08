import { address } from './../model/adress';
import { Product, stockedSize } from "../model/product";
import { PastOrder } from '../model/pastorder';

const crypto = require('crypto');

export function checkLatinCharacters(str: string):string{
    return str.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ]+/g, "")
}
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
export enum CATEGORY {
    LOW,
    MID,
    HIGH,
}

export enum GENERALCOLOR {
    BLACK,
    GRAY,
    WHITE,
    BEIGE,
    BLUE,
    TEAL,
    GREEN,
    OLIVE,
    YELLOW,
    ORANGE,
    RED,
    MAROON,
    BROWN,
    PINK,
    PURPLE,
    GOLD,
    SILVER,
    MULTICOLORED

}

/*ANY CHANGES IN CONSTRUCTOR MUST REFLECT IN FUNCTION BELOW "isProduct" */
export type productConstructor= {
    name:string;
    brand: string;
    description:string;
    color:string;
    generalColor:GENERALCOLOR;
    price:number;
    category:CATEGORY;
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
    let generalColorCheck:boolean   = arg?.generalColor != null && Object.values(GENERALCOLOR).includes(arg?.generalColor.toUpperCase())
    let categoryCheck:boolean= arg?.category != null && Object.values(CATEGORY).includes(arg?.category.toUpperCase())
    let priceCheck:boolean   = arg?.price != null && typeof(arg.price)== "number"
    let pfactorCheck:boolean = arg?.price_factor != null && typeof(arg.price_factor)== "number"
    let stockCheck:boolean = arg?.stock != null && Array.isArray(arg.stock)
    let urlCheck:boolean = arg?.url != null &&  Array.isArray(arg.url)
    let checks = [nameCheck,brandCheck,descCheck,colorCheck,categoryCheck,priceCheck,pfactorCheck,stockCheck,urlCheck]
    if (!nameCheck || !brandCheck || !descCheck || !colorCheck || !generalColorCheck || !categoryCheck || !priceCheck 
        || !pfactorCheck || !stockCheck || !urlCheck||Object.keys(arg).length > checks.length) {
        return false
    }
    return true
}


//Checks that this any object contains the correct data for a user to be instantiated
export function isUser(arg: any){
    let nameCheck:boolean    = arg?.name != null && typeof(arg.name)== "string"
    let emailCheck:boolean   = arg?.email != null && typeof(arg.email)== "string"
    let passwordCheck:boolean    = arg?.password != null && typeof(arg.password)== "string"
    let phonenumberCheck:boolean   = arg?.phonenumber != null && typeof(arg.phonenumber)== "string"
    let birthdateCheck:boolean   = arg?.birthdate != null && arg.birthdate instanceof Date
    let addressCheck:boolean   = arg?.address != null && Array.isArray(arg?.address) && arrayType(arg?.address,"string")
    let orderCheck:boolean   = arg?.orders != null && Array.isArray(arg?.orders) && arrayInstance(arg?.orders,PastOrder)
    
    


    let checks = [nameCheck,emailCheck,passwordCheck,phonenumberCheck,birthdateCheck,addressCheck,orderCheck]
    if (!nameCheck || !emailCheck || !passwordCheck || !phonenumberCheck || !birthdateCheck || !addressCheck || !orderCheck 
        || Object.keys(arg).length > checks.length) {
        return false
    }
    return true
}


/*
 * Turn the map<String, Object> to an Object so it can be converted to JSON
 */
export const toObject = (map:any):any =>
    Array.from( 
        map.entries(), ([ k, v ]) =>
            v instanceof Map
                ? { key: k, value: toObject(v) }
                : { key: k, value: v }
    )
  
const arrayType = (arr:any[],type:string):boolean => {
    let bool = true
    if(arr.length == 0) {
        return bool
    }
    arr.forEach(e => {
        if(typeof(e) != type){
            bool = false
            return
        }})
    return bool
}
const arrayInstance = (arr:any[],type:any):boolean => {
    let bool = true
    if(arr.length == 0) {
        return bool
    }
    arr.forEach(e => {
        if(!(e instanceof type)){
            bool = false
        }})
    return bool
}