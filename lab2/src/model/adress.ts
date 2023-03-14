/* Addresses can be either of type Billing or Delivery */
export enum addressType {
    BILLING,
    DELIVERY
}

/* Address class for storing user addresses in. */
export interface address {
    id: number;
    addressType: addressType;
    street: string;
    city: string;
    country: string; 
    zip: string;

}