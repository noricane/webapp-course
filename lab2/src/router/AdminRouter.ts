import { stockedSize } from './../model/product';

import express, { Request, Response } from "express";

import { User } from "../model/user";
import { Admin } from "../model/admin";

import { makeProductService, ProductError } from '../service/ProductService';
import { makeUserService } from '../service/UserService';

const admin_service = makeUserService();
export const admin_router = express.Router();

admin_router.get("/", async (
    req: Request<{}, {}, {}>,
    res: Response<User[] | string >
) => {
    try {
        const resp = await admin_service.getUsers();
        if(Array.isArray(resp)){       
            res.status(200).send(resp);
        }else{
            //This should never be the case. getUsers() returns list. 
            res.status(500).send("Internal Server Error");   
        }
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});


admin_router.post("/", async (
    req: Request<{admin:any}, {}, {}>,
    res: Response< Admin | string>
) => {
    try {
        const { admin } = req.params
        if(admin == null || admin.name == null || admin.email == null || admin.password == null){
            res.status(400).send("Bad GET request, id must be of type string");
        }
        const newAdmin = new Admin(admin.name,admin.email,admin.password)
        const resp = await admin_service.addAdmin(newAdmin);
        if(resp instanceof Admin){
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

admin_router.delete("/:id", async (
    req: Request<{id:number}, {}, {}>,
    res: Response< Admin | string>
) => {
    try {
        const { id } = req.params
        if(id == null || typeof(id) != "number"){
            res.status(400).send("Bad GET request, id must be of type number");
        }
        const resp = await admin_service.removeAdmin(id);
        if(resp instanceof Admin){
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