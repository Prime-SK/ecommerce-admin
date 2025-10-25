# eCommerce Admin Dashboard

A secure Admin Panel for eCommerce backend using AdminJS, Sequelize, and PostgreSQL with role-based access control.

## Features

- ✅ **Beautiful Login Page** - User-friendly UI with test credentials
- ✅ **JWT-based authentication** - Secure token-based auth
- ✅ **Role-based access control** - Admin vs Regular User permissions
- ✅ **Custom Dashboard** - Role-specific views (Admin: system stats, User: personal info)
- ✅ **Custom Settings Page** - Configuration management (Admin only)
- ✅ **Secure password hashing** - bcrypt for password security
- ✅ **Hidden password fields** - Passwords never displayed
- ✅ **Relational data display** - Proper relationships shown
- ✅ **PostgreSQL database** - With Sequelize ORM
- ✅ **Auto logout** - Session expiry handling
- ✅ **SSO Integration** - JWT to session conversion

## Setup Instructions

### 1. Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=ecommerce_admin
DB_USER=your_username
DB_PASSWORD=your_password

# JWT Secret (use a strong secret in production)
JWT_SECRET=your_super_secret_jwt_key_here

# Server Configuration
PORT=3000
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Database Setup

1. Make sure PostgreSQL is running
2. Create a database named `ecommerce_admin`
3. The application will automatically create tables on first run

### 4. Seed the Database (Optional)

```bash
# Populate database with sample data
npm run seed
```

This will create:
- Admin user: `admin@example.com` / `admin123`
- Regular user: `john@example.com` / `user123`
- Sample categories, products, orders, and settings

### 5. Run the Application

```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

### 6. Access the Application

- **API Base URL**: `http://localhost:3000`
- **Admin Panel**: `http://localhost:3000/admin` (requires JWT authentication)
- **Test Interface**: Open `test-admin.html` in your browser for detailed instructions

### 7. Test the Application

```bash
# Test all API endpoints
npm run test

# Seed database with sample data
npm run seed
```

## API Endpoints

### Authentication

- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user info

### Example API Usage

#### Register Admin User
```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin User",
    "email": "admin@example.com",
    "password": "admin123",
    "role": "admin"
  }'
```

#### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "admin123"
  }'
```

#### Access Admin Panel
```bash
curl -X GET http://localhost:3000/admin \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Role-Based Access Control

### Admin Users
- Can access all AdminJS resources (Users, Orders, Products, Categories, Settings)
- Can add/edit/delete all entities
- Can view custom Dashboard with system summary
- Can manage Settings

### Regular Users
- Cannot see Users or Settings tables
- Can view Products and Categories
- Can only see their own Orders and OrderItems
- Limited dashboard access

## Database Models

- **User**: Authentication and user management
- **Category**: Product categories
- **Product**: Product catalog with category relationships
- **Order**: Customer orders with user relationships
- **OrderItem**: Individual items in orders
- **Setting**: Key-value configuration storage

## Custom Pages

### Dashboard
- System statistics (total users, orders, products, revenue)
- Recent orders
- Orders by status breakdown

### Settings
- Key-value configuration management
- Only accessible to admin users

## Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Role-based access control
- Hidden password fields in AdminJS
- Secure API endpoints

## Development

The application uses:
- Node.js + Express for backend
- Sequelize ORM with PostgreSQL
- AdminJS for admin interface
- JWT for authentication
- bcrypt for password hashing
