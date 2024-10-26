import bcrypt from 'bcryptjs';
import { User } from "../models/usersModel.js";

export const RegistrationService = async(req) => {
    try {
        let { name, email, username, password, profile, skill } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            name: name,
            email: email,
            username: username,
            password: hashedPassword,
            profile: profile,
            skill: skill
        });
        return { statusCode: 200, message: "create success"}
    } catch (error) {
        console.error("Error occurred during register", error.toString());
        return { statusCode: 422, message: "Data cannot be processed" }
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