import express, { Request, Response } from "express";
import { makeProductService, ProductError } from "../service/ProductService";
import { Product } from "../model/product";

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
    req: Request<{}, {}, {id:string}>,
    res: Response< Map<string, Product> | string>
) => {
    try {
        
        const resp = await product_service.getProduct(req.body.id);

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