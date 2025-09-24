import jwt from "jsonwebtoken";
import config from "../config.js"; // add .js if you’re using ES Modules

function adminMiddleware(req, res, next) {
  const authHeader = req.headers.authorization; // ✅

  if (!authHeader || !authHeader.startsWith("Bearer ")) { // ✅ 
    return res.status(401).json({ error: "No Token Provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, config.JWT_ADMIN_PASSWORD);
    req.adminId = decoded.id;
    next();
  } catch (error) {
    console.error("Invalid token:", error.message); // ✅ log before returning
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

export default adminMiddleware;
