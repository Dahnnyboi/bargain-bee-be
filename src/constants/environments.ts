import dotenv from "dotenv";

dotenv.config();

export const ENVIRONMENT = process.env.NODE_ENV;
export const DATABASE_HOST = process.env.DATABASE_HOST;
export const DATABASE_NAME = process.env.DATABASE_NAME;
export const DATABASE_USER = process.env.DATABASE_USER;
export const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;
export const PORT = parseInt(process.env.PORT || "");
export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_EXPIRES = process.env.JWT_EXPIRES;
