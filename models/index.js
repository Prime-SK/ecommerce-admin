const User = require("./User");
const Category = require("./Category");
const Product = require("./Product");
const Order = require("./Order");
const OrderItem = require("./OrderItem");
const Setting = require("./Setting");

// Define Relationships
Product.belongsTo(Category, { foreignKey: "categoryId", as: "category" });
Category.hasMany(Product, { foreignKey: "categoryId", as: "products" });

Order.belongsTo(User, { foreignKey: "userId", as: "user" });
User.hasMany(Order, { foreignKey: "userId", as: "orders" });

OrderItem.belongsTo(Order, { foreignKey: "orderId", as: "order" });
Order.hasMany(OrderItem, { foreignKey: "orderId", as: "items" });

OrderItem.belongsTo(Product, { foreignKey: "productId", as: "product" });
Product.hasMany(OrderItem, { foreignKey: "productId", as: "orderItems" });

module.exports = {
  User,
  Category,
  Product,
  Order,
  OrderItem,
  Setting,
};
