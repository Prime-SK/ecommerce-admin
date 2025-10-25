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
  pages: {
    dashboard: {
      label: 'Dashboard',
      component: false,
      handler: async (request, response, context) => {
        const { dashboardHandler } = require("./pages/dashboard");
        const data = await dashboardHandler(request, response, context);
        
        // Return HTML content for the dashboard
        const html = `
          <div style="padding: 20px; font-family: Arial, sans-serif;">
            <h1>Welcome, ${data.currentUser?.name || 'User'}!</h1>
            <p><strong>Role:</strong> ${data.isAdmin ? 'Administrator' : 'User'}</p>
            
            ${data.isAdmin ? `
              <h2>System Overview</h2>
              <div style="display: flex; gap: 20px; margin-bottom: 30px; flex-wrap: wrap;">
                <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; min-width: 200px;">
                  <h3>Total Users</h3>
                  <div style="font-size: 24px; font-weight: bold;">${data.stats?.totalUsers || 0}</div>
                </div>
                <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; min-width: 200px;">
                  <h3>Total Orders</h3>
                  <div style="font-size: 24px; font-weight: bold;">${data.stats?.totalOrders || 0}</div>
                </div>
                <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; min-width: 200px;">
                  <h3>Total Products</h3>
                  <div style="font-size: 24px; font-weight: bold;">${data.stats?.totalProducts || 0}</div>
                </div>
                <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; min-width: 200px;">
                  <h3>Total Revenue</h3>
                  <div style="font-size: 24px; font-weight: bold;">$${data.stats?.totalRevenue || '0.00'}</div>
                </div>
              </div>
              
              ${data.stats?.recentOrders?.length > 0 ? `
                <h2>Recent Orders</h2>
                <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
                  <thead>
                    <tr style="background: #f8f9fa;">
                      <th style="padding: 12px; text-align: left; border: 1px solid #ddd;">Order ID</th>
                      <th style="padding: 12px; text-align: left; border: 1px solid #ddd;">Customer</th>
                      <th style="padding: 12px; text-align: left; border: 1px solid #ddd;">Amount</th>
                      <th style="padding: 12px; text-align: left; border: 1px solid #ddd;">Status</th>
                      <th style="padding: 12px; text-align: left; border: 1px solid #ddd;">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${data.stats.recentOrders.map(order => `
                      <tr>
                        <td style="padding: 12px; border: 1px solid #ddd;">${order.id}</td>
                        <td style="padding: 12px; border: 1px solid #ddd;">${order.user || 'Unknown'}</td>
                        <td style="padding: 12px; border: 1px solid #ddd;">$${order.totalAmount}</td>
                        <td style="padding: 12px; border: 1px solid #ddd;">
                          <span style="background: ${order.status === 'completed' ? '#d4edda' : '#fff3cd'}; 
                                      color: ${order.status === 'completed' ? '#155724' : '#856404'}; 
                                      padding: 4px 8px; border-radius: 4px;">
                            ${order.status}
                          </span>
                        </td>
                        <td style="padding: 12px; border: 1px solid #ddd;">${new Date(order.createdAt).toLocaleDateString()}</td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              ` : ''}
              
              ${Object.keys(data.stats?.ordersByStatus || {}).length > 0 ? `
                <h2>Orders by Status</h2>
                <div style="display: flex; gap: 20px; flex-wrap: wrap;">
                  ${Object.entries(data.stats.ordersByStatus).map(([status, count]) => `
                    <div style="background: #f5f5f5; padding: 20px; border-radius: 8px;">
                      <div style="font-weight: bold; text-transform: capitalize;">${status}</div>
                      <div style="font-size: 20px;">${count}</div>
                    </div>
                  `).join('')}
                </div>
              ` : ''}
            ` : `
              <h2>Your Account Overview</h2>
              <div style="display: flex; gap: 20px; margin-bottom: 30px; flex-wrap: wrap;">
                <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; min-width: 200px;">
                  <h3>Your Orders</h3>
                  <div style="font-size: 24px; font-weight: bold;">${data.stats?.totalOrders || 0}</div>
                </div>
                <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; min-width: 200px;">
                  <h3>Total Spent</h3>
                  <div style="font-size: 24px; font-weight: bold;">$${data.stats?.totalSpent || '0.00'}</div>
                </div>
              </div>
              
              ${data.stats?.recentOrders?.length > 0 ? `
                <h2>Your Recent Orders</h2>
                <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
                  <thead>
                    <tr style="background: #f8f9fa;">
                      <th style="padding: 12px; text-align: left; border: 1px solid #ddd;">Order ID</th>
                      <th style="padding: 12px; text-align: left; border: 1px solid #ddd;">Amount</th>
                      <th style="padding: 12px; text-align: left; border: 1px solid #ddd;">Status</th>
                      <th style="padding: 12px; text-align: left; border: 1px solid #ddd;">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${data.stats.recentOrders.map(order => `
                      <tr>
                        <td style="padding: 12px; border: 1px solid #ddd;">${order.id}</td>
                        <td style="padding: 12px; border: 1px solid #ddd;">$${order.totalAmount}</td>
                        <td style="padding: 12px; border: 1px solid #ddd;">
                          <span style="background: ${order.status === 'completed' ? '#d4edda' : '#fff3cd'}; 
                                      color: ${order.status === 'completed' ? '#155724' : '#856404'}; 
                                      padding: 4px 8px; border-radius: 4px;">
                            ${order.status}
                          </span>
                        </td>
                        <td style="padding: 12px; border: 1px solid #ddd;">${new Date(order.createdAt).toLocaleDateString()}</td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              ` : ''}
              
              ${Object.keys(data.stats?.ordersByStatus || {}).length > 0 ? `
                <h2>Your Orders by Status</h2>
                <div style="display: flex; gap: 20px; flex-wrap: wrap;">
                  ${Object.entries(data.stats.ordersByStatus).map(([status, count]) => `
                    <div style="background: #f5f5f5; padding: 20px; border-radius: 8px;">
                      <div style="font-weight: bold; text-transform: capitalize;">${status}</div>
                      <div style="font-size: 20px;">${count}</div>
                    </div>
                  `).join('')}
                </div>
              ` : ''}
            `}
          </div>
        `;
        
        return response.send(html);
      },
    },
    settings: {
      label: 'Settings',
      component: false,
      handler: async (request, response, context) => {
        const { settingsHandler } = require("./pages/settings");
        const data = await settingsHandler(request, response, context);
        
        // Return HTML content for the settings
        const html = `
          <div style="padding: 20px; font-family: Arial, sans-serif;">
            <h1>System Settings</h1>
            <p>Manage application configuration settings</p>
            
            ${data.error ? `
              <div style="background: #f8d7da; color: #721c24; padding: 12px; border-radius: 4px; margin-bottom: 20px;">
                Error: ${data.error}
              </div>
            ` : ''}
            
            <h2>Configuration</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <thead>
                <tr style="background: #f8f9fa;">
                  <th style="padding: 12px; text-align: left; border: 1px solid #ddd;">Key</th>
                  <th style="padding: 12px; text-align: left; border: 1px solid #ddd;">Value</th>
                  <th style="padding: 12px; text-align: left; border: 1px solid #ddd;">Description</th>
                  <th style="padding: 12px; text-align: left; border: 1px solid #ddd;">Last Updated</th>
                </tr>
              </thead>
              <tbody>
                ${data.settings?.map(setting => `
                  <tr>
                    <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">${setting.key}</td>
                    <td style="padding: 12px; border: 1px solid #ddd; font-family: monospace;">${setting.value}</td>
                    <td style="padding: 12px; border: 1px solid #ddd;">${setting.description || 'No description'}</td>
                    <td style="padding: 12px; border: 1px solid #ddd; color: #666; font-size: 14px;">
                      ${setting.updatedAt ? new Date(setting.updatedAt).toLocaleString() : 'N/A'}
                    </td>
                  </tr>
                `).join('') || '<tr><td colspan="4" style="padding: 20px; text-align: center; color: #666;">No settings found</td></tr>'}
              </tbody>
            </table>
            
            <div style="margin-top: 30px; padding: 20px; background: #e9ecef; border-radius: 8px;">
              <h3>Note</h3>
              <p>Settings can be managed through the Settings resource in the navigation menu. This page provides a read-only view of current configuration.</p>
            </div>
          </div>
        `;
        
        return response.send(html);
      },
    },
  },
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

// Custom route to redirect root admin path to dashboard
app.get(adminJs.options.rootPath, (req, res) => {
  res.redirect(`${adminJs.options.rootPath}/pages/dashboard`);
});

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
