import { address, addressType } from './../model/adress';
import { ProductError } from './../service/UserService';
import { arrayInstance, hashize, isMultiProducts } from './../helper/utils';
import { PastOrder, multiProduct } from './../model/pastorder';
import express, { Request, Response } from "express";
import { User } from "../model/user";
import { makeUserService } from '../service/UserService';
import { isUser } from '../helper/utils';
import { product_service } from './ProductRouter';

export const user_router = express.Router();

export const user_service = makeUserService(product_service);


export type UserRequest = Request & {
    body :{
        username:string, 
        password:string
    }
    session : {
        user ?: User
    }
}

user_router.post("/newsletter", async (
    req: UserRequest&{body:{email:string}},
    res: Response< string>
) => {
    try {
        const { email } = req.body
        if(typeof email != "string"){
            res.status(400).send("Bad request, email is not valid");
        }
        
        const resp = user_service.addNewsLetterMail(email)
        console.log("email",resp);
        if (resp == true){
            
            res.status(200).send("Sucessfully added mail");
            
        }
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});
user_router.post("/login", async (
    req: UserRequest,
    res: Response< User | string>
) => {
    try {
        console.log("logging in");
        
        const { email,password } = req.body
        if(email == null || password == null || typeof(email)  != "string" || typeof(password)  != "string"){
            res.status(400).send("Bad GET request, login details must adhere to specification");
            return
        }


        const resp = await user_service.logInUser(email,password);
        if(resp instanceof ProductError){
            //Error
            console.log("error met");
            res.status(resp.code).send(resp.message);
            //Success, resp is the requested user!            
        }else{
            console.log("sending resp");
            
            console.log("response",JSON.stringify(resp));
            
            res.cookie('user',JSON.stringify(resp))
            res.status(200).send("Successfully logged in");
        }
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});


user_router.post("/register", async (
    req: Request<{}, {}, {user:any}> & {session:{user?:User}},
    res: Response< true | string>
) => {
    try {
        const { user } = req.body
        console.log((user));
        console.log(isUser(user));
        if(user == null /*||  !isUser(user) */){
            
            res.status(400).send("Bad GET request, id must be of type string");
            return
        }

        const resp = await user_service.addUser(Date.now(),user.name,user.email,hashize(user.password),user.phonenumber,user.birthdate,[{id:Date.now(),addressType:addressType.DELIVERY,street:user.street,city:user.city,country:user.country,zip:user.zip}]);
        console.log("RESPONSEE IS ",resp);
        
        if(resp instanceof ProductError){
            //Success, resp is the registered user!            
            res.status(resp.code).send(resp.message);
            //Resp is of type ProductError
        }else{
            res.cookie('user',JSON.stringify(resp))
            res.status(200).send(true);
        }
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});






user_router.post("/order", async (
    req: Request & {body:{items:multiProduct[]}, session: {user?: User}},
    res: Response< PastOrder | multiProduct[] | string>
) => {
    try {

        const { items,id } = req.body
        console.log(req.body);
        console.log("user",req.session.user);
        
        console.log(Array.isArray(items));
        console.log(isMultiProducts(items));
        
        if(items == null || !Array.isArray(items) || !isMultiProducts(items)){
            res.status(400).send("Bad GET request, orders must adhere to specification");
            return
        }
        console.log("finna add order");
        
        const resp = await user_service.addUserOrder(id,...items);
        console.log("resp",resp);
        if(resp instanceof ProductError){
            //Resp is of type ProductError
            res.status(resp.code).send(resp.message);
        }else if(resp.items != null && (resp as PastOrder).id != null){
            res.status(200).send(resp as PastOrder);
        }else{
            //I'd rather not have to send a 200 since it technically isn't accepted
            res.status(200).send(resp.items);
           
        }
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});



user_router.get("/:id", async (
    req: Request<{id:string}, {}, {}>,
    res: Response< User | string>
) => {
    try {
        const { id } = req.params
        if(id == null || typeof(id) != "string"){
            res.status(400).send("Bad GET request, id must be of type string");
            return
        }
        const resp = await user_service.getUser(id);
        console.log("email",id);
        console.log("response is",resp);
        
        if(resp instanceof ProductError){
            //Resp is of type ProductError
            res.status(resp.code).send(resp.message);
        }else{
            //Success, resp is the requested user!           
            res.cookie('user',JSON.stringify(resp)) 
            res.status(200).send(resp);
        }
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});



user_router.delete("/:id", async (
    req: Request & {params:{id:string},session: {user?: User}},
    res: Response< User | string>
) => {
    try {
        const { id } = req.params
        const { user } = req.body
        if(id == null || typeof(id) != "string" || user == null){
            res.status(400).send("Bad GET request, id must be of type string and user must be logged in");
            return
        }
        const resp = await user_service.removeUser(id);
        if(resp instanceof ProductError){
            //Resp is of type ProductError
            res.status(resp.code).send(resp.message);
        }else{
            //Success, resp is the requested user!            
            res.status(200).send(resp);
        }
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});



