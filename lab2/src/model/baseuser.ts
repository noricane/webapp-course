export abstract class BaseUser {
    profilepic:string | undefined;//url TODO
    private id: number; 
    name: string;
    private email: string;
    private password: string;

    abstract getType():string;

    constructor(id: number,name: string,email:string){
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = ""

    }
}