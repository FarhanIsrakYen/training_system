import { validationResult } from "express-validator";
import { validateLogin } from "../requests/userRequests.js";
import { LoginService } from "../services/AuthServices.js";


export const login = async(req, res) => {
    await Promise.all(validateLogin.map(validation => validation.run(req)));
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(401).json({ message: "wrong input", errors: errors.array() });
    }

    let result = await LoginService(req, res)
    if (result.statusCode === 200) {
        return res.status(result.statusCode).json({
            token: result.token,
            profile: result.profile,
        })
    }
    return res.status(result.statusCode).json({
        message: result.message
    })
}