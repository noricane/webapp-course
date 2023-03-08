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
