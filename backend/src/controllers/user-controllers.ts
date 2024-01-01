/* 
A controller is a module or a set of functions that handle the application logic for a specific route
They seperate HTTP requests and defining the application's business logic
*/

import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
import { hash, compare } from "bcrypt"; // Used for encrypting the user's password - we are unable to decrypt the user's password so we just use "compare" to compare the password to the actual string
import { createToken } from "../utils/token-manager.js";
import { COOKIE_NAME } from "../utils/constants.js";

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try { // The try and catch block catches the "await" result
        const users = await User.find(); // Await pauses the execution of the rest of the function unitl a promise is settled(resolved or rejected), can only be used in functions that are async
        return res.status(200).json({ message: "OK", users }); // status(200) is not mandatory
    } catch (error) {
        console.log(error);
        return res.status(404).json({ message: "ERROR", cause: error.message});
    }
};

export const userSignup = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email }); // This checks if a user with the email is already registered or not
        if (existingUser) return res.status(401).send("User already registered"); // If a user is already registered with the email, returns a "401" status code (Unauthorized) and a message
        const hashedPassword = await hash(password, 10); // The second parameter is "saltOrRounds" the more rounds you provide the more encrypted the password becomes
        const user = new User({ name, email, password: hashedPassword}); // Creates a new "User" instance, in mongoDB's case a new document - This creates a new user
        await user.save(); // Saves the new user to the database

        // create token and store cookie

        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            domain: "localhost",
            signed: true,
            path: "/"
        });

        const token = createToken(user._id.toString(), user.email, "7d");
        const expires = new Date(); // Grabs the current date and time
        expires.setDate(expires.getDate() + 7); // Cookie is set to expire 7 days from when it is intially created
        res.cookie(COOKIE_NAME, token, { // Name of cookie is "auth_token"
            path: "/", // Where the cookie is stored
            domain: "localhost",
            expires, // When the cookie is set to expire
            httpOnly: true,
            signed: true
        });

        return res.status(201).json({ message: "OK", name: user.name, email: user.email });
    } catch (error) {
        console.log(error);
        return res.status(404).json({ message: "ERROR", cause: error.message});
    }
};

export const userLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }); // Returns a user object if an email matches, returns NULL if no user matches the email
        if (!user) {
            return res.status(401).send("User not registered");
        }
        const isPasswordCorrect = await compare(password, user.password); // Compares the entered password to the password string associated with the user stored in the database 
        // Returns a True or False boolean
        if (!isPasswordCorrect) {
            return res.status(403).send("Incorrect Password"); // "403" error code means forbidden
        };

        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            domain: "localhost",
            signed: true,
            path: "/"
        });

        const token = createToken(user._id.toString(), user.email, "7d");
        const expires = new Date(); // Grabs the current date and time
        expires.setDate(expires.getDate() + 7); // Cookie is set to expire 7 days from when it is intially created
        res.cookie(COOKIE_NAME, token, { // Name of cookie is "auth_token"
            path: "/", // Where the cookie is stored
            domain: "localhost",
            expires, // When the cookie is set to expire
            httpOnly: true,
            signed: true
        });
        return res.status(200).json({ message: "OK", name: user.name, email: user.email }); // status(200) is not mandatory
    } catch (error) {
        console.log(error);
        return res.status(404).json({ message: "ERROR", cause: error.message});
    }
};

export const verifyUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await User.findById(res.locals.jwtData.id); // Returns a user object if a ID matches, returns NULL if no ID is matched
        if (!user) {
            return res.status(401).send("User not registered OR Token malfunctioned");
        }
        if (user._id.toString() !== res.locals.jwtData.id) { // If the IDs do not match
            return res.status(401).send("Permissions didn't match");
        }
        return res.status(200).json({ message: "OK", name: user.name, email: user.email }); // status(200) is not mandatory
    } catch (error) {
        console.log(error);
        return res.status(404).json({ message: "ERROR", cause: error.message});
    }
};

export const userLogout = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await User.findById(res.locals.jwtData.id); // Returns a user object if a ID matches, returns NULL if no ID is matched
        if (!user) {
            return res.status(401).send("User not registered OR Token malfunctioned");
        }
        if (user._id.toString() !== res.locals.jwtData.id) { // If the IDs do not match
            return res.status(401).send("Permissions didn't match");
        }
        res.clearCookie(COOKIE_NAME, { // Clears cookies to log user out, frontend cannot clear HTTP only cookies only backend can
            httpOnly: true,
            domain: "localhost",
            signed: true,
            path: "/"
        });
        return res.status(200).json({ message: "OK", name: user.name, email: user.email }); // status(200) is not mandatory
    } catch (error) {
        console.log(error);
        return res.status(404).json({ message: "ERROR", cause: error.message});
    }
};