import { Secret } from "jsonwebtoken";

declare namespace NodeJS{
    export interface ProcessEnv{
        PORT:string;
        MONGO_URI:string;
        JWT_SECRET:Secret;
        CLOUDINARY_CLOUD_NAME:string;
        CLOUDINARY_API_KEY:string;
        CLOUDINARY_API_SECRET:string;
    }
}