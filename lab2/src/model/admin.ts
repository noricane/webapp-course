import { Hash } from 'crypto';
import { UserType } from '../helper/utils';
import { BaseUser } from './baseuser';
export interface Admin extends BaseUser{

    API_KEY:string 
    
    
}
export interface AdminMethods{

    comparePassword(str:string):boolean
    changePassword(str:string):boolean
    changeEmail(str:string):boolean
    
    
}