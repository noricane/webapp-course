import { toObject, GENERALCOLOR, CATEGORY } from './../helper/utils';
import { stockedSize } from './../model/product';

import express, { Request, Response } from "express";

import { Product } from "../model/product";
import { isProduct, productConstructor } from '../helper/utils';
import { makeProductService, ProductError } from '../service/ProductService';


export const product_service = makeProductService();

export const product_router = express.Router();

product_router.get("/brands", async (
    req: Request<{}, {}, {}>,
    res: Response<string[]>,
    next:Function
) => {
    try {
        const resp = await product_service.getBrands()
        res.status(200).send(resp)
    }catch (e: any) {
        res.status(500).send(e.message);
    }
}) 

product_router.get("/", async (
    req: Request<{color:string,category:string}, {}, {}>,
    res: Response<Product[] | string>,
    next:Function
) => {
    try {
        let categoryList: Product[] | null = null
        let colorList: Product[] | null = null
        if(req.query.color == null && req.query.category == null){
            console.log('the response will be sent by the next function ...')
            return next()
            
        }

        
        if (req.query.color != null && (typeof req.query.color != "string" || !Object.values(GENERALCOLOR).includes(parseInt(req.query.color))) || (req.query.category != null && typeof req.query.category != "string") ){
            //400 Bad request, make sure the color and id is of type string.
            res.status(400).send(`Bad POST call to ${req.originalUrl} --- color/category query must be correct type and correct value ${req.query.co}`);
            return

        }
    /* --------------- CHECKING FOR COLOR HERE --------------- */
        if(req.query.color != null){
        
            
        const query = req.query.color
        if(typeof(query) != "string"){return}
        const parsedquery:number = parseInt(query)
        let color: GENERALCOLOR = Object.values(GENERALCOLOR).indexOf(parsedquery)

        
        if (parseInt(query) == -1){ //Weird stuff, it claims no overlap between color and -1 but this is factually incorrect. Cast for now.
            res.status(400).send(`Bad POST call to ${req.originalUrl} --- color query must be correct type and correct value ${typeof(req.query.color)}`);
            return
        }
        const resp = await product_service.getColorProducts(parsedquery);

        if(resp instanceof ProductError){
            //Resp is of type ProductError
            res.status(resp.code).send(resp.message);
            return

        }else{

            //Success, resp contains products!
            
            colorList = resp
        }
    }



    /* --------------- CHECKING FOR CATEGORY HERE --------------- */
        if(req.query.category != null){
        const query:string = req.query.category
        
        const parsedquery = parseInt(query)

        


        if (parsedquery == -1){ //Weird stuff, it claims no overlap between color and -1 but this is factually incorrect. Cast for now.
            res.status(400).send(`Bad POST call to ${req.originalUrl} --- category query must be correct type`);
            return
        }

        const resp = await product_service.getCategoryProducts(parsedquery);

        if(resp instanceof ProductError){
            //Resp is of type ProductError
            res.status(resp.code).send(resp.message);
            return
        }else{

            //Success, resp contains products!
            categoryList = resp
        }
    }


    if(categoryList !=null && colorList !=null){
        /* @ts-ignore  for some reason TS still thinks categoryList might be null*/
        console.log("SE#NDING",colorList.filter(e => categoryList.includes(e)));
        /* @ts-ignore  for some reason TS still thinks categoryList might be null*/
        
        res.status(200).send( colorList.filter(e => categoryList.includes(e)))
    }else if (colorList != null){
        res.status(200).send( colorList)
    }else if( categoryList != null){
        res.status(200).send(categoryList)
    }

    } catch (e: any) {
        res.status(500).send(e.message);
        return

    }
});

product_router.get("/", async (
    req: Request<{}, {}, {}>,
    res: Response<Map<string, Map<string, Product>> | string | JSON>
) => {
    try {

        const resp = await product_service.getProducts();

        if(resp instanceof Map<string, Map<string, Product>>){

           
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


product_router.get("/:id", async (
    req: Request<{color:string,id:string}, {}, {}>,
    res: Response<Product | string>,
    next:Function
) => {
    try {
        if(req.query.color == null){
            //Shouldn't this be the previous method?
            return next()
        }
        if(typeof req.query.color != "string"){
            //400 Bad request, make sure the color and id is of type string.
            res.status(400).send(`Bad POST call to ${req.originalUrl} --- color and id query must be string`);
            
        }else{

        const id: string = req.params.id
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
            console.log("successfully created");
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
    req: Request<{}, {}, {productInformation : productConstructor }>,
    res: Response<string>
) => {
    try {
        console.log("in here boy");
        console.log((req.body.productInformation));
        console.log("here");
        console.log(isProduct(req.body.productInformation));
        console.log("Here?");
        
        if (!isProduct(req.body.productInformation)) {
            res.status(400).send(`Bad POST call to ${req.originalUrl} --- description does not adhere to constructor for product`);
            return;
        }
        console.log("in here again boy");
        const description: productConstructor= req.body.productInformation;
        
        const resp = await product_service.editProduct(description);
        console.log("resp",resp);

        if (resp instanceof Product){
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

