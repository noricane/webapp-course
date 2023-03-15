import { addressType } from './../model/adress';
import { ProductError } from './../service/UserService';
import { hashize, isMultiProducts } from './../helper/utils';
import { PastOrder, multiProduct } from './../model/pastorder';
import express, { Request, Response } from "express";
import { User } from "../model/user";
import { makeUserService } from '../service/UserService';
import { isUser } from '../helper/utils';
import { product_service } from './ProductRouter';

export const user_router = express.Router();

export const user_service = makeUserService(product_service);


export type UserRequest = Request & {
    body :{
        username:string, 
        password:string
    }
    session : {
        user ?: User
    }
}

/* Adds new mail to newsletter if request is valid */
user_router.post("/newsletter", async (
    req: UserRequest&{body:{email:string}},
    res: Response< string>
) => {
    try {
        const { email } = req.body
        if(typeof email != "string"){
            res.status(400).send("Bad request, email is not valid");
        }
        
        const resp = user_service.addNewsLetterMail(email)
        console.log("email",resp);
        if (resp == true){
            
            res.status(200).send("Sucessfully added mail");
            
        }
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});


/* Log in route, 
    if request isn't successful (and no error being thrown) it returns ProductError code and status , 
    else sets client side cookie and sends success response,
    if any error is thrown the catch will send it's own response */
user_router.post("/login", async (
    req: UserRequest,
    res: Response< User | string>
) => {
    try {
        console.log("logging in");
        
        const { email,password } = req.body
        if(email == null || password == null || typeof(email)  != "string" || typeof(password)  != "string"){
            res.status(400).send("Bad GET request, login details must adhere to specification");
            return
        }


        const resp = await user_service.logInUser(email,password);
        if(resp instanceof ProductError){
            //Error
            res.status(resp.code).send(resp.message);
        }else{
            //Success, resp is the requested user!            

            res.status(200).send(resp);
        }
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

/* Registers user
    if query is invalid a response is sent with code 400 and message
    else service is called to add user and responds with a producterror if user(email) exists
    otherwise it responds with user object.
    if any error is thrown the catch will send it's own response
    */
user_router.post("/register", async (
    req: Request<{}, {}, {user:any}>,
    res: Response< User | string>
) => {
    try {
        const { user } = req.body
        if(user == null ||  !isUser(user)){
            res.status(400).send("Bad GET request, user properties must adhere to specification");
            return
        }
        const resp = await user_service.addUser(Date.now(),user.name,user.email,hashize(user.password),user.phonenumber,user.birthdate,[{id:Date.now(),addressType:addressType.DELIVERY,street:user.street,city:user.city,country:user.country,zip:user.zip}]);
        
        if(resp instanceof ProductError){
            //Resp is of type ProductError
            res.status(resp.code).send(resp.message);
        }else{
            //Success, resp is the registered user!            
            res.status(200).send(JSON.stringify(resp));
        }
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});





/* Adds user order
    if query is invalid a response is sent with code 400 and message
    else service is called to add a user's order and responds with a producterror if user(email) doesn't exist
    otherwise it responds with a processed list of multiProducts if order was unsuccessful and a PastOrder if successful.
    if any error is thrown the catch will send it's own response
    */
user_router.post("/order", async (
    req: Request & {body:{items:multiProduct[]}, session: {user?: User}},
    res: Response< PastOrder | multiProduct[] | string>
) => {
    try {
        const { items,id } = req.body
  
        if(items == null || !Array.isArray(items) || !isMultiProducts(items)){
            res.status(400).send("Bad GET request, orders must adhere to specification");
            return
        }
        
        const resp = await user_service.addUserOrder(id,...items);
        if(resp instanceof ProductError){
            //Resp is of type ProductError
            res.status(resp.code).send(resp.message);
        }else if(resp.items != null && (resp as PastOrder).id != null){
            res.status(200).send(resp as PastOrder);
        }else{
            //I'd rather not have to send a 200 since it technically isn't accepted
            res.status(200).send(resp.items);  
        }
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

/* 
    Get user, if request is bad, response 400 with message
    if user doesn't exist, response is a ProductError
    else, set cookie to user and respond with user object
*/
user_router.get("/:id", async (
    req: Request<{id:string}, {}, {}>,
    res: Response< User | string>
) => {
    try {
        const { id } = req.params
        if(id == null || typeof(id) != "string"){
            res.status(400).send("Bad GET request, id must be of type string");
            return
        }
        const resp = await user_service.getUser(id);
        
        if(resp instanceof ProductError){
            //Resp is of type ProductError
            res.status(resp.code).send(resp.message);
        }else{
            //Success, resp is the requested user!           
            res.cookie('user',JSON.stringify(resp)) 
            res.status(200).send(resp);
        }
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});


/* 
     Delete user, if request is bad, response 400 with message
    if user doesn't exist, response is a ProductError
    else, respond with user object
 */
user_router.delete("/:id", async (
    req: Request & {params:{id:string},session: {user?: User}},
    res: Response< User | string>
) => {
    try {
        const { id } = req.params
        const { user } = req.body
        if(id == null || typeof(id) != "string" || user == null){
            res.status(400).send("Bad GET request, id must be of type string and user must be logged in");
            return
        }
        const resp = await user_service.removeUser(id);
        if(resp instanceof ProductError){
            //Resp is of type ProductError
            res.status(resp.code).send(resp.message);
        }else{
            //Success, resp is the requested user!            
            res.status(200).send(resp);
        }
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});



