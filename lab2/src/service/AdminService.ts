import { userModel } from './../../db/user.db';
import { UserService } from './UserService';
import { Admin } from "../model/admin";
import { User } from "../model/user";
import { adminModel } from '../../db/admin.db';
import { hashize } from '../helper/utils';
import { ProductError } from '../model/ProductError';


export interface IAdminService {
    logInUser(mail: string,password:string) : Promise<Admin|ProductError>;

    validateAdmin(admin:Admin):Promise<boolean>

    getUsers() : Promise<User[]|ProductError>;

    addAdmin(id:number,name: string,email: string,password:string): Promise<Admin|ProductError> //Change name of ProductError type?

    removeAdmin(email:string): Promise<Admin|ProductError> 

    getAdmin(email:string) : Promise<Admin|ProductError>;
}

export class AdminService implements IAdminService{
    /* Checks if admin exists and compares password returning a product error if any of these checks fail */
    async logInUser(mail: string, password: string): Promise<Admin | ProductError> {
        const admin = await adminModel.findOne({email:mail})
        console.log("found",admin);
        
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

      /* console.log("Removing all");
       (async()=>{
        const resp = await adminModel.deleteMany({});
      console.log("resp",resp);
      })() */
    }
    async validateAdmin(admin: Admin): Promise<boolean> {
        const query = await adminModel.findOne({email:admin.email})
        if(query == null){
            return false
        }

        return query?.password == admin.password
    }
   
    /* Returns list of users from userService */
    async getUsers(): Promise<User[]> {
        return await userModel.find({})
    }

    /* Returns admin if found, and product error otherwise */
    async getAdmin(email: string): Promise<ProductError | Admin> {
        const query = await adminModel.findOne({email:email});
        if(query != undefined){
            return query;
        }else{
            return new ProductError(404, "No admin found with that email")
        }
    }
   

    /* Removes admin if found and returns Admin, returns ProductError otherwise*/
    async removeAdmin(email:string): Promise<ProductError | Admin> {
        const query = await adminModel.findOne({email:email});

        if(query != null){
            query.deleteOne()
            return query
        }else{
            return new ProductError(404, "Admin not found")
        }
    }

    /* Adds admin and returns it if not found, otherwise returns a ProductError */
    async addAdmin(id:number,name: string,email: string,password:string): Promise<ProductError | Admin> {
        const query = await adminModel.findOne({email:email});
        if(query == null){
            const create = await adminModel.create({id:id,name:name,email:email,password:hashize(password)});
            return create
        }else{
            return new ProductError(400, "Admin already exists")
        }
    }   
}



export function makeAdminService(service:UserService): AdminService{
    return new AdminService(service);
}