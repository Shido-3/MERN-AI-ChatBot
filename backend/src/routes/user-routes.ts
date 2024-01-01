import { Router } from "express";
import { getAllUsers, userLogin, userLogout, userSignup, verifyUser } from "../controllers/user-controllers.js";
import { loginValidator, signupValidator, validate } from "../utils/validators.js";
import { verifyToken } from "../utils/token-manager.js";
import { sendChatsToUser } from "../controllers/chat-controllers.js";

const userRoutes = Router();

userRoutes.get("/", getAllUsers); // When the api end point "api/v1/user" is called, the request will be transfered here and the "getAllUsers" controller-function will be called
userRoutes.post("/signup", validate(signupValidator), userSignup);// When the api end point "api/v1/user/signup" is called, the request will be transfered here and the "validate" middleware function will be called, followed by the "userSignup" controller-function
userRoutes.post("/login", validate(loginValidator), userLogin);// When the api end point "api/v1/user/login" is called, the request will be transfered here and the "validate" middleware function will be called, followed by the "userLogin" controller-function
userRoutes.get("/auth-status", verifyToken, verifyUser);
userRoutes.get("/logout", verifyToken, userLogout);

export default userRoutes;