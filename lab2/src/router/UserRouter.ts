import { arrayInstance, isMultiProducts } from './../helper/utils';
import { PastOrder, multiProduct } from './../model/pastorder';
import express, { Request, Response } from "express";
import { User } from "../model/user";
import { makeUserService } from '../service/UserService';
import { isUser } from '../helper/utils';

export const user_router = express.Router();

const user_service = makeUserService();

user_router.get("/order/:id", async (
    req: Request<{id:string}, {}, {}>,
    res: Response< PastOrder[] | string>
) => {
    try {
        const { id } = req.params
        if(id == null || typeof(id) != "string"){
            res.status(400).send("Bad GET request, id must be of type string");
        }
        const resp = await user_service.getUserOrders(id);
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

user_router.post("/order/:id", async (
    req: Request<{id:string}, {}, {items:multiProduct[]}>,
    res: Response< PastOrder | string>
) => {
    try {
        const { id } = req.params
        const { items } = req.body
        if(items == null || !Array.isArray(items) || !isMultiProducts(items)){
            res.status(400).send("Bad GET request, orders must adhere to specification");
        }

        const resp = await user_service.addUserOrder(id,...items);
        if(resp === true){
            //Success, resp is the requested user!            
            res.status(200).send("Successfully added order");
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

user_router.post("/:id", async (
    req: Request<{user:any}, {}, {}>,
    res: Response< User | string>
) => {
    try {
        const { user } = req.params
        if(user == null || !isUser(user)){
            res.status(400).send("Bad GET request, id must be of type string");
        }
        const newuser = new User(user.name,user.email,user.password,user.phonenumber,user.birthdate,user.address,user.orders)
        const resp = await user_service.addUser(newuser);
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
    req: Request<{id:string}, {}, {}>,
    res: Response< User | string>
) => {
    try {
        const { id } = req.params
        if(id == null || typeof(id) != "string"){
            res.status(400).send("Bad GET request, id must be of type string");
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



