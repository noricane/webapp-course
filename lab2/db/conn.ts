import { createConnection } from "mongoose";
require('dotenv').config();

const url =  process.env.DB_CONN || "xdxdxdxdxd"
console.log("CREATING CONNECTION:",url);
export const conn = createConnection(url ,{});