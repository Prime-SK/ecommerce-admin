const jwt = require("jsonwebtoken");
const { User } = require("../models");

const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({ message: "Access token required" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Admin access required" });
  }
};

// JWT middleware specifically for AdminJS
// This middleware validates JWT token and sets up currentAdmin for AdminJS context
const authenticateAdminJS = async (req, res, next) => {
  try {
    // Extract token from Authorization header
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({ 
        message: "Access token required. Please login at /api/auth/login to get a JWT token." 
      });
    }

    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Fetch user from database
    const user = await User.findByPk(decoded.userId, {
      attributes: ['id', 'name', 'email', 'role']
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Set currentAdmin in res.locals for AdminJS to use
    // AdminJS will pick this up for role-based access control
    res.locals.currentAdmin = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };

    // Also set req.user for compatibility
    req.user = user;

    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(403).json({ message: "Invalid token" });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(403).json({ message: "Token expired. Please login again." });
    }
    return res.status(403).json({ message: "Authentication failed" });
  }
};

module.exports = { authenticateToken, isAdmin, authenticateAdminJS };
