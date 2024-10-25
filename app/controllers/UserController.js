import {LogoutService, RegistrationService} from "../services/UserServices.js";


export const register = async(req, res) => {
    let result = await RegistrationService(req)
    return res.json(result);
}

export const logout = async(req, res) => {
    let result = await LogoutService(res)
    return res.status(result.statusCode).json({
        message: result.message
    })
}