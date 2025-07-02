import dotnev from "dotenv";

dotnev.config();

export const isDev = process.env.NODE_ENV !== "production";

export const config = {
   PORT: process.env.PORT || 3000,
   MONGO_LOCAL_URI: process.env.MONGO_LOCAL_URI, 
   MONGO_ATLAS_URI: process.env.MONGO_ATLAS_URI,
}