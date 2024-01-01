import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { COOKIE_NAME } from "./constants.js";

export const createToken = (id: string, email: string, expiresIn: string) => { // "expiresIn" makes it so that the token expires after a set time
    const payload = { id, email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn}); // payload is the data you want to encrypt, the second parameter is a secret key, it is used to sign the token. It is also used to verify the token
    return token;
};

export const verifyToken = async (
    req: Request, 
    res: Response, 
    next: NextFunction
) => {
    const token = req.signedCookies[`${COOKIE_NAME}`];
    if (!token || token.trim() === "") { // If token is not received
        return res.status(401).json({ message: "Token Not Received" });
    }
    return new Promise<void>((resolve, reject) => { // Verifies that the token is valid
        return jwt.verify(token, process.env.JWT_SECRET, (err, success) => {
            if (err) {
                reject(err.message); // Displays the error message
                return res.status(401).json({message: "Token Expired"});
            } else {
                resolve();
                res.locals.jwtData = success; // You are able to pass local variables with express to the "NextFunction"
                return next(); // Onto to the next middleware!
            }
        });
    });
};