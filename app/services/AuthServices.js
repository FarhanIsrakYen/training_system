import {User} from "../models/usersModel.js";
import bcrypt from 'bcryptjs';
import {TokenEncode} from "../utilities/tokenUtility.js";
import {JWT_EXPIRE_TIME} from "../configs/config.js";


export const LoginService = async(req, res) => {
    try {
        let {email, password} = req.body;
        const user = await User.findOne({email: email});
        if (!user) {
            return {statusCode: 401, message: "Invalid login"};
        }
        const matchPassword = await bcrypt.compare(password, user.password)
        if (!matchPassword) {
            return {statusCode: 401, message: "Invalid login"};
        }

        let options = {
            maxAge: JWT_EXPIRE_TIME,
            httpOnly: true,
            sameSite: "none",
            secure: true,
        };
        let token = TokenEncode(user.email, user.password, user._id, user.profile)
        res.cookie("token", token, options);
        return {statusCode: 200, token: token, profile: user.profile};
    } catch (error) {
        console.error('Error occurred during login', error.toString());
        return {statusCode: 401, message: "Invalid login"};
    }
}