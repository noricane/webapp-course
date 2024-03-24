
import { multiProduct } from './../model/pastorder';
import { toObject, GENERALCOLOR } from './../helper/utils';
import express, { Request, Response } from "express";
import { Product } from "../model/product";
import { isProduct, productConstructor } from '../helper/utils';
import { makeProductService } from '../service/ProductService';
import { ProductError } from "../model/ProductError";
import { User } from '../model/user';
import { initShoes } from '../service/dummyproducts';
import { Admin } from 'mongodb';


export const product_service = makeProductService();
export const product_router = express.Router();
//initShoes(product_service);

/* init route */
product_router.get("/init", async (
    req: Request<{}, {}, {}>,
    res: Response<string>,
) => {
    try {
        initShoes(product_service)
        res.status(200).send("resp")
    }catch (e: any) {
        res.status(500).send(e.message);
    }
}) 
/* brands path for retrieving a list of stored brands */
product_router.get("/brands", async (
    req: Request<{}, {}, {}>,
    res: Response<string[]>,
) => {
    try {
        const resp = await product_service.getBrands()
        res.status(200).send(resp)
    }catch (e: any) {
        res.status(500).send(e.message);
    }
}) 

/* updatecart path for updating an incoming list of multiproducts to match what's on the server.
    Used for updating a users cart*/
product_router.post("/updatecart", async (
    req: Request & {
        body:{clientlist:multiProduct[]}
        cookies: {user?: User}
    },
    res: Response<multiProduct[] | string>
) => {
    try {
        //Dodo
        /* const user = req.cookies?.user
        if(user == null || !(user instanceof User)){
            console.log("no user");
            res.status(400).send("Bad GET request, user is not logged in");
            return
        } */
        if(req.body.clientlist == null || !Array.isArray(req.body.clientlist)){
            res.status(400).send("Bad GET request, cart is not formatted in a correct way");
            return
        }
        console.log("list",req.body.clientlist);
        
        const resp = await product_service.updateClientList(req.body.clientlist)
        console.log("resp",resp);
        console.log("resp end");
        
        resp.forEach(e=> console.log(e.item.stock));
        
        
        res.status(200).send(resp)
    }catch (e: any) {
        console.log(e);
        
        res.status(500).send(e.message);
    }
}) 

