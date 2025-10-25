import React from 'react';
import { Box, H2, H5, Text, Table, TableHead, TableRow, TableCell, TableBody, Badge, Button } from '@adminjs/design-system';

const Settings = (props) => {
  const { settings, user } = props;

  return (
    <Box padding="xxl">
      <Box mb="xl">
        <H2>System Settings</H2>
        <Text color="grey60">Configure your eCommerce platform</Text>
        <Badge variant="primary" mt="sm">Admin Only</Badge>
      </Box>

      <Box bg="white" padding="xl" borderRadius="lg" style={{ border: '1px solid #e8e8e8' }} mb="lg">
        <Box display="flex" justifyContent="space-between" alignItems="center" mb="lg">
          <H5>Configuration Settings</H5>
          <Text color="grey60" fontSize="sm">Last updated: {new Date().toLocaleDateString()}</Text>
        </Box>

        {settings && settings.length > 0 ? (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: 'bold' }}>Setting Key</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Value</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {settings.map((setting) => (
                <TableRow key={setting.id}>
                  <TableCell>
                    <Text fontWeight="bold">{setting.key}</Text>
                  </TableCell>
                  <TableCell>
                    <Text>{setting.value}</Text>
                  </TableCell>
                  <TableCell>
                    <Badge variant="success">Active</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <Box 
            bg="grey20" 
            padding="xl" 
            borderRadius="lg" 
            textAlign="center"
          >
            <Text color="grey60">No settings configured yet.</Text>
            <Text color="grey60" fontSize="sm" mt="sm">
              Use the Settings resource to add configuration values.
            </Text>
          </Box>
        )}
      </Box>

      <Box bg="info100" padding="lg" borderRadius="lg" style={{ border: '1px solid #3EAAF5' }}>
        <H5 color="info" mb="sm">💡 Quick Tips</H5>
        <Text fontSize="sm" mb="xs">• Use the Settings resource in the sidebar to add/edit settings</Text>
        <Text fontSize="sm" mb="xs">• Settings are key-value pairs for platform configuration</Text>
        <Text fontSize="sm">• Common settings: site_name, currency, tax_rate, shipping_fee, etc.</Text>
      </Box>
    </Box>
  );
};

export default Settings;
