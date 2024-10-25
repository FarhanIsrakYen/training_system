import {LoginService} from "../services/AuthServices.js";


export const login = async(req, res) => {
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