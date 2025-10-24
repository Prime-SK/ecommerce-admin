require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { default: AdminJS } = require("adminjs");
const AdminJSExpress = require("@adminjs/express");
const  AdminJSSequelize = require("@adminjs/sequelize");
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

// Register the Sequelize adapter
AdminJS.registerAdapter({
  Resource: AdminJSSequelize.Resource,
  Database: AdminJSSequelize.Database,
});

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.json({ message: "eCommerce Admin API is running!" });
});

const adminJs = new AdminJS({
  databases: [sequelize],
  rootPath: "/admin",
  resources: [
    {
      resource: User,
      options: {
        // Hide password field from all views
        properties: {
          password: {
            isVisible: false,
          },
        },
        // Role-based access control
        listProperties: ['id', 'name', 'email', 'role', 'createdAt'],
        showProperties: ['id', 'name', 'email', 'role', 'createdAt', 'updatedAt'],
        editProperties: ['name', 'email', 'role'],
        filterProperties: ['name', 'email', 'role'],
        // Only admins can see Users table
        isAccessible: (context) => {
          return context.currentAdmin && context.currentAdmin.role === 'admin';
        },
        isVisible: (context) => {
          return context.currentAdmin && context.currentAdmin.role === 'admin';
        },
      },
    },
    {
      resource: Category,
      options: {
        // Admins can see all, regular users can see categories
        isAccessible: (context) => {
          return context.currentAdmin;
        },
        isVisible: (context) => {
          return context.currentAdmin;
        },
      },
    },
    {
      resource: Product,
      options: {
        // Show category relationship
        listProperties: ['id', 'name', 'price', 'stock', 'categoryId', 'createdAt'],
        showProperties: ['id', 'name', 'description', 'price', 'stock', 'categoryId', 'createdAt', 'updatedAt'],
        // Admins can see all, regular users can see products
        isAccessible: (context) => {
          return context.currentAdmin;
        },
        isVisible: (context) => {
          return context.currentAdmin;
        },
      },
    },
    {
      resource: Order,
      options: {
        // Show user relationship
        listProperties: ['id', 'userId', 'totalAmount', 'status', 'createdAt'],
        showProperties: ['id', 'userId', 'totalAmount', 'status', 'createdAt', 'updatedAt'],
        // Admins can see all orders, regular users can only see their own
        isAccessible: (context) => {
          if (!context.currentAdmin) return false;
          if (context.currentAdmin.role === 'admin') return true;
          // For regular users, only show their own orders
          return context.record && context.record.userId === context.currentAdmin.id;
        },
        isVisible: (context) => {
          return context.currentAdmin;
        },
      },
    },
    {
      resource: OrderItem,
      options: {
        // Show relationships
        listProperties: ['id', 'orderId', 'productId', 'quantity', 'price', 'createdAt'],
        showProperties: ['id', 'orderId', 'productId', 'quantity', 'price', 'createdAt', 'updatedAt'],
        // Admins can see all, regular users can see their order items
        isAccessible: (context) => {
          if (!context.currentAdmin) return false;
          if (context.currentAdmin.role === 'admin') return true;
          // For regular users, only show items from their orders
          return context.record && context.record.order && context.record.order.userId === context.currentAdmin.id;
        },
        isVisible: (context) => {
          return context.currentAdmin;
        },
      },
    },
    {
      resource: Setting,
      options: {
        // Only admins can see Settings
        isAccessible: (context) => {
          return context.currentAdmin && context.currentAdmin.role === 'admin';
        },
        isVisible: (context) => {
          return context.currentAdmin && context.currentAdmin.role === 'admin';
        },
      },
    },
  ],
  branding: {
    companyName: 'eCommerce Admin',
    logo: false,
    softwareBrothers: false,
  },
});

// AdminJS authentication configuration
const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
  adminJs,
  {
    authenticate: async (email, password) => {
      try {
        // Find user by email
        const user = await User.findOne({ where: { email } });
        
        if (!user) {
          return null;
        }

        // Verify password
        const isPasswordValid = await user.comparePassword(password);
        
        if (!isPasswordValid) {
          return null;
        }

        // Return user object (AdminJS will store this in session)
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      } catch (error) {
        console.error('Authentication error:', error);
        return null;
      }
    },
    cookiePassword: process.env.COOKIE_SECRET || 'some-secret-password-used-to-secure-cookie',
  },
  null,
  {
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET || 'some-secret-password-used-to-secure-session',
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    },
  }
);

app.use(adminJs.options.rootPath, adminRouter);

// Move body-parser middleware AFTER AdminJS router
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Add your already implemented /api/auth routes that handle JWT login/signup
app.use("/api/auth", authRoutes);

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
