import express from "express";
import { product_router } from './router/ProductRouter';


export const app = express();

app.use(express.json());
app.use("/product", product_router);