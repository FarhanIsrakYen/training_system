import jwt from "jsonwebtoken";
import { JWT_EXPIRE_TIME, JWT_KEY } from "../configs/config.js";

export const TokenEncode = (email, password, userId, profile) => {
    const PAYLOAD = {email: email, password:password, userId:userId, profile: profile}
    return jwt.sign(PAYLOAD, JWT_KEY, { expiresIn: JWT_EXPIRE_TIME })
}

export const TokenDecode = (token) => {
    try {
        let decoded = jwt.verify(token, JWT_KEY);
        if (!!decoded.email === true) {
            let refreshToken = jwt.sign({ email: decoded.email }, JWT_KEY, { expiresIn: JWT_EXPIRE_TIME })
            return { refreshToken, email: decoded.email, userId: decoded.userId, profile: decoded.profile };
        }
    } catch (error) {
        return null
    }
}