import { Router } from "express";
import { verifyToken } from "../utils/token-manager.js";
import { validate, chatCompletionValidator } from "../utils/validators.js";
import { deleteChats, generateChatCompletion, sendChatsToUser } from "../controllers/chat-controllers.js";

// Protected API
const chatRoutes = Router();

chatRoutes.post(
    "/new", 
    validate(chatCompletionValidator), // Checks if there is a message
    verifyToken, // If the token matches/exists
    generateChatCompletion // Only then will it make the API call to OpenAI
); // The chat function can only be accessed if you are logged in

chatRoutes.get( // To get all previous chat messages
    "/all-chats",
    verifyToken, // If the token matches/exists
    sendChatsToUser // Only then will it make the API call to OpenAI
); // The chat function can only be accessed if you are logged in

chatRoutes.delete("/delete", verifyToken, deleteChats);

export default chatRoutes;