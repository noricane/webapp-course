import crypto  from 'crypto';
import { hashize } from '../helper/utils';


/* Abstract class that shares the foundations between the User and Admin classes  */
export abstract class BaseUser {
    
    profilepic:string | undefined;//url TODO
    protected id: number; 
    protected name: string;
    email: string;
    protected password: string;
    getId():number{
        return this.id
    }
    getName():string{
        return this.name
    }
    getPassword():string{
        return this.password
    }
    abstract getType():string;
    comparePassword(pass:string):boolean{
        return hashize(pass) == this.password
    }
    constructor(name: string,email:string,password:string){
        this.id = Date.now();
        this.name = name;
        this.email = email;
        this.password = hashize(password)

    }
}