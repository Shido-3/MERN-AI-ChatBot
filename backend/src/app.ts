// Entry point for our backend application

/* 
Middlewares are functions that handle the req, res and the next functions.
Middlewares are functions which get executed BEFORE a request is processed.
Middlewares can be used to verify data.
app.use(), app.get(), app.post() are examples of middleware functions
app.use() is used to define a middleware
"next" moves onto the next middleware functions
*/

import express from "express";
import { config } from "dotenv"; // Allows us to use ".env" variables
import morgan from "morgan";
import appRouter from "./routes/index.js";
import cookieParser from "cookie-parser";
import cors from "cors"; // Makes it so that you are able to whitelist certain ports, in our case, we are able to connect from the backend(port: 3000) to the frontend (port: 5173)

config(); //Runs the config file

const app = express();

//middlewares
app.use(cors({ origin: "http://localhost:5173", credentials: true })); // We are now able to connect to the frontend of our project
app.use(express.json()); // Parses JSON data and makes it available in the request.body
app.use(cookieParser(process.env.COOKIE_SECRET)); // Used to send cookies from the backend to the frontend

//remove it in production
app.use(morgan("dev")); // Provides detailed logs when HTTP requests are called

app.use("/api/v1", appRouter); //When the api end point "/api/v1" is called, the request will be transfered to appRouter which is stored in "index.ts" under "routes"

export default app;