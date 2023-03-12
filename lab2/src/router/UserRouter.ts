import { address, addressType } from './../model/adress';
import { ProductError } from './../service/UserService';
import { arrayInstance, isMultiProducts } from './../helper/utils';
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
        const newuser = new User(user.name,user.email,user.password,user.phonenumber,user.birthdate,[new address(addressType.DELIVERY,user.street,user.city,user.country,user.zip)],user.orders)
        const resp = await user_service.addUser(newuser);
        console.log("RESPONSEE IS ",resp);
        
        if(resp instanceof User){
            res.cookie('user',JSON.stringify(resp))
            //Success, resp is the registered user!            
            res.status(200).send(true);
        }else{
            //Resp is of type ProductError
            res.status(resp.code).send(resp.message);
        }
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});


user_router.get("/order", async (
    req: Request & {session: {user?: User}},
    res: Response< PastOrder[] | string>
) => {
    try {
        const { user } = req.session
        if(user == null || !(user instanceof User)){
            res.status(400).send("Bad GET request, user is not logged in");
            return
        }
        const resp = await user_service.getUserOrders(user.email);
        if(Array.isArray(resp)){
            //Success, resp is the requested user!            
            res.status(200).send(resp);
        }else{
            //Resp is of type ProductError
            res.status(resp.code).send(resp.message);
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
        if(Array.isArray(resp)){
            //I'd rather not have to send a 200 since it technically isn't accepted
            res.status(200).send(resp);
        }else if(resp instanceof PastOrder){
            res.status(200).send(resp);
        }else{
            //Resp is of type ProductError
            res.status(resp.code).send(resp.message);
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
        if(resp instanceof User){
            //Success, resp is the requested user!            
            res.status(200).send(resp);
        }else{
            //Resp is of type ProductError
            res.status(resp.code).send(resp.message);
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
        if(resp instanceof User){
            //Success, resp is the requested user!            
            res.status(200).send(resp);
        }else{
            //Resp is of type ProductError
            res.status(resp.code).send(resp.message);
        }
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});



