import { product_router } from './router/ProductRouter';
/**
* Required External Modules
*/

 
import express from "express";



/**
* App Variables
*/



export const app = express();


/**
* App Configuration
*/


app.use(express.json());
app.use("/product", product_router);