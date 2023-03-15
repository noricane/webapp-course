import { createConnection } from "mongoose";
require('dotenv').config();

console.log("CREATING CONNECTION:",process.env.DB_CONN);
export const conn = createConnection(process.env.DB_CONN as string);