require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { default: AdminJS } = require("adminjs");
const AdminJSExpress = require("@adminjs/express");
const AdminJSSequelize = require("@adminjs/sequelize");
const { ComponentLoader } = require("adminjs");
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
const adminSSORoutes = require("./routes/admin-sso");
const { authenticateAdminJS } = require("./middleware/auth");

// Register the Sequelize adapter
AdminJS.registerAdapter({
  Resource: AdminJSSequelize.Resource,
  Database: AdminJSSequelize.Database,
});

const app = express();
const PORT = process.env.PORT || 3000;

// Dashboard handler - Role-based data
const dashboardHandler = async (request, response, context) => {
  const { currentAdmin } = context;
  
  // Debug logging
  console.log("=== Dashboard Handler ===");
  console.log("currentAdmin:", currentAdmin);
  console.log("session.adminUser:", request?.session?.adminUser);
  console.log("session ID:", request?.session?.id);
  
  if (!currentAdmin) {
    console.warn("⚠️ No currentAdmin found in dashboard handler");
    return { 
      user: null, 
      isAdmin: false,
      stats: { totalUsers: 0, totalOrders: 0, totalProducts: 0, totalRevenue: 0 }
    };
  }

  const user = currentAdmin;

  // ADMIN DASHBOARD - System Statistics
  if (user.role === 'admin') {
    const totalUsers = await User.count();
    const totalOrders = await Order.count();
    const totalProducts = await Product.count();
    const totalCategories = await Category.count();
    const totalRevenue = await Order.sum('totalAmount') || 0;

    console.log("✅ Admin dashboard - returning stats");
    return {
      stats: {
        totalUsers,
        totalOrders,
        totalProducts,
        totalCategories,
        totalRevenue,
      },
      user: user,
      isAdmin: true,
    };
  } 
  // REGULAR USER DASHBOARD - Personal Information
  else {
    const recentOrders = await Order.findAll({
      where: { userId: user.id },
      order: [['createdAt', 'DESC']],
      limit: 5,
    });

    console.log("✅ User dashboard - returning personal info");
    return {
      user: user,
      recentOrders,
      isAdmin: false,
    };
  }
};

// Settings page handler - Admin only
const settingsHandler = async (request, response, context) => {
  const { currentAdmin } = context;
  
  console.log("=== Settings Handler ===");
  console.log("currentAdmin:", currentAdmin);
  
  if (!currentAdmin || currentAdmin.role !== 'admin') {
    console.warn("⚠️ Non-admin user tried to access settings");
    return { settings: [], user: currentAdmin };
  }

  const settings = await Setting.findAll({
    order: [['key', 'ASC']],
  });

  console.log("✅ Settings loaded for admin");
  return {
    settings,
    user: currentAdmin,
  };
};

// Initialize ComponentLoader
const componentLoader = new ComponentLoader();

// Add components
const Components = {
  Dashboard: componentLoader.add('Dashboard', './components/Dashboard'),
  Settings: componentLoader.add('Settings', './components/Settings'),
};

