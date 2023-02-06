import { address } from "./adress";

export class user {
    id: number; 
    name: string;
    email: string;
    phonenumber: string;
    birthdate: string;
    adresses: address[];

    constructor(id: number,name: string,email: string,phonenumber: string,birthdate: string,adresses: address[]){
        this.id = id;
        this.name = name;
        this.email = email;
        this.phonenumber = phonenumber;
        this.birthdate = birthdate;
        this.adresses = adresses;
    }
}