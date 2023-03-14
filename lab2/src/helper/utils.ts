import { address } from './../model/adress';
import { IProduct, stockedSize } from "../model/product";
import { PastOrder } from '../model/pastorder';

const crypto = require('crypto');

/* Turn a string into the corresponding string that includes alphabet shown below and without spaces */
export function checkLatinCharacters(str: string):string{
    return str.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ]+/g, "")
}
/* Turn string into the same string without spaces */
export function normalizeString(str: string){
    return str.replace(/\s/g, '').toLowerCase();
}
/* Hash function for hashing strings */
export function hashize(str:string) {
    if(str == null){return ""}
    return crypto.createHmac('sha256', normalizeString(str)).digest('hex');
}
/* Enum for the type of user accounts */
export enum UserType {
    ADMIN,
    CUSTOMER
}
/* Enum for shoe categories */
export enum CATEGORY {
    LOW,
    MID,
    HIGH,
}

//Enum for general colors copied from another ecommerce website
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
    images: string[];
}
/* Check that arg object is of type productConstructor, couldn't think of better way */
export function isProduct(arg: any){
    let nameCheck:boolean    = arg?.name != null && typeof(arg.name)== "string"
    let brandCheck:boolean   = arg?.brand != null && typeof(arg.brand)== "string"
    let descCheck:boolean    = arg?.description != null && typeof(arg.description)== "string"
    let colorCheck:boolean   = arg?.color != null && typeof(arg.color)== "string"
    let generalColorCheck:boolean   = arg?.generalColor != null && Object.keys(GENERALCOLOR).includes(arg?.generalColor.toUpperCase())
    let categoryCheck:boolean= arg?.category != null && Object.keys(CATEGORY).includes(arg?.category.toUpperCase())
    let priceCheck:boolean   = arg?.price != null && typeof(arg.price)== "number"
    let pfactorCheck:boolean = arg?.price_factor != null && typeof(arg.price_factor)== "number"
    let stockCheck:boolean = arg?.stock != null && Array.isArray(arg.stock)
    let urlCheck:boolean = arg?.images != null &&  Array.isArray(arg.images)
    let checks = [nameCheck,brandCheck,descCheck,colorCheck,generalColorCheck,categoryCheck,priceCheck,pfactorCheck,stockCheck,urlCheck]

    if (!nameCheck || !brandCheck || !descCheck || !colorCheck || !generalColorCheck || !categoryCheck || !priceCheck 
        || !pfactorCheck || !stockCheck || !urlCheck||Object.keys(arg).length > checks.length) {            
        return false
    }
    return true
}


//Checks that this any object contains the correct data for a user to be instantiated
export function isUser(arg: any){
    let arr = [arg?.street, arg?.city, arg?.country, arg?.zip,]
    let nameCheck:boolean    = arg?.name != null && typeof(arg.name)== "string"
    let emailCheck:boolean   = arg?.email != null && typeof(arg.email)== "string"
    let passwordCheck:boolean    = arg?.password != null && typeof(arg.password)== "string"
    let phonenumberCheck:boolean   = arg?.phonenumber != null && typeof(arg.phonenumber)== "string"
    let birthdateCheck:boolean   = arg?.birthdate != null && new Date(arg.birthdate) instanceof Date
    let addressCheck:boolean   = arr.length != 0 && Array.isArray(arr) && arrayType(arr,"string")
    let checks = [nameCheck,emailCheck,passwordCheck,phonenumberCheck,birthdateCheck,addressCheck]
     
    if (!nameCheck || !emailCheck || !passwordCheck || !phonenumberCheck || !birthdateCheck || !addressCheck /* || !orderCheck  */
        || Object.keys(arg).length > checks.length) {
        return false
    }
    return true
}


/*
Turn the map<String, Object> to an Object so it can be converted to JSON 
*/
export const toObject = (map:any):any =>
    Array.from( 
        map.entries(), ([ k, v ]) =>
            v instanceof Map
                ? { key: k, value: toObject(v) }
                : { key: k, value: v }
    )

/* 
Method for checking that an array only contains elements that are type of T
*/
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
/* 
Method for checking that an array only contains elements that are instances of T
 */
export const arrayInstance = (arr:any[],type:any):boolean => {
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

//Checks that given an array the items are of type multiProduct
export const isMultiProducts = (list:any[]):boolean => {
    let bool = true;
    list.forEach(e => {
        if(e.item.id == null || e.amount == null){
            bool= false
        }
    })
    return bool
}


/* Simple equality checker between arrays, copied from stack overflow */
export function arraysEqual(a:any[], b:any[]) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;
  
    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
}