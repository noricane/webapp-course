import { product_router } from "./router/ProductRouter";


const express = require('express')
export const app = express();

app.use(express.json());
app.use("/product", product_router);
