const express = require("express");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const router = express.Router();

// SSO endpoint - converts JWT token to AdminJS session
router.post("/admin-sso", async (req, res) => {
  try {
    // Get token from body or header
    const token = req.body.token || (req.headers.authorization && req.headers.authorization.split(" ")[1]);

    if (!token) {
      return res.status(401).json({ 
        success: false,
        message: "No token provided" 
      });
    }

    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Fetch user from database
    const user = await User.findByPk(decoded.userId, {
      attributes: ['id', 'name', 'email', 'role']
    });

    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: "User not found" 
      });
    }

    // Store user in session (AdminJS will use this)
    // AdminJS stores authenticated user in req.session.adminUser
    // BUT it looks for it as currentAdmin in the context
    // So we need to set it in the same way buildAuthenticatedRouter does
    req.session.adminUser = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };

    // CRITICAL: Save session and wait for it to complete
    await new Promise((resolve, reject) => {
      req.session.save((err) => {
        if (err) {
          console.error("Session save error:", err);
          reject(err);
        } else {
          resolve();
        }
      });
    });

    console.log("✅ Session created successfully for:", user.email);
    console.log("Session data:", req.session);
    
    res.json({ 
      success: true, 
      message: "Authentication successful",
      redirectTo: "/admin"
    });

  } catch (error) {
    console.error("SSO error:", error);
    if (error.name === 'JsonWebTokenError') {
      return res.status(403).json({ 
        success: false,
        message: "Invalid token" 
      });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(403).json({ 
        success: false,
        message: "Token expired" 
      });
    }
    return res.status(500).json({ 
      success: false,
      message: "Authentication failed" 
    });
  }
});

// Logout endpoint - destroys AdminJS session
router.post("/logout", async (req, res) => {
  try {
    if (req.session) {
      req.session.destroy((err) => {
        if (err) {
          console.error("Session destroy error:", err);
          return res.status(500).json({ 
            success: false,
            message: "Failed to logout" 
          });
        }
        
        // Clear the session cookie
        res.clearCookie('adminjs', { path: '/' });
        
        console.log("✅ Session destroyed successfully");
        res.json({ 
          success: true, 
          message: "Logged out successfully" 
        });
      });
    } else {
      // Clear cookie even if no session
      res.clearCookie('adminjs', { path: '/' });
      res.json({ 
        success: true, 
        message: "No active session" 
      });
    }
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ 
      success: false,
      message: "Logout failed" 
    });
  }
});

module.exports = router;
