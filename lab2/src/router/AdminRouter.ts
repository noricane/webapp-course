import { stockedSize } from './../model/product';

import express, { Request, Response } from "express";

import { User } from "../model/user";
import { Admin } from "../model/admin";

import { makeProductService, ProductError } from '../service/ProductService';
import { makeAdminService } from '../service/AdminService';
import { UserRequest, user_service } from './UserRouter';


const admin_service = makeAdminService(user_service);
export const admin_router = express.Router();


admin_router.post("/login", async (
    req: UserRequest,
    res: Response< Admin | string>
) => {
    try {
        console.log("logging in");
        
        const { email,password } = req.body
        if(email == null || password == null || typeof(email)  != "string" || typeof(password)  != "string"){
            res.status(400).send("Bad GET request, login details must adhere to specification");
            return
        }


        const resp = await admin_service.logInUser(email,password);
        if(resp instanceof ProductError){
            //Error
            console.log("error met");
            res.status(resp.code).send(resp.message);
            //Success, resp is the requested user!            
        }else{
            console.log("sending resp");
            
            console.log("response",JSON.stringify(resp));
            
            res.cookie('user',JSON.stringify(resp));
            res.status(200).send("Successfully logged in");
        }
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

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
    req: Request<{}, {}, {admin:any}>,
    res: Response< Admin | string>
) => {
    try {
        const { admin } = req.body
        if(admin == null || admin.name == null || admin.email == null || admin.password == null || typeof(admin.name) != "string" || typeof(admin.email) != "string" || typeof(admin.password) != "string"){
            res.status(400).send("Bad GET request, admin must have correct arguments, must be of type string");
            return
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
    req: Request<{id:string}, {}, {}>,
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