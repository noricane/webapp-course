import { UserService } from './UserService';
import { Admin } from "../model/admin";
import { User } from "../model/user";


export interface IAdminService {
    logInUser(mail: string,password:string) : Promise<Admin|ProductError>;
    //Returns a list of all listed products
    getUsers() : Promise<User[]|ProductError>;

    addAdmin(admin:Admin): Promise<Admin|ProductError> //Change name of ProductError type?
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
    async logInUser(mail: string, password: string): Promise<Admin | ProductError> {
        const admin = await this.getAdmin(mail)
        if (admin instanceof Admin){
            if(admin.comparePassword(password)){
                return admin
            }else{
                return new ProductError(404,"Email or password was not found")
            }
        }else{
            return new ProductError(404,"Email or password was not found")
        }
    }

    userService:UserService;
    admins: Map<string,Admin> = new Map<string,Admin>()
    constructor(service:UserService){
        this.userService=service;
        const user = new Admin("Michael Jackson","mj@gmail.com","mj123")
        this.admins.set(user.email,user)
    }
   
    
    async getUsers(): Promise<User[]> {
        return Array.from(this.userService.users.values())
    }
    async getAdmin(mail: string): Promise<ProductError | Admin> {
        const query: Admin | undefined = this.admins.get(mail);

        if(query != undefined){
            return query;
        }else{
            return new ProductError(404, "No admin found with that email")
        }
    }
   


    async removeAdmin(email:string): Promise<ProductError | Admin> {
        const query = this.admins.get(email)
        if(query != null){
            this.admins.delete(email)
            return query
        }else{
            return new ProductError(404, "Admin not found")
        }
    }
    async addAdmin(admin: Admin): Promise<ProductError | Admin> {
        const query = this.admins.get(admin.email)
        if(query == null){
            this.admins.set(admin.email,admin)
            return admin
        }else{
            return new ProductError(400, "Admin already exists")
        }
    }
    
   
   
}



export function makeAdminService(service:UserService): AdminService{
    return new AdminService(service);
}