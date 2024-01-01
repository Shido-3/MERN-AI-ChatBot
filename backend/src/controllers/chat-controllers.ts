import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
import { configureOpenAI } from "../config/openai-config.js";
import OpenAI from "openai"; // 5th Change

export const generateChatCompletion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { message } = req.body;
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user)
      return res
        .status(401)
        .json({ message: "User not registered OR Token malfunctioned" });
    // grab chats of user
    const chats = user.chats.map(({ role, content }) => ({
      role,
      content,
    })) as OpenAI.Chat.CreateChatCompletionRequestMessage[]; // 1st Change
    chats.push({ content: message, role: "user" });
    user.chats.push({ content: message, role: "user" });

    // send all chats with new one to openAI API
    const config = configureOpenAI();
    //@ts-expect-error
    const openai = new OpenAI(config); // 2nd Change
    // get latest response
    const chatResponse = await openai.chat.completions.create({ // 3rd Change
      model: "gpt-3.5-turbo",
      messages: chats,
    });
    user.chats.push(chatResponse.choices[0].message); // 4th Change
    await user.save();
    return res.status(200).json({ chats: user.chats });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const sendChatsToUser = async ( // Alot of this is skeleton code of "verifyUser" from "user-controllers", this will check the user's cookies to make sure they are valid cookies
// And if they are logged in
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //user token check
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send("User not registered OR Token malfunctioned");
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match");
    }
    return res.status(200).json({ message: "OK", chats: user.chats });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};

export const deleteChats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //user token check
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send("User not registered OR Token malfunctioned");
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match");
    }
    //@ts-ignore
    user.chats = [];
    await user.save();
    return res.status(200).json({ message: "OK" });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};

/*

import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
import { configureOpenAI } from "../config/openai-config.js";
import OpenAIApi from "openai";
import ChatCompletionRequestMessage from "openai";
import { UNROTM } from "../utils/constants.js";

export const generateChatCompletion = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { message } = req.body; // Stores the message
    try {
        const user = await User.findById(res.locals.jwtData.id); // Finds if the user exists
        if (!user) {
            return res
                .status(401)
                    .json({ message: `${UNROTM}` })
        }
    
        // Grabs chats of User
        const chats = user.chats.map(({ role, content }) => ({ role, content })) as ChatCompletionRequestMessage[];
        /* 
        Creates a new temporary array, nothing about the original array has changed
        The User model has an array called chats, where all the user's chats are stored and each element in that array has an attribute called "role" and "content"
        * /
        chats.push({ role: "user", content: message }); // Pushes the new User message/chat onto the temporary array
        user.chats.push({ role: "user", content: message }); // Pushes the new User message/chat onto the actual array, to be stored in the database
    
        // Send all chats with new one to OpenAI API
        const config = configureOpenAI();
        const openai = new OpenAIApi(config);
        // Get latest response
        const chatResponse = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: chats,
        });
        user.chats.push(chatResponse.data.choices[0].message);
        await user.save(); // Saves the database
        return res.status(200).json({ chats: user.chats });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" }); // 500 is a server error
    }
};

*/