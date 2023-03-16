import crypto  from 'crypto';
import { hashize } from '../helper/utils';


/* Abstract class that shares the foundations between the User and Admin classes  */
export interface BaseUser {
    
    profilepic?:string | undefined;//url TODO
     id: number; 
     name: string;
    email: string;
     password: string;
    
}