import { product_router } from './router/ProductRouter';
import express from "express";


export const app = express();

app.use(express.json());
app.use("/product", product_router);