const adminJs = new AdminJS({
  databases: [sequelize],
  rootPath: "/admin",
  componentLoader,
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
        isAccessible: ({ currentAdmin }) => {
          return currentAdmin && currentAdmin.role === 'admin';
        },
        isVisible: ({ currentAdmin }) => {
          return currentAdmin && currentAdmin.role === 'admin';
        },
        // Action-level permissions
        actions: {
          new: {
            isAccessible: ({ currentAdmin }) => currentAdmin && currentAdmin.role === 'admin',
          },
          edit: {
            isAccessible: ({ currentAdmin }) => currentAdmin && currentAdmin.role === 'admin',
          },
          delete: {
            isAccessible: ({ currentAdmin }) => currentAdmin && currentAdmin.role === 'admin',
          },
          bulkDelete: {
            isAccessible: ({ currentAdmin }) => currentAdmin && currentAdmin.role === 'admin',
          },
          list: {
            isAccessible: ({ currentAdmin }) => currentAdmin && currentAdmin.role === 'admin',
          },
          show: {
            isAccessible: ({ currentAdmin }) => currentAdmin && currentAdmin.role === 'admin',
          },
        },
      },
    },
    {
      resource: Category,
      options: {
        // Admins can see all, regular users can see categories
        isAccessible: ({ currentAdmin }) => {
          return currentAdmin;
        },
        isVisible: ({ currentAdmin }) => {
          return currentAdmin;
        },
        // Action-level permissions
        actions: {
          new: {
            isAccessible: ({ currentAdmin }) => currentAdmin && currentAdmin.role === 'admin',
          },
          edit: {
            isAccessible: ({ currentAdmin }) => currentAdmin && currentAdmin.role === 'admin',
          },
          delete: {
            isAccessible: ({ currentAdmin }) => currentAdmin && currentAdmin.role === 'admin',
          },
          bulkDelete: {
            isAccessible: ({ currentAdmin }) => currentAdmin && currentAdmin.role === 'admin',
          },
          list: {
            isAccessible: ({ currentAdmin }) => currentAdmin,
          },
          show: {
            isAccessible: ({ currentAdmin }) => currentAdmin,
          },
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
        isAccessible: ({ currentAdmin }) => {
          return currentAdmin;
        },
        isVisible: ({ currentAdmin }) => {
          return currentAdmin;
        },
        // Action-level permissions
        actions: {
          new: {
            isAccessible: ({ currentAdmin }) => currentAdmin && currentAdmin.role === 'admin',
          },
          edit: {
            isAccessible: ({ currentAdmin }) => currentAdmin && currentAdmin.role === 'admin',
          },
          delete: {
            isAccessible: ({ currentAdmin }) => currentAdmin && currentAdmin.role === 'admin',
          },
          bulkDelete: {
            isAccessible: ({ currentAdmin }) => currentAdmin && currentAdmin.role === 'admin',
          },
          list: {
            isAccessible: ({ currentAdmin }) => currentAdmin,
          },
          show: {
            isAccessible: ({ currentAdmin }) => currentAdmin,
          },
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
        isAccessible: ({ currentAdmin }) => {
          return currentAdmin;
        },
        isVisible: ({ currentAdmin }) => {
          return currentAdmin;
        },
        // Action-level permissions
        actions: {
          new: {
            isAccessible: ({ currentAdmin }) => currentAdmin && currentAdmin.role === 'admin',
          },
          edit: {
            isAccessible: ({ currentAdmin }) => currentAdmin && currentAdmin.role === 'admin',
          },
          delete: {
            isAccessible: ({ currentAdmin }) => currentAdmin && currentAdmin.role === 'admin',
          },
          bulkDelete: {
            isAccessible: ({ currentAdmin }) => currentAdmin && currentAdmin.role === 'admin',
          },
          list: {
            isAccessible: ({ currentAdmin }) => currentAdmin,
            before: async (request, context) => {
              if (context.currentAdmin && context.currentAdmin.role !== 'admin') {
                // Filter to show only user's own orders
                request.query = request.query || {};
                request.query.filters = request.query.filters || {};
                request.query.filters.userId = context.currentAdmin.id;
              }
              return request;
            },
          },
          show: {
            isAccessible: async ({ currentAdmin, record }) => {
              if (!currentAdmin) return false;
              if (currentAdmin.role === 'admin') return true;
              // Regular users can only view their own orders
              const params = record?.params;
              return params && params.userId === currentAdmin.id;
            },
          },
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
        isAccessible: ({ currentAdmin }) => {
          return currentAdmin;
        },
        isVisible: ({ currentAdmin }) => {
          return currentAdmin;
        },
        // Action-level permissions
        actions: {
          new: {
            isAccessible: ({ currentAdmin }) => currentAdmin && currentAdmin.role === 'admin',
          },
          edit: {
            isAccessible: ({ currentAdmin }) => currentAdmin && currentAdmin.role === 'admin',
          },
          delete: {
            isAccessible: ({ currentAdmin }) => currentAdmin && currentAdmin.role === 'admin',
          },
          bulkDelete: {
            isAccessible: ({ currentAdmin }) => currentAdmin && currentAdmin.role === 'admin',
          },
          list: {
            isAccessible: ({ currentAdmin }) => currentAdmin,
          },
          show: {
            isAccessible: ({ currentAdmin }) => currentAdmin,
          },
        },
      },
    },
    {
      resource: Setting,
      options: {
        // Only admins can see Settings
        isAccessible: ({ currentAdmin }) => {
          return currentAdmin && currentAdmin.role === 'admin';
        },
        isVisible: ({ currentAdmin }) => {
          return currentAdmin && currentAdmin.role === 'admin';
        },
        // Action-level permissions
        actions: {
          new: {
            isAccessible: ({ currentAdmin }) => currentAdmin && currentAdmin.role === 'admin',
          },
          edit: {
            isAccessible: ({ currentAdmin }) => currentAdmin && currentAdmin.role === 'admin',
          },
          delete: {
            isAccessible: ({ currentAdmin }) => currentAdmin && currentAdmin.role === 'admin',
          },
          bulkDelete: {
            isAccessible: ({ currentAdmin }) => currentAdmin && currentAdmin.role === 'admin',
          },
          list: {
            isAccessible: ({ currentAdmin }) => currentAdmin && currentAdmin.role === 'admin',
          },
          show: {
            isAccessible: ({ currentAdmin }) => currentAdmin && currentAdmin.role === 'admin',
          },
        },
      },
    },
  ],
  dashboard: {
    handler: dashboardHandler,
    component: Components.Dashboard,
  },
  pages: {
    customSettings: {
      handler: settingsHandler,
      component: Components.Settings,
      icon: 'Settings',
      label: 'Settings Page',
    },
  },
  branding: {
    companyName: 'eCommerce Admin',
    logo: false,
    softwareBrothers: false,
  },
});

