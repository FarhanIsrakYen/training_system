import { validationResult } from "express-validator";
import { validateCreateUser } from "../requests/userRequests.js";
import { LogoutService, RegistrationService } from "../services/UserServices.js";


export const register = async(req, res) => {
    await Promise.all(validateCreateUser.map(validation => validation.run(req)));
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ message: "data cannot be processed", errors: errors.array() });
    }

    let result = await RegistrationService(req)
    return res.status(result.statusCode).json({
        message: result.message
    })
}

export const logout = async(req, res) => {
    let result = await LogoutService(res)
    return res.status(result.statusCode).json({
        message: result.message
    })
}