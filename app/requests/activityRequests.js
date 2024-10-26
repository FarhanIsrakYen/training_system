import { body } from "express-validator";

export const validateRegisterActivity = [
    body("skill").notEmpty().withMessage("skill is required"),
    body("title").notEmpty().withMessage("title is required"),
    body("description").notEmpty().withMessage("description is required"),
    body("startdate").isISO8601().toDate().withMessage("valid start date is required"),
    body("enddate").isISO8601().toDate().withMessage("valid end date is required"),
    body("participants").isArray().withMessage("participants must be an array"),
];