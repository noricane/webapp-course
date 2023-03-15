import express, { Request, Response } from "express";
import { User } from "../model/user";
import { Admin } from "../model/admin";
import {  ProductError } from '../service/ProductService';
import { makeAdminService } from '../service/AdminService';
import { UserRequest, user_service } from './UserRouter';



const admin_service = makeAdminService(user_service);
export const admin_router = express.Router();

/* Log in route, 
if request isn't successful (and no error being thrown) it returns ProductError code and status , 
else sets client side cookie and sends success response,
if any error is thrown the catch will send it's own response */
admin_router.post("/login", async (
    req: UserRequest,
    res: Response< Admin | string>
) => {
    try {
        const { email,password } = req.body
        if(email == null || password == null || typeof(email)  != "string" || typeof(password)  != "string"){
            res.status(400).send("Bad GET request, login details must adhere to specification");
            return
        }
        //Request is accepted. Proceed to processing query in service.
        const resp = await admin_service.logInUser(email,password);
        if(resp instanceof ProductError){
            //Error met        
            res.status(resp.code).send(resp.message);
        }else{
            //Success, resp is the requested user!            
            //Set clientside cookie and response string
            res.cookie('user',JSON.stringify(resp));
            res.status(200).send("Successfully logged in");
        }
    } catch (e: any) {        
        res.status(500).send(e.message);
    }
});

/* Returns a list of all users if successful */
admin_router.get("/", async (
    req: Request<{}, {}, {}>,
    res: Response<User[] | string >//TODO chekc that admin cookie exists here
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

/* Adds admin
    if query is invalid a response is sent with code 400 and message
    else service is called to add admin and responds with a producterror if admin(email) exists
    otherwise it responds with admin object.
    if any error is thrown the catch will send it's own response
    */
admin_router.post("/", async (
    req: Request<{}, {}, {admin:any}>,
    res: Response< Admin | string>//TODO chekc that admin cookie exists here, only admins can add admins
) => {
    try {
        const { admin } = req.body
        if(admin == null || admin.name == null || admin.email == null || admin.password == null || typeof(admin.name) != "string" || typeof(admin.email) != "string" || typeof(admin.password) != "string"){
            res.status(400).send("Bad GET request, admin must have correct arguments, must be of type string");
            return
        }
        //Request is accepted. Proceed to processing query in service.
        const resp = await admin_service.addAdmin(Date.now(),admin.name,admin.email,admin.password);
        if(resp instanceof ProductError){
            //Resp is of type ProductError
            res.status(resp.code).send(resp.message);
        }else{
            //Success, resp is the requested user!            
            res.status(200).send(resp as Admin);
        }
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

/* Removes admin 
    if query is invalid a response is sent with code 400 and message
    else service is called to remove admin and responds with a producterror if admin doesn't exist
    otherwise it responds with admin object.
    if any error is thrown the catch will send it's own response
    */
admin_router.delete("/:id", async (
    req: Request<{id:string}, {}, {}>,//TODO chekc that admin cookie exists here
    res: Response< Admin | string>
) => {
    try {
        const { id } = req.params
        if(id == null || typeof(id) != "number"){
            res.status(400).send("Bad GET request, id must be of type number");
        }
        //Request is accepted. Proceed to processing query in service.
        const resp = await admin_service.removeAdmin(id);
        if(resp instanceof ProductError){
            //Resp is of type ProductError
            res.status(resp.code).send(resp.message);
        }else{
            //Success, resp is the requested user!            
            res.status(200).send(resp as Admin);
        }
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});