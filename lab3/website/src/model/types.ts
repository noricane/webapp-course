/* Collection of all relevant enums, types and interfaces */


interface BaseUser {
    profilepic:string | undefined;//url TODO
     id: number; 
     name: string;
    email: string;
     password: string;
}


export interface PastOrder{
    id:number;
    items: multiProduct[];

   
}
export interface stockedSize  {
    size:number;
    amount:number;
}
export interface multiProduct{
    item: Product; //product id 
    size:number;
    amount: number;
}

export enum UserType {
    ADMIN,
    CUSTOMER
}
export enum addressType {
    BILLING,
    DELIVERY
}
interface address {
    id: number;
    addressType: addressType;
    street: string;
    city: string;
    country: string; 
    zip: string;

}


export interface ProductError{
    code:number;
    message:string;
}

export interface User extends BaseUser{
    phonenumber: string;
    birthdate: Date;
    orders: PastOrder[]
    adresses: address[];
    
}

export type Product = {
    id:string; // different id for different sizes? multiProduct is a failed type without this.
    name:string;
    brand: string;
    description:string;
    generalColor:string;
    color:string;
    price:number;
    category:string;//Remove? sneakers only I'm thnking
    stock:stockedSize[]; 
    price_factor:number; //if factor < 1 then product is on sale
    images: string[];//array of urls.
    isInStock:()=>boolean;//??
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

export enum CATEGORY {
    LOW,
    MID,
    HIGH,
}
