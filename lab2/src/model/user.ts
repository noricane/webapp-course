import { UserType } from "../../helper/utils";
import { address } from "./adress";
import { BaseUser } from "./baseuser";

export class User extends BaseUser{
    phonenumber: string;
    birthdate: string;
    adresses: address[];
    constructor(id: number,name: string,email: string,phonenumber: string,birthdate: string,adresses: address[]){
        super(id,name,email)
        this.phonenumber = phonenumber;
        this.birthdate = birthdate;
        this.adresses = adresses;
    }

    getType():string {
        return UserType[UserType.CUSTOMER]
    }
}