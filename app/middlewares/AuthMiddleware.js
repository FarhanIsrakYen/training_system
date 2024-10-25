import { TokenDecode } from "../utilities/tokenUtility.js";

export const Authenticate = (req, res, next) => {
    try {
        let token = req.cookies["token"];
        let decoded = TokenDecode(token)
        if (decoded == null) {
            return res.status(401).json({message: "Unauthorized user"})
        }
        else {
            let options = {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
                sameSite: "none",
                secure: true,
            };
            res.cookie("token", decoded.refreshToken, options);
            req.headers.email = decoded.email;
            req.headers.userId = decoded.userId;
            req.headers.role = decoded.role;
            next()
        }
    } catch (error) {
        console.error(error.toString());
        return res.status(401).json({message: "Unauthorized user"})
    }
}

export const Authorize = (role) => {
    return (req, res, next) => {
        if (req.headers.role !== role) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        next();
    };
}
