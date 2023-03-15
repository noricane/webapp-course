import { createConnection } from "mongoose";
require('dotenv').config();

console.log("CREATING CONNECTION:",process.env.DB_CONN);
export const conn = createConnection('mongodb+srv://gustarekch:p2W0qM9HprvBMhN2@zephyr-db.v2mp6j2.mongodb.net/?retryWrites=true&w=majority');