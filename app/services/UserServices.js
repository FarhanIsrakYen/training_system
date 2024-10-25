import {User} from "../models/usersModel.js";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import {JWT_KEY} from "../configs/config.js";

export const RegistrationService = async(req) => {
    try {
        let {email, password, firstname, lastname, institution, className, section, roll} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        User.create({
            email: email,
            password: hashedPassword,
            firstname: firstname,
            lastname: lastname,
            institution: institution,
            className: className,
            section: section,
            roll: roll
        });
        return {message: 'Registered successfully'}
    } catch (error) {
        return {message: error.toString()}
    }
}

export const LogoutService = async(res) => {
    try {
        res.clearCookie('token');
        return { statusCode: 200, message: "logout success" };
    } catch (error) {
        console.error(error)
        return { error: error.toString() };
    }
}