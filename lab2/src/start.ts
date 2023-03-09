import { admin_router } from './router/AdminRouter';
import { user_router } from './router/UserRouter';
import { product_router } from './router/ProductRouter';
/**
* Required External Modules
*/
require('dotenv').config()
import express from "express";
import cors from "cors";
import session from "express-session";

/**
* App Variables
*/
export const app = express();
/**
* App Configuration
*/

app.use(session({
secret : process.env.SESSION_KEY as string, //
resave : false, //Whether or not state is saved everytime? or whenever session is modified
saveUninitialized : true //Decides wherther a blank session is saved or if it waits until the user writes something to the session object
}));
app.use(cors({
origin: true, //Allows requests from any origin, not good for production
credentials : true //Specifies if express should include session id in every response, if this is true then origin property must be specified. 
}));
app.use(express.json());
app.use("/product", product_router);
app.use("/user", user_router);
app.use("/7b2e9f54cdff413fcde01f330af6896c3cd7e6cd", admin_router);
//app.use("/product", user_router);