import crypto  from 'crypto';
export abstract class BaseUser {
    hash = (input:string):string => crypto.createHash('sha256').update(input).digest('base64');
    profilepic:string | undefined;//url TODO
    protected id: number; 
    protected name: string;
    email: string;
    protected password: string;
    getId():number{
        return this.id
    }
    abstract getType():string;
    comparePassword(pass:string):boolean{
        return this.hash(pass) == this.password
    }
    constructor(name: string,email:string,password:string){
        this.id = Date.now();
        this.name = name;
        this.email = email;
        this.password = this.hash(password)

    }
}