import { admin_router } from './router/AdminRouter';
import { user_router } from './router/UserRouter';
import { product_router } from './router/ProductRouter';
/**
* Required External Modules
*/
import express from "express";
import cors from "cors";
/**
* App Variables
*/
export const app = express();
/**
* App Configuration
*/
app.use(express.json());
app.use(cors());
app.use("/product", product_router);
app.use("/user", user_router);
app.use("/7b2e9f54cdff413fcde01f330af6896c3cd7e6cd", admin_router);
//app.use("/product", user_router);