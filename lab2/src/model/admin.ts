import { Hash } from 'crypto';
import { UserType } from '../helper/utils';
import { BaseUser } from './baseuser';


//Rough translation of Admin class
export interface Admin extends BaseUser{
    //Will probably not be user
    API_KEY:string 
}
//Admin schema method interface
export interface AdminMethods{
    comparePassword(str:string):boolean
    changePassword(str:string):boolean
    changeEmail(str:string):boolean
    
    
}