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
        const product = await product_service.getProducts();
        if(product instanceof Map<string, Map<string, Product>>){
            res.status(200).send(product as Map<string, Map<string, Product>>);//Casting === bad??
        }else{
            let err = (product as ProductError)//Casting === bad??
            res.status(err.code).send(err.message);
            
        }
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});


