export type paymentInformation={
    card_holder:string; //Encrypt, How to hide encryption algorithm, .env var?
    card_number:string;//Encrypt
    csv_number:string; //can start with 0? //Encrypt
    expiration_date:string; //Encrypt
    isencrypted:boolean; //dont forger to check dis
}
export class Product{
    id:number; // different id for different sizes? multiProduct is a failed type without this.
    name:string;
    description:string;
    price:number;
    category:string;//Remove? sneakers only I'm thnking
    in_stock:boolean; // Thinking, remove this, keep array of sizes, if len == 0, not in stock.
    price_factor:number; //if factor < 1 then product is on sale
    images: string[];//array of urls.

    constructor(name:string,description:string,price:number,category:string,in_stock:boolean,price_factor:number, ...url:string[]){
        this.id = Date.now()
        this.name =name;
        this.description =description;
        this.price = price;
        this.category =category;
        this.in_stock = in_stock;

        this.price_factor = price_factor;
        this.images = [];
        url.forEach(e => this.images.push(e))
    }



}