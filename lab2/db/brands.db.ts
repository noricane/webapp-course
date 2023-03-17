import { Schema, Model } from "mongoose";
import { conn } from "./conn";

//Simple newsletter schema to hold a list of emails
const brandSchema: Schema = new Schema({
  normalizedName: { type: String, unique: true, required: true },
  name: { type: String, unique: true, required: true },
});

export const brandModel = conn.model<String>("Brand", brandSchema);
