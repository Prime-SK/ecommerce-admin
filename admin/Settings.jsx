import React, { useEffect, useState } from 'react'
import { ApiClient } from 'adminjs'
import { Box, H2, H5, Loader, Table, TableRow, TableCell, TableHead, TableBody, Text } from '@adminjs/design-system'

const api = new ApiClient()

const Settings = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let active = true
    api
      .getPage({ pageName: 'settings' })
      .then((res) => {
        if (!active) return
        setData(res.data)
      })
      .catch((e) => {
        if (!active) return
        setError(e?.message || 'Failed to load settings')
      })
      .finally(() => active && setLoading(false))

    return () => {
      active = false
    }
  }, [])

  if (loading) return <Loader />
  if (error) return <Box><Text>{error}</Text></Box>
  if (!data) return null

  const settings = data.settings || []

  return (
    <Box p="xxl">
      <H2>System Settings</H2>
      <Text mb="xl">Manage application configuration (read-only preview)</Text>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Key</TableCell>
            <TableCell>Value</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Last Updated</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {settings.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4}>
                <Text>No settings found</Text>
              </TableCell>
            </TableRow>
          ) : (
            settings.map((s) => (
              <TableRow key={s.id}>
                <TableCell><strong>{s.key}</strong></TableCell>
                <TableCell style={{ fontFamily: 'monospace' }}>{s.value}</TableCell>
                <TableCell>{s.description || '—'}</TableCell>
                <TableCell>{s.updatedAt ? new Date(s.updatedAt).toLocaleString() : 'N/A'}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </Box>
  )
}

export default Settings
