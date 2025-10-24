// Custom Dashboard Page
const dashboardHandler = async (request, response, context) => {
  const { User, Order, Product, Category } = require('../models');
  const { sequelize } = require('../config/database');
  
  try {
    const currentUser = context.currentAdmin;
    const isAdmin = currentUser.role === 'admin';
    
    if (isAdmin) {
      // Admin dashboard - show system-wide statistics
      const totalUsers = await User.count();
      const totalOrders = await Order.count();
      const totalProducts = await Product.count();
      const totalCategories = await Category.count();
      
      // Get recent orders
      const recentOrders = await Order.findAll({
        limit: 5,
        order: [['createdAt', 'DESC']],
        include: [{
          model: User,
          as: 'user',
          attributes: ['name', 'email']
        }]
      });
      
      // Get total revenue
      const revenueResult = await Order.findOne({
        attributes: [
          [sequelize.fn('SUM', sequelize.col('totalAmount')), 'totalRevenue']
        ],
        where: { status: 'completed' }
      });
      
      const totalRevenue = revenueResult?.dataValues?.totalRevenue || 0;
      
      // Get orders by status
      const ordersByStatus = await Order.findAll({
        attributes: [
          'status',
          [sequelize.fn('COUNT', sequelize.col('id')), 'count']
        ],
        group: ['status']
      });
      
      return {
        stats: {
          totalUsers,
          totalOrders,
          totalProducts,
          totalCategories,
          totalRevenue: parseFloat(totalRevenue).toFixed(2),
          recentOrders: recentOrders.map(order => ({
            id: order.id,
            user: order.user?.name || 'Unknown',
            totalAmount: order.totalAmount,
            status: order.status,
            createdAt: order.createdAt
          })),
          ordersByStatus: ordersByStatus.reduce((acc, item) => {
            acc[item.status] = parseInt(item.dataValues.count);
            return acc;
          }, {})
        },
        currentUser,
        isAdmin: true
      };
    } else {
      // Regular user dashboard - show personal information
      const userOrders = await Order.findAll({
        where: { userId: currentUser.id },
        order: [['createdAt', 'DESC']],
        limit: 5
      });
      
      const totalUserOrders = await Order.count({
        where: { userId: currentUser.id }
      });
      
      const totalUserSpent = await Order.findOne({
        attributes: [
          [sequelize.fn('SUM', sequelize.col('totalAmount')), 'totalSpent']
        ],
        where: { 
          userId: currentUser.id,
          status: 'completed'
        }
      });
      
      const userOrdersByStatus = await Order.findAll({
        where: { userId: currentUser.id },
        attributes: [
          'status',
          [sequelize.fn('COUNT', sequelize.col('id')), 'count']
        ],
        group: ['status']
      });
      
      return {
        stats: {
          totalOrders: totalUserOrders,
          totalSpent: parseFloat(totalUserSpent?.dataValues?.totalSpent || 0).toFixed(2),
          recentOrders: userOrders.map(order => ({
            id: order.id,
            totalAmount: order.totalAmount,
            status: order.status,
            createdAt: order.createdAt
          })),
          ordersByStatus: userOrdersByStatus.reduce((acc, item) => {
            acc[item.status] = parseInt(item.dataValues.count);
            return acc;
          }, {})
        },
        currentUser,
        isAdmin: false
      };
    }
  } catch (error) {
    console.error('Dashboard error:', error);
    return {
      stats: {
        totalUsers: 0,
        totalOrders: 0,
        totalProducts: 0,
        totalCategories: 0,
        totalRevenue: '0.00',
        recentOrders: [],
        ordersByStatus: {}
      },
      currentUser: context.currentAdmin,
      error: error.message
    };
  }
};

module.exports = {
  dashboardHandler
};
