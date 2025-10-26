import React, { useEffect, useState } from 'react'
import { ApiClient } from 'adminjs'
import { Box, H2, H3, H5, Text, Table, TableRow, TableCell, TableHead, TableBody, Loader } from '@adminjs/design-system'

const api = new ApiClient()

const StatCard = ({ title, value }) => (
  <Box variant="grey" p="lg" style={{ minWidth: 200, marginRight: 20, marginBottom: 20 }}>
    <H5>{title}</H5>
    <H2 mt="default">{value}</H2>
  </Box>
)

const OrdersTable = ({ orders }) => (
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>Order ID</TableCell>
        <TableCell>Customer</TableCell>
        <TableCell>Amount</TableCell>
        <TableCell>Status</TableCell>
        <TableCell>Date</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {orders.map((o) => (
        <TableRow key={o.id}>
          <TableCell>{o.id}</TableCell>
          <TableCell>{o.user || 'Unknown'}</TableCell>
          <TableCell>${o.totalAmount}</TableCell>
          <TableCell>{o.status}</TableCell>
          <TableCell>{new Date(o.createdAt).toLocaleDateString()}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
)

const Dashboard = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true
    api
      .getDashboard()
      .then((res) => {
        if (!isMounted) return
        setData(res.data)
      })
      .catch((err) => {
        if (!isMounted) return
        setError(err?.message || 'Failed to load dashboard')
      })
      .finally(() => isMounted && setLoading(false))

    return () => {
      isMounted = false
    }
  }, [])

  if (loading) return <Loader />
  if (error) return <Box><Text>{error}</Text></Box>
  if (!data) return null

  const { currentUser, isAdmin, stats = {} } = data

  return (
    <Box p="xxl">
      <H2>Welcome{currentUser?.name ? `, ${currentUser.name}` : ''}</H2>
      <Text mb="xl">Role: {isAdmin ? 'Administrator' : 'User'}</Text>

      <Box style={{ display: 'flex', flexWrap: 'wrap' }}>
        {isAdmin ? (
          <>
            <StatCard title="Total Users" value={stats.totalUsers || 0} />
            <StatCard title="Total Orders" value={stats.totalOrders || 0} />
            <StatCard title="Total Products" value={stats.totalProducts || 0} />
            <StatCard title="Total Revenue" value={`$${stats.totalRevenue || '0.00'}`} />
          </>
        ) : (
          <>
            <StatCard title="Your Orders" value={stats.totalOrders || 0} />
            <StatCard title="Total Spent" value={`$${stats.totalSpent || '0.00'}`} />
          </>
        )}
      </Box>

      {Array.isArray(stats.recentOrders) && stats.recentOrders.length > 0 && (
        <Box mt="xxl">
          <H3 mb="lg">{isAdmin ? 'Recent Orders' : 'Your Recent Orders'}</H3>
          <OrdersTable orders={stats.recentOrders} />
        </Box>
      )}
    </Box>
  )
}

export default Dashboard
