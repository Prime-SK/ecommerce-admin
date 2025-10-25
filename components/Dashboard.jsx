import React from 'react';
import { Box, H2, H5, Text, Table, TableHead, TableRow, TableCell, TableBody, Badge } from '@adminjs/design-system';

const Dashboard = (props) => {
  const { stats, user, recentOrders, isAdmin } = props;

  // Add error handling for missing props
  if (!user) {
    return (
      <Box padding="xxl">
        <Text>Loading user information...</Text>
      </Box>
    );
  }

  if (isAdmin) {
    // ADMIN DASHBOARD - System Statistics
    return (
      <Box padding="xxl">
        <Box mb="xl">
          <H2>Admin Dashboard</H2>
          <Text color="grey60">Welcome back, {user.name}!</Text>
          <Badge variant="primary" mt="sm">Administrator</Badge>
        </Box>

        <Box display="flex" flexWrap="wrap" gap="lg" mb="xl">
          <Box 
            bg="primary100" 
            padding="xl" 
            borderRadius="lg" 
            flex="1" 
            minWidth="200px"
            style={{ border: '2px solid #4268F6' }}
          >
            <Text color="primary" fontSize="sm" mb="sm">TOTAL USERS</Text>
            <H2 color="primary">{stats?.totalUsers || 0}</H2>
          </Box>

          <Box 
            bg="success100" 
            padding="xl" 
            borderRadius="lg" 
            flex="1" 
            minWidth="200px"
            style={{ border: '2px solid #42C88A' }}
          >
            <Text color="success" fontSize="sm" mb="sm">TOTAL ORDERS</Text>
            <H2 color="success">{stats?.totalOrders || 0}</H2>
          </Box>

          <Box 
            bg="info100" 
            padding="xl" 
            borderRadius="lg" 
            flex="1" 
            minWidth="200px"
            style={{ border: '2px solid #3EAAF5' }}
          >
            <Text color="info" fontSize="sm" mb="sm">TOTAL PRODUCTS</Text>
            <H2 color="info">{stats?.totalProducts || 0}</H2>
          </Box>

          <Box 
            bg="warning100" 
            padding="xl" 
            borderRadius="lg" 
            flex="1" 
            minWidth="200px"
            style={{ border: '2px solid #FFA500' }}
          >
            <Text color="warning" fontSize="sm" mb="sm">TOTAL REVENUE</Text>
            <H2 color="warning">${stats?.totalRevenue?.toFixed(2) || '0.00'}</H2>
          </Box>
        </Box>

        <Box bg="white" padding="xl" borderRadius="lg" style={{ border: '1px solid #e8e8e8' }}>
          <H5 mb="lg">System Overview</H5>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Metric</TableCell>
                <TableCell>Count</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Registered Users</TableCell>
                <TableCell>{stats?.totalUsers || 0}</TableCell>
                <TableCell>
                  <Badge variant="success">Active</Badge>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Product Categories</TableCell>
                <TableCell>{stats?.totalCategories || 0}</TableCell>
                <TableCell>
                  <Badge variant="info">Configured</Badge>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Available Products</TableCell>
                <TableCell>{stats?.totalProducts || 0}</TableCell>
                <TableCell>
                  <Badge variant="primary">In Stock</Badge>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Total Orders</TableCell>
                <TableCell>{stats?.totalOrders || 0}</TableCell>
                <TableCell>
                  <Badge variant="success">Processing</Badge>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Box>
      </Box>
    );
  } else {
    // REGULAR USER DASHBOARD - Personal Information
    return (
      <Box padding="xxl">
        <Box mb="xl">
          <H2>My Dashboard</H2>
          <Text color="grey60">Welcome, {user.name}!</Text>
          <Badge variant="info" mt="sm">User</Badge>
        </Box>

        <Box display="flex" gap="lg" mb="xl" flexWrap="wrap">
          <Box 
            bg="primary100" 
            padding="xl" 
            borderRadius="lg" 
            flex="1"
            minWidth="250px"
            style={{ border: '2px solid #4268F6' }}
          >
            <Text color="primary" fontSize="sm" mb="sm">YOUR EMAIL</Text>
            <Text fontSize="lg" fontWeight="bold">{user.email}</Text>
          </Box>

          <Box 
            bg="success100" 
            padding="xl" 
            borderRadius="lg" 
            flex="1"
            minWidth="250px"
            style={{ border: '2px solid #42C88A' }}
          >
            <Text color="success" fontSize="sm" mb="sm">ACCOUNT TYPE</Text>
            <Text fontSize="lg" fontWeight="bold" style={{ textTransform: 'capitalize' }}>
              {user.role}
            </Text>
          </Box>
        </Box>

        {recentOrders && recentOrders.length > 0 && (
          <Box bg="white" padding="xl" borderRadius="lg" style={{ border: '1px solid #e8e8e8' }}>
            <H5 mb="lg">Your Recent Orders</H5>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Order ID</TableCell>
                  <TableCell>Total Amount</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {recentOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>#{order.id}</TableCell>
                    <TableCell>${order.totalAmount?.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={
                          order.status === 'completed' ? 'success' : 
                          order.status === 'pending' ? 'warning' : 
                          'info'
                        }
                      >
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(order.createdAt).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        )}

        {(!recentOrders || recentOrders.length === 0) && (
          <Box 
            bg="grey20" 
            padding="xl" 
            borderRadius="lg" 
            textAlign="center"
          >
            <Text color="grey60">You haven't placed any orders yet.</Text>
          </Box>
        )}
      </Box>
    );
  }
};

export default Dashboard;
