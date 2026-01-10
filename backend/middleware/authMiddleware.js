import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";
import Principal from "../models/principal.js";
import Staff from "../models/Staff.js";

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");

      // Determine which model to use based on role
      let user;
      if (decoded.role === "Admin") {
        user = await Admin.findById(decoded.id).select("-password");
      } else if (decoded.role === "Principal") {
        user = await Principal.findById(decoded.id).select("-password");
      } else if (decoded.role === "Staff") {
        user = await Staff.findById(decoded.id).select("-password");
      }

      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      // Active checks
      if (decoded.role === "Principal" && user.isActive === false) {
        return res.status(403).json({ message: "Account is not active." });
      }
      if (decoded.role === "Staff" && user.status && user.status !== "Active") {
        return res.status(403).json({ message: "Account is not active." });
      }

      // Attach user and role to req
      req.user = user;
      req.user.role = decoded.role; // Ensure role is explicit
      
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: `User role ${req.user.role} is not authorized to access this route`,
      });
    }
    next();
  };
};
