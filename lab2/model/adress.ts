export enum addressType {
    BILLING,
    DELIVERY
}
export class address {
    type: addressType;
    street: string;
    city: string;
    country: string;
    zip: string;

    constructor(type: addressType, street: string,city: string,country: string,zip: string){
        this.type = type
        this.street = street
        this.city = city
        this.country = country
        this.zip = zip
    }
}