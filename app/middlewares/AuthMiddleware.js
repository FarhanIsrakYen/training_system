import { TokenDecode } from "../utilities/tokenUtility.js";

export const AuthenticateAndAuthorize = (requiredProfile = null) => {
    return (req, res, next) => {
        try {
            const token = req.cookies.token;
            if (!token) {
                return res.status(401).json({ message: "Unauthorized user" });
            }
            if (token !== req.headers.token) {
                return res.status(401).json({ message: "Unauthorized user" });
            }

            const decoded = TokenDecode(token);
            if (!decoded) {
                return res.status(401).json({ message: "Unauthorized user" });
            }

            req.headers.email = decoded.email;
            req.headers.userId = decoded.userId;
            req.headers.profile = decoded.profile;

            if (requiredProfile && req.headers.profile !== requiredProfile) {
                return res.status(401).json({ message: "Unauthorized user" });
            }

            next();
        } catch (error) {
            console.error("Error in AuthenticateAndAuthorize middleware:", error.toString());
            return res.status(401).json({ message: "Unauthorized user" });
        }
    };
};
