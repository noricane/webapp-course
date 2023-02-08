import express, { Request, Response } from "express";
import { makeProductService } from "../service/ProductService";
import { Product } from "../model/product";

const product_service = makeProductService();

export const product_router = express.Router();


