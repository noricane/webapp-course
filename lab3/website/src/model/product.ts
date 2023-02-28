export type Product = {
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
}
type stockedSize = {
    size:number;
    amount:number;
}