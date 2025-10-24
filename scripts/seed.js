const { User, Category, Product, Order, OrderItem, Setting } = require('../models');
const { sequelize } = require('../config/database');

async function seedDatabase() {
  try {
    console.log('🌱 Starting database seeding...');
    
    // Create admin user
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'admin123',
      role: 'admin'
    });
    console.log('✅ Admin user created:', adminUser.email);
    
    // Create regular user
    const regularUser = await User.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'user123',
      role: 'user'
    });
    console.log('✅ Regular user created:', regularUser.email);
    
    // Create categories
    const categories = await Category.bulkCreate([
      { name: 'Electronics', description: 'Electronic devices and gadgets' },
      { name: 'Clothing', description: 'Fashion and apparel' },
      { name: 'Books', description: 'Books and literature' },
      { name: 'Home & Garden', description: 'Home improvement and gardening' }
    ]);
    console.log('✅ Categories created:', categories.length);
    
    // Create products
    const products = await Product.bulkCreate([
      { name: 'Laptop', description: 'High-performance laptop', price: 999.99, stock: 10, categoryId: categories[0].id },
      { name: 'Smartphone', description: 'Latest smartphone model', price: 699.99, stock: 25, categoryId: categories[0].id },
      { name: 'T-Shirt', description: 'Comfortable cotton t-shirt', price: 19.99, stock: 50, categoryId: categories[1].id },
      { name: 'Jeans', description: 'Classic blue jeans', price: 49.99, stock: 30, categoryId: categories[1].id },
      { name: 'Programming Book', description: 'Learn JavaScript programming', price: 39.99, stock: 15, categoryId: categories[2].id },
      { name: 'Garden Tools', description: 'Essential gardening tools set', price: 79.99, stock: 8, categoryId: categories[3].id }
    ]);
    console.log('✅ Products created:', products.length);
    
    // Create orders
    const orders = await Order.bulkCreate([
      { userId: regularUser.id, totalAmount: 1019.98, status: 'completed' },
      { userId: regularUser.id, totalAmount: 69.98, status: 'pending' }
    ]);
    console.log('✅ Orders created:', orders.length);
    
    // Create order items
    await OrderItem.bulkCreate([
      { orderId: orders[0].id, productId: products[0].id, quantity: 1, price: 999.99 },
      { orderId: orders[0].id, productId: products[2].id, quantity: 1, price: 19.99 },
      { orderId: orders[1].id, productId: products[1].id, quantity: 1, price: 699.99 },
      { orderId: orders[1].id, productId: products[3].id, quantity: 1, price: 49.99 }
    ]);
    console.log('✅ Order items created');
    
    // Create settings
    await Setting.bulkCreate([
      { key: 'site_name', value: 'eCommerce Store', description: 'Website name' },
      { key: 'currency', value: 'USD', description: 'Default currency' },
      { key: 'tax_rate', value: '0.08', description: 'Tax rate (8%)' },
      { key: 'shipping_cost', value: '9.99', description: 'Standard shipping cost' },
      { key: 'maintenance_mode', value: 'false', description: 'Enable maintenance mode' }
    ]);
    console.log('✅ Settings created');
    
    console.log('\n🎉 Database seeding completed successfully!');
    console.log('\n📋 Test Credentials:');
    console.log('Admin: admin@example.com / admin123');
    console.log('User: john@example.com / user123');
    console.log('\n🚀 Start the server with: npm run dev');
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    await sequelize.close();
  }
}

// Run seeding if this file is executed directly
if (require.main === module) {
  seedDatabase();
}

module.exports = { seedDatabase };
