import { userModel } from './../../db/user.db';
import { UserService } from './UserService';
import { Admin } from "../model/admin";
import { User } from "../model/user";
import { adminModel } from '../../db/admin.db';


export interface IAdminService {
    logInUser(mail: string,password:string) : Promise<Admin|ProductError>;

    getUsers() : Promise<User[]|ProductError>;

    addAdmin(id:number,name: string,email: string,password:string): Promise<Admin|ProductError> //Change name of ProductError type?

    removeAdmin(email:string): Promise<Admin|ProductError> 

    getAdmin(email:string) : Promise<Admin|ProductError>;
}

export class ProductError{
    code:number;
    message:string;

    constructor(code:number, message:string){
        this.code = code;
        this.message = message;
    }
}

export class AdminService implements IAdminService{
    /* Logs in admin if there is an entry in admin map that matches email and password  */
    async logInUser(mail: string, password: string): Promise<Admin | ProductError> {
        const admin = await adminModel.findOne({email:mail})
        if (admin != null){
            if(admin.comparePassword(password)){
                return admin
            }else{
                return new ProductError(404,"Email or password was not found")
            }
        }else{
            return new ProductError(404,"Email or password was not found")
        }
    }

    /* Dependency injection to retrieve all users if the admin would like to manipulate them.*/
    userService:UserService;
    /* Map of admins in the form of <email,Admin> */
    admins: Map<string,Admin> = new Map<string,Admin>()

    constructor(service:UserService){
        this.userService=service;

        (async() => {
            const admin =  await adminModel.create({id:Date.now(),name:"Michael Jackson",email:"mj@gmail.com",password:"mj123"})
            console.log("creating user",admin);
        })()

    }
   
    /* Returns list of users from userService */
    async getUsers(): Promise<User[]> {
        return await userModel.find({})
    }

    /* Returns admin if found, this method seems a little weird, TODO */
    async getAdmin(email: string): Promise<ProductError | Admin> {
        const query = await adminModel.findOne({email:email});
        if(query != undefined){
            return query;
        }else{
            return new ProductError(404, "No admin found with that email")
        }
    }
   

    /* Removes admin if found */
    async removeAdmin(email:string): Promise<ProductError | Admin> {
        const query = await adminModel.findOne({email:email});

        if(query != null){
            query.deleteOne()
            return query
        }else{
            return new ProductError(404, "Admin not found")
        }
    }

    /* Adds admin if not found */
    async addAdmin(id:number,name: string,email: string,password:string): Promise<ProductError | Admin> {
        const query = await adminModel.findOne({email:email});
        if(query == null){
            const create = await adminModel.create({id:id,name:name,email:email,password:password});
            return create
        }else{
            return new ProductError(400, "Admin already exists")
        }
    }   
}



export function makeAdminService(service:UserService): AdminService{
    return new AdminService(service);
}