import { Schema, Model } from "mongoose";
import { conn } from "./conn";

//Simple newsletter schema to hold a list of emails
const newsLetterSchema: Schema = new Schema({
  email: { type: String, unique: true, required: true },
});

export const newsletterModel = conn.model<String>("Newsletter Email", newsLetterSchema);
