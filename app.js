require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const AdminJS = require("adminjs");
const AdminJSExpress = require("@adminjs/express");
const AdminJSSequelize = require("@adminjs/sequelize");
const { sequelize } = require("./config/database");
const {
  User,
  Category,
  Product,
  Order,
  OrderItem,
  Setting,
} = require("./models");
const authRoutes = require("./routes/auth");

AdminJS.registerAdapter(AdminJSSequelize);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "eCommerce Admin API is running!" });
});

// Add your already implemented /api/auth routes that handle JWT login/signup
app.use("/api/auth", authRoutes);

const adminJs = new AdminJS({
  databases: [sequelize],
  rootPath: "/admin",
  resources: [User, Category, Product, Order, OrderItem, Setting],
});

// Middleware to check JWT and user role before allowing AdminJS access
const adminAuthMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).send("Unauthorized: No token provided");
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findByPk(decoded.userId);
    if (!user || user.role !== "admin") {
      return res.status(403).send("Forbidden: Insufficient privileges");
    }

    req.user = user; // Attach user info to request
    next();
  } catch (error) {
    return res.status(401).send("Invalid or expired token");
  }
};

// Build AdminJS router protected by JWT middleware
const adminRouter = AdminJSExpress.buildRouter(adminJs);
app.use(adminJs.options.rootPath, adminAuthMiddleware, adminRouter);

app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected and authenticated");
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(
      `AdminJS available at http://localhost:${PORT}${adminJs.options.rootPath}`
    );
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
});
