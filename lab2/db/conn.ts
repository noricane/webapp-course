import mongoose, { createConnection } from "mongoose";
require('dotenv').config();

const url =  process.env.DB_CONN || "xdxdxdxdxd"
console.log("CREATING CONNECTION:",url);
export const conn =   createConnection(url ,{})
conn.on('connected', () => console.log('connected'));
conn.on('open', () => console.log('open'));
conn.on('disconnected', () => console.log('disconnected'));
conn.on('reconnected', () => console.log('reconnected'));
conn.on('disconnecting', () => console.log('disconnecting'));
conn.on('close', () => console.log('close'));

//export const conn = createConnection(url ,{});