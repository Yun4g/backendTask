import jwt from "jsonwebtoken";

const AuthMiddleWare = (req, res, next) => {
  if (req.path === "/api/auth/login" || req.path === "/api/auth/register" ||  req.path.startsWith("/api-docs")  ) {
    return next();
  }

  try {
    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).json({ message: "Token is not valid or missing" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default AuthMiddleWare;