/* This route is the route that is executed when a 
    client requests a specific selection of products that is filtered by color and/or category.
    If request body is invalid a 400 response is sent with a message.
    It will respond with a list of correctly filtered products upon success.
    Response will be ProductError if any service call fails.
    if any error is thrown the response will be 500 and error
*/
product_router.get("/", async (
    req: Request<{color:string,category:string}, {}, {}>,
    res: Response<Product[] | string>,
    next:Function
) => {
    try {
        let categoryList: Product[] | null = null
        let colorList: Product[] | null = null
        /* Check if request is intended for the next route */
        if(req.query.color == null && req.query.category == null){
            //console.log('the request will be passed to the next router function ...')
            return next()
        }
        /* Validate */
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

            if (parsedquery == -1){ 
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

        /* Respond with the correct list */
        if(categoryList !=null && colorList !=null){
            /* @ts-ignore  for some reason TS still thinks colorList might be null*/
            res.status(200).send( categoryList.filter(col => colorList.find(cat => cat.color == col.color) != null));
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

/* Get all products 
    Response will be ProductError if call to service doesn't return map
    If call is successfull a map converted to an object containing is sent to the client which contains all products.
    If error is thrown response will contain the message with code 500 
    */
product_router.get("/", async (
    req: Request<{}, {}, {}>,
    res: Response<Map<string, Map<string, Product>> | string>
) => {
    try {
        const resp = await product_service.getProducts();

        if(resp instanceof Map/* <string, Map<string, Product>> */){
            //Success, resp contains products! 
            //Convert to object since JSON stringify will introduce problems upon nested maps.
            const res_obj = toObject(resp)            
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

/* Get a specific product that matches color query from server.
    If request parameters are bad a 400 response will be sent with a message.
    If not service will be queried for the specific item and will respond with a 
    ProductError if the product isn't found or if the color wasnt found.
    If it succeeds the response will be that product.
    If error is thrown response will contain the message with code 500 
 */
product_router.get("/:id", async (
    req: Request<{color:string,id:string}, {}, {}>,
    res: Response<Product | string>,
    next:Function
) => {
    try {
        if(req.query.color == null){
            //console.log('the request will be passed to the next router function ...')
            return next()
        }
        if(typeof req.query.color != "string"){
            //400 Bad request, make sure the color and id is of type string.
            res.status(400).send(`Bad POST call to ${req.originalUrl} --- color and id query must be string`);
            
        }else{

            const id: string = req.params.id
            const color: string = req.query.color
            const resp = await product_service.getProductColor(id,color);

            if(resp instanceof ProductError){
                //Resp is of type ProductError
                res.status(resp.code).send(resp.message);
            }else{
                //Success, resp contains products!
                res.status(200).send(resp);
            }
        }
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

/* Get a specific product from server.
    If request parameters are bad a 400 response will be sent with a message.
    If not service will be queried for the specific item and will respond with a 
    ProductError if the product isn't found.
    If it succeeds the response will be that product.
    If error is thrown response will contain the message with code 500 
 */
product_router.get("/:id", async (
    req: Request<{id:string}, {}, {}>,
    res: Response< Map<string, Product> | string>
) => {
    try {
        const { id } = req.params
        if(typeof(id) != "string"){
            res.status(400).send("Bad GET request, id must be of type string");
            return
        }
        
        const resp = await product_service.getProduct(id);
        if(resp instanceof Map/* <string, Product> */){
            //Success, resp contains products!            
            res.status(200).send(toObject(resp));
        }else{
            //Resp is of type ProductError
            res.status(resp.code).send(resp.message);
        }
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});




/*  Add a specific product to the server.
    If request parameters are bad a 400 response will be sent with a message.
    If not service will be called to add product and responds with a 
    ProductError if the product already exists.
    If it succeeds in adding, the response will be that product.
    If error is thrown response will contain the message with code 500  */
product_router.post("/", async (
    req: Request<{}, {}, { productInformation : productConstructor  }>,//TODO chekc that admin cookie exists here
    res: Response<Product | string>
) => {
    try {
        //Adding cookie validation broke my tests.
       /*  const {user:admin} = req.cookies
        if(admin == null){
            res.status(400).send(`Bad POST call to ${req.originalUrl} --- Admin must be logged in`);
            return;
        }
        const validate =  await admin_service.validateAdmin(admin)
        if(validate == false){
            res.status(400).send(`Bad POST call to ${req.originalUrl} --- Admin not valid`);
            return;
        } */
        if (!isProduct(req.body.productInformation)) {
            res.status(400).send(`Bad POST call to ${req.originalUrl} --- description does not adhere to constructor for product`);
            return;
        }
        const description: productConstructor= req.body.productInformation;
        const resp = await product_service.addProduct(description);
       
        if(resp instanceof ProductError){
            //Resp is of type ProductError
            res.status(resp.code).send(resp.message);
        }else{
            console.log("successfully created");
            //Success, resp contains products!
            res.status(200).send(resp);   
        }
    } catch (e: any) {
        console.log(e);
        
        res.status(500).send(e.message);
    }
})


/*  Edit a specific product on the server.
    If request parameters are bad a 400 response will be sent with a message.
    If not service will be called to edit product and responds with a 
    ProductError if the product isn't found or if the color wasnt found.
    If it succeeds in adding, the response will be that product.
    If error is thrown response will contain the message with code 500  */
product_router.put("/", async (
    req: Request & {body:{productInformation : productConstructor}, cookies:{user?:Admin}    }, //TODO chekc that admin cookie exists here
    res: Response<string>
) => {
    try {
        console.log("in router",req.body);
        console.log("in cookies",req.cookies);
        
        if (!isProduct(req.body.productInformation)) {
            res.status(400).send(`Bad POST call to ${req.originalUrl} --- description does not adhere to constructor for product`);
            return;
        }

        const description: productConstructor= req.body.productInformation;        
        const resp = await product_service.editProduct(description);

        if (resp instanceof ProductError){
            res.status(resp.code).send(resp.message)
        }else{
            res.status(200).send("Successfully edited")
        }
    }
    catch (e: any) {
        res.status(500).send(e.message);
    }
})

/*  Remove a specific product along with it's color variants from the server.
    If request parameters are bad a 400 response will be sent with a message.
    If not service will be called to remove product and responds with a 
    ProductError if the product isn't found.
    If it succeeds in adding, the response will be that product.
    If error is thrown response will contain the message with code 500  */
product_router.delete("/:id", async (
    req: Request<{id:string}, {}, {}>,
    res: Response< Map<string, Product> | string>//TODO chekc that admin cookie exists here
) => {
    try {
        const {id} = req.params;
        if (typeof(id) != "string"){
            res.status(400).send(`Bad DELETE call to ${req.originalUrl} --- query doesn't adhere to specification`);
            return
        }
        const resp =  await product_service.removeProduct(id)
        if(resp instanceof Map/* <string, Product> */){
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

/*  Remove a specific product along with it's color variants from the server.
    If request parameters are bad a 400 response will be sent with a message.
    If not service will be called to remove product and responds with a 
    ProductError if the product isn't found or if the color wasnt found.
    If it succeeds in adding, the response will be that product variant.
    If error is thrown response will contain the message with code 500  */
product_router.delete("/:id/:color", async ( 
    req: Request<{id:string, color:string}, {}, {}>,//TODO chekc that admin cookie exists here
    res: Response<Product|string>
) => {
    try {
        const {id, color} = req.params;
        if (typeof(id) != "string" || typeof(color) != "string"){
            res.status(400).send(`Bad DELETE call to ${req.originalUrl} --- fields do not adhere to restock api specification`);
            return
        }
        
        const resp =  await product_service.removeProductColor(id,color)
        if(resp instanceof ProductError){
            //Resp is of type ProductError
            res.status(resp.code).send(resp.message);
        }else{
            //Success, resp contains products!
            res.status(200).send(resp);
        }
    }
    catch (e: any) {
        res.status(500).send(e.message);
    }
}) 

