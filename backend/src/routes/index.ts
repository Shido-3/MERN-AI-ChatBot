// This is where all the url routes are stored

import { Router } from "express";
import userRoutes from "./user-routes.js";
import chatRoutes from "./chat-routes.js";

const appRouter = Router();

appRouter.use("/user", userRoutes); // When the api end point "api/v1/user" is called, the request will be transfered to "userRoutes"
appRouter.use("/chat", chatRoutes); // When the api end point "api/v1/chat" is called, the request will be transfered to "chatRoutes"

export default appRouter;