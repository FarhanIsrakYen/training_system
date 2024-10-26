import { body } from "express-validator";

export const validateLogin = [
    body("email").isEmail().withMessage("email is required"),
    body("password").notEmpty().withMessage("password is required"),
];

export const validateCreateUser = [
    body("name").notEmpty().withMessage("name is required"),
    body("email").isEmail().withMessage("valid email is required"),
    body("username").notEmpty().withMessage("username is required"),
    body("password").notEmpty().withMessage("password is required"),
    body("profile").notEmpty().withMessage("profile is required"),
];
