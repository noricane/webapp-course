export abstract class BaseUser {
    profilepic:string | undefined;//url TODO
    protected id: number; 
    protected name: string;
    email: string;
    protected password: string;
    
    abstract getType():string;

    constructor(name: string,email:string,password:string){
        this.id = Date.now();
        this.name = name;
        this.email = email;
        this.password = "hashed password goes here, password is hashed client side then sent"

    }
}