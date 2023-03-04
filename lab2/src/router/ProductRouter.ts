import { toObject, GENERALCOLOR } from './../helper/utils';
import { stockedSize } from './../model/product';

import express, { Request, Response } from "express";

import { Product } from "../model/product";
import { isProduct, productConstructor } from '../helper/utils';
import { makeProductService, ProductError } from '../service/ProductService';


const product_service = makeProductService();

export const product_router = express.Router();

product_router.get("/", async (
    req: Request<{}, {}, {}>,
    res: Response<Map<string, Map<string, Product>> | string | JSON>
) => {
    try {
        console.log("router, before");
        const resp = await product_service.getProducts();
        console.log("router, after");
        if(resp instanceof Map<string, Map<string, Product>>){
            console.log("Not empty,sending",resp);
           
            //Success, resp contains products! 
            const res_obj = toObject(resp)
            console.log("res_obj", res_obj);
            res.status(200).send(res_obj);
            
        }else{
            //Resp is of type ProductError
            const code: number = resp.code
            const message: string = resp.message
            res.status(code).send(message);
            
        }
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

product_router.get("/", async (
    req: Request<{color:string}, {}, {}>,
    res: Response<Product[] | string>
) => {
    try {
        
        if(req.query.color == null){

            res.status(400).send(`Bad POST call to ${req.originalUrl} --- color query must exist...`);
            //Shouldn't this be the previous method?
            return
        }
        if(typeof req.query.color != "string" || !Object.values(GENERALCOLOR).includes(req.query.color.toUpperCase())){
            //400 Bad request, make sure the color and id is of type string.
            res.status(400).send(`Bad POST call to ${req.originalUrl} --- color query must be correct type and correct value`);
            return

        }else{
        const query:string = req.query.color
        
        let color: GENERALCOLOR = Object.values(GENERALCOLOR).indexOf(query.toUpperCase())
        if (color as number == -1){ //Weird stuff, it claims no overlap between color and -1 but this is factually incorrect. Cast for now.
            res.status(400).send(`Bad POST call to ${req.originalUrl} --- color query must be correct type and correct value`);
            return
        }
        const resp = await product_service.getColorProducts(color);

        if(resp instanceof ProductError){
            //Resp is of type ProductError
            res.status(resp.code).send(resp.message);
        }else{
            res.status(200).send(resp);
            //Success, resp contains products!
            
        }
    }
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

product_router.get("/", async (
    req: Request<{category:string}, {}, {}>,
    res: Response<Product[] | string>
) => {
    try {
        
        if(req.query.color == null){

            res.status(400).send(`Bad POST call to ${req.originalUrl} --- color query must exist...`);
            //Shouldn't this be the previous method?
            return
        }
        if(typeof req.query.color != "string" /* || !Object.values(GENERALCOLOR).includes(req.query.color.toUpperCase()) */){ //TODO, make category enum
            //400 Bad request, make sure the color and id is of type string.
            res.status(400).send(`Bad POST call to ${req.originalUrl} --- color query must be correct type and correct value`);
            return

        }else{
        const query:string = req.query.color
        
        let color: GENERALCOLOR = Object.values(GENERALCOLOR).indexOf(query.toUpperCase())
        if (color as number == -1){ //Weird stuff, it claims no overlap between color and -1 but this is factually incorrect. Cast for now.
            res.status(400).send(`Bad POST call to ${req.originalUrl} --- color query must be correct type and correct value`);
            return
        }
        const resp = await product_service.getColorProducts(color);

        if(resp instanceof ProductError){
            //Resp is of type ProductError
            res.status(resp.code).send(resp.message);
        }else{
            res.status(200).send(resp);
            //Success, resp contains products!
            
        }
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


            
            res.status(200).send(toObject(resp));
        }else{
            //Resp is of type ProductError
            console.log("error");
            
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
            res.status(400).send(`Bad POST call to ${req.originalUrl} --- color and id query must be string`);
            
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
    req: Request<{}, {}, { productInformation : productConstructor  }>,
    res: Response<Product | string>
) => {
    try {

        
        if (!isProduct(req.body.productInformation)) {
            res.status(400).send(`Bad POST call to ${req.originalUrl} --- description does not adhere to constructor for product`);
            return;
        }
        const description: productConstructor= req.body.productInformation;

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
product_router.put("/", async (
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
product_router.delete("/:id", async (
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
product_router.delete("/:id/:color", async ( 
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