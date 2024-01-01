import { NextFunction, Request, Response } from "express";
import { ValidationChain, body, validationResult } from "express-validator";

export const validate = (validations: ValidationChain[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      for (let validation of validations) {
        const result = await validation.run(req);
        if (!result.isEmpty()) {
          break;
        }
      }
      const errors = validationResult(req);
      if (errors.isEmpty()) {
        return next();
      }
      return res.status(422).json({ errors: errors.array() });
    };
};

/*
export const validate = (validations: ValidationChain[]) => {
    console.log("We are here");
    return async (req: Request, res: Response, next: NextFunction) => {
        for (let validation of validations) { // The loop verifies all the conditions of the signupValidator, so the "notEmpty()", the "isEmail()" and the "isLength()"
            const result = await validation.run(req); // Stores the result of the verification
            if (!result.isEmpty()) { // If the result is not empty, meaning an error has been returned
                console.log("Number 1 - Validator");
                break; // It will automatically exit and break the loop
            };
        };
        const errors = validationResult(req); // Will give detailed information/properties of the error(s)
        if (errors.isEmpty()) { // If there are no errors
            console.log("Number 2 - Validator");
            return next(); // Move on to the next middleware
        };
        console.log("Number 3 - Validator");
        return res.status(422).json({ errors: errors.array() }); // 422 means data can not be processed further
    }; // Returns the error(s) in an array
};
*/

export const loginValidator = [
    body("email").trim().isEmail().withMessage("Email is required"),
    body("password")
      .trim()
      .isLength({ min: 6 })
      .withMessage("Password should contain atleast 6 characters"),
];

/*
export const loginValidator = [ // This is the ValidationChain
    body("email").trim().isEmail().withMessage("Email is required"), // "trim" trims any leading backspace or trailing characters, "isEmail" verifies that the email is actually an email
    body("password").trim().isLength({ min: 6 }).withMessage("Password should contain atleast 6 characters") // "isLength" ensures the password must meet a certain length
];
*/

export const signupValidator = [ // This is the ValidationChain
    body("name").notEmpty().withMessage("Name is required"), // "notEmpty" requires the name field to be filled, if it is not "Name is required" is displayed
    ...loginValidator // This line of code will just extend loginValidator so it can be used in the body of signupValidator 
];

export const chatCompletionValidator = [
    body("message").notEmpty().withMessage("Message is required")
];