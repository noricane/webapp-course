import { stockedSize } from './../model/product';

import express, { Request, Response } from "express";
import { makeProductService, ProductError } from "../service/ProductService";
import { Product } from "../model/product";
import { isProduct, productConstructor } from "../helper/utils";

const product_service = makeProductService();

export const product_router = express.Router();

product_router.get("/", async (
    req: Request<{}, {}, {}>,
    res: Response<Map<string, Map<string, Product>> | string>
) => {
    try {
        const resp = await product_service.getProducts();

        if(resp instanceof Map<string, Map<string, Product>>){
            //Success, resp contains products!
            res.status(200).send(resp);
        }else{
            //Resp is of type ProductError
            res.status(resp.code).send(resp.message);
            
        }
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

product_router.get("/:id", async (
    req: Request<{id:string}, {}, {}>,
    res: Response< Map<string, Product> | string>
) => {
    try {
        const { id } = req.params
        if(typeof(id) != "string"){
        res.status(400).send("Bad GET request, id must be of type string");
            
        }
        const resp = await product_service.getProduct(id);

        if(resp instanceof Map<string, Product>){
            //Success, resp contains products!
            res.status(200).send(resp);
        }else{
            //Resp is of type ProductError
            res.status(resp.code).send(resp.message);
            
        }
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

product_router.get("/:id", async (
    req: Request<{color:string}, {}, {id:string}>,
    res: Response<Product | string>
) => {
    try {
        if(req.query.color == null || req.body.id == null){
            //Shouldn't this be the previous method?
        }
        if(typeof req.query.color != "string" || typeof req.body.id != "string"){
            //400 Bad request, make sure the color and id is of type string.
        }else{

        const id: string = req.body.id
        const color: string = req.query.color
        const resp = await product_service.getProductColor(id,color);

        if(resp instanceof Product){
            //Success, resp contains products!
            res.status(200).send(resp);
        }else{
            //Resp is of type ProductError
            res.status(resp.code).send(resp.message);
            
        }
    }
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});



product_router.post("/", async (
    req: Request<{}, {}, { description : productConstructor }>,
    res: Response<Product | string>
) => {
    try {
        const description = req.body.description;
        if (!isProduct(description)) {
            res.status(400).send(`Bad POST call to ${req.originalUrl} --- description does not adhere to constructor for product`);
            return;
        }

        const resp = await product_service.addProduct(description);
        if(resp instanceof Product){
            //Success, resp contains products!
            res.status(200).send(resp);
        }else{
            //Resp is of type ProductError
            res.status(resp.code).send(resp.message);
            
        }
    } catch (e: any) {
        res.status(500).send(e.message);
    }
})


//TODO, is this good practice to have id outside url??
product_ro uter.put("/", async (
    req: Request<{}, {}, {id:string, color:string,size:number, amount:number}>,
    res: Response<string>
) => {
    try {
        const { id, color, size, amount } = req.body
        const stocked:stockedSize = {size,amount}
        if ( typeof(id) != "string" || typeof(color)!="string" || typeof(size) != "number" || typeof(amount) != "number" ){
            res.status(400).send(`Bad PUT call to ${req.originalUrl} --- fields do not adhere to restock api specification`);
            return
        }
        const resp = await product_service.restockProduct(id,color,stocked)
        if (resp === true){
            res.status(200).send("Successfully restocke")
        }else{
            res.status(resp.code).send(resp.message)
        }

    }
    catch (e: any) {
        res.status(500).send(e.message);
    }
})

//TODO, is this safe to have id in delete url??
produ ct_router.delete("/:id", async (
    req: Request<{id:string}, {}, {}>,
    res: Response< Map<string, Product> | string>
) => {
    try {
        const {id} = req.params;
        if (typeof(id) != "string"){
            res.status(400).send(`Bad DELETE call to ${req.originalUrl} --- fields do not adhere to restock api specification`);
            return
        }
        const resp =  await product_service.removeProduct(id)
        if(resp instanceof Map<string, Product>){
            //Success, resp contains products!
            res.status(200).send(resp);
        }else{
            //Resp is of type ProductError
            res.status(resp.code).send(resp.message);
            
        }
    }
    catch (e: any) {
        res.status(500).send(e.message);
    }
})
//TODO, is this safe to have id in delete url??
product _router.delete("/:id/:color", async ( 
    req: Request<{id:string, color:string}, {}, {}>,
    res: Response<Product|string>
) => {
    try {
        const {id, color} = req.params;
        if (typeof(id) != "string" || typeof(color) != "string"){
            res.status(400).send(`Bad DELETE call to ${req.originalUrl} --- fields do not adhere to restock api specification`);
            return
        }
        const resp =  await product_service.removeProductColor(id,color)
        if(resp instanceof Product){
            //Success, resp contains products!
            res.status(200).send(resp);
        }else{
            //Resp is of type ProductError
            res.status(resp.code).send(resp.message);
            
        }


    }
    catch (e: any) {
        res.status(500).send(e.message);
    }
})