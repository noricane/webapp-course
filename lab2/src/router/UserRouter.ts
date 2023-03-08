import { address } from './../model/adress';
import { stockedSize } from './../model/product';

import express, { Request, Response } from "express";

import { User } from "../model/user";
import { Admin } from "../model/admin";

import { makeProductService, ProductError } from '../service/ProductService';
import { makeUserService } from '../service/UserService';
import { isUser } from '../helper/utils';


const user_service = makeUserService();

export const user_router = express.Router();


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



