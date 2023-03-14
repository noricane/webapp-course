import { Admin } from "./../src/model/admin";
import { Schema, Model } from "mongoose";

import { conn } from "./conn";

const newsLetterSchema: Schema = new Schema({
  email: { type: String, unique: true, required: true },
});

export const newsletterModel = conn.model<String>("Newsletter Email", newsLetterSchema);
