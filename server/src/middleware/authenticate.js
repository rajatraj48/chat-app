
import jwt from "jsonwebtoken";
import { customError } from "./customError.js";

const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next(new customError("Token missing or malformed", 401, "AuthenticationError"));
    }

    const token = authHeader.split(" ")[1];
    console.log(token)
    // Verify JWT Token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    
    // Attach decoded user info to the request object
    req.user = decoded;
    
    next(); // Proceed to the next middleware
  } catch (error) {
    console.error("Authentication Error:", error);
    return next(new customError("Invalid or Expired Token", 401, "AuthenticationError"));
  }
};

export default authenticate;
