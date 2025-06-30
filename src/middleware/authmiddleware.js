import jwt from "jsonwebtoken";

 const AuthMiddleWare = async (res, req, next) => {

    if(req.path === "/api/auth/login" || req.path === "/api/auth/register") {
        return next();
    }

    try {
        const token = req?.cookies?.token
        if (!token) {
            return res.status(401).json({ message: "token is not valid" })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next();
    } catch (error) {
        return res.status(401).json({message : "invalid token"})
    }


}

export default AuthMiddleWare;