import { Hash } from 'crypto';
import { UserType } from '../helper/utils';
import { BaseUser } from './baseuser';
export class Admin extends BaseUser{
    //Api key for validating requests.
    private API_KEY:string
    getType():string {
        return UserType[UserType.ADMIN]
    }
    
    compareKey(reqString:string){
        return reqString == this.API_KEY
    }
     constructor(name: string,email: string,password: string){
        super(name,email,password)
        try{
            //Create apikey and return it in some way. TODO
            const key = ""
            this.API_KEY = key;
            
        }catch (e: any) {
            console.log(e.message);
            throw new Error(e)            
        }


    }
    
}