// Move body-parser middleware BEFORE AdminJS router
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Add session middleware globally (needed for SSO endpoint and AdminJS)
const session = require("express-session");
const sessionConfig = {
  resave: false,
  saveUninitialized: false,
  secret: process.env.SESSION_SECRET || 'some-secret-session-password-change-in-production',
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  },
  name: 'adminjs',
};
app.use(session(sessionConfig));

// Redirect root to login page or admin based on session - MUST come before static files
app.get("/", (req, res) => {
  // If user has an active AdminJS session, redirect to admin
  if (req.session && req.session.adminUser) {
    return res.redirect("/admin");
  }
  // Otherwise, redirect to login page
  res.redirect("/login.html");
});

// Serve static files (for login page)
app.use(express.static("public"));

// Add your already implemented /api/auth routes that handle JWT login/signup
app.use("/api/auth", authRoutes);

// Also add /api/login alias as required by assignment
app.use("/api", authRoutes);

// SSO route to convert JWT to AdminJS session (must be before AdminJS router)
app.use("/api", adminSSORoutes);

// Build AdminJS router with custom authentication that validates JWT
const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
  adminJs,
  {
    authenticate: async (email, password) => {
      try {
        // This is called when user submits the AdminJS login form
        // We'll authenticate against our API and validate credentials
        const user = await User.findOne({ where: { email } });
        
        if (!user) {
          return null;
        }

        // Verify password
        const isPasswordValid = await user.comparePassword(password);
        
        if (!isPasswordValid) {
          return null;
        }

        // Return user object - AdminJS will store this in session as currentAdmin
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
    cookiePassword: process.env.COOKIE_SECRET || 'some-secret-password-used-to-secure-cookie-change-in-production',
  },
  null,
  sessionConfig // Pass our session config so AdminJS uses the same session
);

// Mount AdminJS
app.use(adminJs.options.rootPath, adminRouter);

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
