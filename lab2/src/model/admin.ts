import { Hash } from 'crypto';
import { UserType } from '../helper/utils';
import { BaseUser } from './baseuser';
export class Admin extends BaseUser{
    //API_KEY:string
    getType():string {
        return UserType[UserType.ADMIN]
    }
     constructor(id: number,name: string,email: string){
        super(id,name,email)
        
        try{
            //Create apikey then send api key and id.
            const key = "oogaboogqa"
            //this.API_KEY = key;

            //fetch(send here)
        }catch (e: any) {
            console.log(e.message);
            throw new Error(e)            
        }


    }
    
}