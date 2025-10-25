(function (React, designSystem) {
  'use strict';

  function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

  var React__default = /*#__PURE__*/_interopDefault(React);

  const Dashboard = props => {
    const {
      stats,
      user,
      recentOrders,
      isAdmin
    } = props;

    // Add error handling for missing props
    if (!user) {
      return /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        padding: "xxl"
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, null, "Loading user information..."));
    }
    if (isAdmin) {
      // ADMIN DASHBOARD - System Statistics
      return /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        padding: "xxl"
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        mb: "xl"
      }, /*#__PURE__*/React__default.default.createElement(designSystem.H2, null, "Admin Dashboard"), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        color: "grey60"
      }, "Welcome back, ", user.name, "!"), /*#__PURE__*/React__default.default.createElement(designSystem.Badge, {
        variant: "primary",
        mt: "sm"
      }, "Administrator")), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        display: "flex",
        flexWrap: "wrap",
        gap: "lg",
        mb: "xl"
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        bg: "primary100",
        padding: "xl",
        borderRadius: "lg",
        flex: "1",
        minWidth: "200px",
        style: {
          border: '2px solid #4268F6'
        }
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        color: "primary",
        fontSize: "sm",
        mb: "sm"
      }, "TOTAL USERS"), /*#__PURE__*/React__default.default.createElement(designSystem.H2, {
        color: "primary"
      }, stats?.totalUsers || 0)), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        bg: "success100",
        padding: "xl",
        borderRadius: "lg",
        flex: "1",
        minWidth: "200px",
        style: {
          border: '2px solid #42C88A'
        }
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        color: "success",
        fontSize: "sm",
        mb: "sm"
      }, "TOTAL ORDERS"), /*#__PURE__*/React__default.default.createElement(designSystem.H2, {
        color: "success"
      }, stats?.totalOrders || 0)), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        bg: "info100",
        padding: "xl",
        borderRadius: "lg",
        flex: "1",
        minWidth: "200px",
        style: {
          border: '2px solid #3EAAF5'
        }
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        color: "info",
        fontSize: "sm",
        mb: "sm"
      }, "TOTAL PRODUCTS"), /*#__PURE__*/React__default.default.createElement(designSystem.H2, {
        color: "info"
      }, stats?.totalProducts || 0)), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        bg: "warning100",
        padding: "xl",
        borderRadius: "lg",
        flex: "1",
        minWidth: "200px",
        style: {
          border: '2px solid #FFA500'
        }
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        color: "warning",
        fontSize: "sm",
        mb: "sm"
      }, "TOTAL REVENUE"), /*#__PURE__*/React__default.default.createElement(designSystem.H2, {
        color: "warning"
      }, "$", stats?.totalRevenue?.toFixed(2) || '0.00'))), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        bg: "white",
        padding: "xl",
        borderRadius: "lg",
        style: {
          border: '1px solid #e8e8e8'
        }
      }, /*#__PURE__*/React__default.default.createElement(designSystem.H5, {
        mb: "lg"
      }, "System Overview"), /*#__PURE__*/React__default.default.createElement(designSystem.Table, null, /*#__PURE__*/React__default.default.createElement(designSystem.TableHead, null, /*#__PURE__*/React__default.default.createElement(designSystem.TableRow, null, /*#__PURE__*/React__default.default.createElement(designSystem.TableCell, null, "Metric"), /*#__PURE__*/React__default.default.createElement(designSystem.TableCell, null, "Count"), /*#__PURE__*/React__default.default.createElement(designSystem.TableCell, null, "Status"))), /*#__PURE__*/React__default.default.createElement(designSystem.TableBody, null, /*#__PURE__*/React__default.default.createElement(designSystem.TableRow, null, /*#__PURE__*/React__default.default.createElement(designSystem.TableCell, null, "Registered Users"), /*#__PURE__*/React__default.default.createElement(designSystem.TableCell, null, stats?.totalUsers || 0), /*#__PURE__*/React__default.default.createElement(designSystem.TableCell, null, /*#__PURE__*/React__default.default.createElement(designSystem.Badge, {
        variant: "success"
      }, "Active"))), /*#__PURE__*/React__default.default.createElement(designSystem.TableRow, null, /*#__PURE__*/React__default.default.createElement(designSystem.TableCell, null, "Product Categories"), /*#__PURE__*/React__default.default.createElement(designSystem.TableCell, null, stats?.totalCategories || 0), /*#__PURE__*/React__default.default.createElement(designSystem.TableCell, null, /*#__PURE__*/React__default.default.createElement(designSystem.Badge, {
        variant: "info"
      }, "Configured"))), /*#__PURE__*/React__default.default.createElement(designSystem.TableRow, null, /*#__PURE__*/React__default.default.createElement(designSystem.TableCell, null, "Available Products"), /*#__PURE__*/React__default.default.createElement(designSystem.TableCell, null, stats?.totalProducts || 0), /*#__PURE__*/React__default.default.createElement(designSystem.TableCell, null, /*#__PURE__*/React__default.default.createElement(designSystem.Badge, {
        variant: "primary"
      }, "In Stock"))), /*#__PURE__*/React__default.default.createElement(designSystem.TableRow, null, /*#__PURE__*/React__default.default.createElement(designSystem.TableCell, null, "Total Orders"), /*#__PURE__*/React__default.default.createElement(designSystem.TableCell, null, stats?.totalOrders || 0), /*#__PURE__*/React__default.default.createElement(designSystem.TableCell, null, /*#__PURE__*/React__default.default.createElement(designSystem.Badge, {
        variant: "success"
      }, "Processing")))))));
    } else {
      // REGULAR USER DASHBOARD - Personal Information
      return /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        padding: "xxl"
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        mb: "xl"
      }, /*#__PURE__*/React__default.default.createElement(designSystem.H2, null, "My Dashboard"), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        color: "grey60"
      }, "Welcome, ", user.name, "!"), /*#__PURE__*/React__default.default.createElement(designSystem.Badge, {
        variant: "info",
        mt: "sm"
      }, "User")), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        display: "flex",
        gap: "lg",
        mb: "xl",
        flexWrap: "wrap"
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        bg: "primary100",
        padding: "xl",
        borderRadius: "lg",
        flex: "1",
        minWidth: "250px",
        style: {
          border: '2px solid #4268F6'
        }
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        color: "primary",
        fontSize: "sm",
        mb: "sm"
      }, "YOUR EMAIL"), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        fontSize: "lg",
        fontWeight: "bold"
      }, user.email)), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        bg: "success100",
        padding: "xl",
        borderRadius: "lg",
        flex: "1",
        minWidth: "250px",
        style: {
          border: '2px solid #42C88A'
        }
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        color: "success",
        fontSize: "sm",
        mb: "sm"
      }, "ACCOUNT TYPE"), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        fontSize: "lg",
        fontWeight: "bold",
        style: {
          textTransform: 'capitalize'
        }
      }, user.role))), recentOrders && recentOrders.length > 0 && /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        bg: "white",
        padding: "xl",
        borderRadius: "lg",
        style: {
          border: '1px solid #e8e8e8'
        }
      }, /*#__PURE__*/React__default.default.createElement(designSystem.H5, {
        mb: "lg"
      }, "Your Recent Orders"), /*#__PURE__*/React__default.default.createElement(designSystem.Table, null, /*#__PURE__*/React__default.default.createElement(designSystem.TableHead, null, /*#__PURE__*/React__default.default.createElement(designSystem.TableRow, null, /*#__PURE__*/React__default.default.createElement(designSystem.TableCell, null, "Order ID"), /*#__PURE__*/React__default.default.createElement(designSystem.TableCell, null, "Total Amount"), /*#__PURE__*/React__default.default.createElement(designSystem.TableCell, null, "Status"), /*#__PURE__*/React__default.default.createElement(designSystem.TableCell, null, "Date"))), /*#__PURE__*/React__default.default.createElement(designSystem.TableBody, null, recentOrders.map(order => /*#__PURE__*/React__default.default.createElement(designSystem.TableRow, {
        key: order.id
      }, /*#__PURE__*/React__default.default.createElement(designSystem.TableCell, null, "#", order.id), /*#__PURE__*/React__default.default.createElement(designSystem.TableCell, null, "$", order.totalAmount?.toFixed(2)), /*#__PURE__*/React__default.default.createElement(designSystem.TableCell, null, /*#__PURE__*/React__default.default.createElement(designSystem.Badge, {
        variant: order.status === 'completed' ? 'success' : order.status === 'pending' ? 'warning' : 'info'
      }, order.status)), /*#__PURE__*/React__default.default.createElement(designSystem.TableCell, null, new Date(order.createdAt).toLocaleDateString())))))), (!recentOrders || recentOrders.length === 0) && /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        bg: "grey20",
        padding: "xl",
        borderRadius: "lg",
        textAlign: "center"
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        color: "grey60"
      }, "You haven't placed any orders yet.")));
    }
  };

  const Settings = props => {
    const {
      settings,
      user
    } = props;
    return /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      padding: "xxl"
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      mb: "xl"
    }, /*#__PURE__*/React__default.default.createElement(designSystem.H2, null, "System Settings"), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
      color: "grey60"
    }, "Configure your eCommerce platform"), /*#__PURE__*/React__default.default.createElement(designSystem.Badge, {
      variant: "primary",
      mt: "sm"
    }, "Admin Only")), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      bg: "white",
      padding: "xl",
      borderRadius: "lg",
      style: {
        border: '1px solid #e8e8e8'
      },
      mb: "lg"
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      mb: "lg"
    }, /*#__PURE__*/React__default.default.createElement(designSystem.H5, null, "Configuration Settings"), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
      color: "grey60",
      fontSize: "sm"
    }, "Last updated: ", new Date().toLocaleDateString())), settings && settings.length > 0 ? /*#__PURE__*/React__default.default.createElement(designSystem.Table, null, /*#__PURE__*/React__default.default.createElement(designSystem.TableHead, null, /*#__PURE__*/React__default.default.createElement(designSystem.TableRow, null, /*#__PURE__*/React__default.default.createElement(designSystem.TableCell, {
      style: {
        fontWeight: 'bold'
      }
    }, "Setting Key"), /*#__PURE__*/React__default.default.createElement(designSystem.TableCell, {
      style: {
        fontWeight: 'bold'
      }
    }, "Value"), /*#__PURE__*/React__default.default.createElement(designSystem.TableCell, {
      style: {
        fontWeight: 'bold'
      }
    }, "Status"))), /*#__PURE__*/React__default.default.createElement(designSystem.TableBody, null, settings.map(setting => /*#__PURE__*/React__default.default.createElement(designSystem.TableRow, {
      key: setting.id
    }, /*#__PURE__*/React__default.default.createElement(designSystem.TableCell, null, /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
      fontWeight: "bold"
    }, setting.key)), /*#__PURE__*/React__default.default.createElement(designSystem.TableCell, null, /*#__PURE__*/React__default.default.createElement(designSystem.Text, null, setting.value)), /*#__PURE__*/React__default.default.createElement(designSystem.TableCell, null, /*#__PURE__*/React__default.default.createElement(designSystem.Badge, {
      variant: "success"
    }, "Active")))))) : /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      bg: "grey20",
      padding: "xl",
      borderRadius: "lg",
      textAlign: "center"
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
      color: "grey60"
    }, "No settings configured yet."), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
      color: "grey60",
      fontSize: "sm",
      mt: "sm"
    }, "Use the Settings resource to add configuration values."))), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      bg: "info100",
      padding: "lg",
      borderRadius: "lg",
      style: {
        border: '1px solid #3EAAF5'
      }
    }, /*#__PURE__*/React__default.default.createElement(designSystem.H5, {
      color: "info",
      mb: "sm"
    }, "\uD83D\uDCA1 Quick Tips"), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
      fontSize: "sm",
      mb: "xs"
    }, "\u2022 Use the Settings resource in the sidebar to add/edit settings"), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
      fontSize: "sm",
      mb: "xs"
    }, "\u2022 Settings are key-value pairs for platform configuration"), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
      fontSize: "sm"
    }, "\u2022 Common settings: site_name, currency, tax_rate, shipping_fee, etc.")));
  };

  AdminJS.UserComponents = {};
  AdminJS.UserComponents.Dashboard = Dashboard;
  AdminJS.UserComponents.Settings = Settings;

})(React, AdminJSDesignSystem);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyIuLi9jb21wb25lbnRzL0Rhc2hib2FyZC5qc3giLCIuLi9jb21wb25lbnRzL1NldHRpbmdzLmpzeCIsImVudHJ5LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IEJveCwgSDIsIEg1LCBUZXh0LCBUYWJsZSwgVGFibGVIZWFkLCBUYWJsZVJvdywgVGFibGVDZWxsLCBUYWJsZUJvZHksIEJhZGdlIH0gZnJvbSAnQGFkbWluanMvZGVzaWduLXN5c3RlbSc7XHJcblxyXG5jb25zdCBEYXNoYm9hcmQgPSAocHJvcHMpID0+IHtcclxuICBjb25zdCB7IHN0YXRzLCB1c2VyLCByZWNlbnRPcmRlcnMsIGlzQWRtaW4gfSA9IHByb3BzO1xyXG5cclxuICAvLyBBZGQgZXJyb3IgaGFuZGxpbmcgZm9yIG1pc3NpbmcgcHJvcHNcclxuICBpZiAoIXVzZXIpIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxCb3ggcGFkZGluZz1cInh4bFwiPlxyXG4gICAgICAgIDxUZXh0PkxvYWRpbmcgdXNlciBpbmZvcm1hdGlvbi4uLjwvVGV4dD5cclxuICAgICAgPC9Cb3g+XHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgaWYgKGlzQWRtaW4pIHtcclxuICAgIC8vIEFETUlOIERBU0hCT0FSRCAtIFN5c3RlbSBTdGF0aXN0aWNzXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8Qm94IHBhZGRpbmc9XCJ4eGxcIj5cclxuICAgICAgICA8Qm94IG1iPVwieGxcIj5cclxuICAgICAgICAgIDxIMj5BZG1pbiBEYXNoYm9hcmQ8L0gyPlxyXG4gICAgICAgICAgPFRleHQgY29sb3I9XCJncmV5NjBcIj5XZWxjb21lIGJhY2ssIHt1c2VyLm5hbWV9ITwvVGV4dD5cclxuICAgICAgICAgIDxCYWRnZSB2YXJpYW50PVwicHJpbWFyeVwiIG10PVwic21cIj5BZG1pbmlzdHJhdG9yPC9CYWRnZT5cclxuICAgICAgICA8L0JveD5cclxuXHJcbiAgICAgICAgPEJveCBkaXNwbGF5PVwiZmxleFwiIGZsZXhXcmFwPVwid3JhcFwiIGdhcD1cImxnXCIgbWI9XCJ4bFwiPlxyXG4gICAgICAgICAgPEJveCBcclxuICAgICAgICAgICAgYmc9XCJwcmltYXJ5MTAwXCIgXHJcbiAgICAgICAgICAgIHBhZGRpbmc9XCJ4bFwiIFxyXG4gICAgICAgICAgICBib3JkZXJSYWRpdXM9XCJsZ1wiIFxyXG4gICAgICAgICAgICBmbGV4PVwiMVwiIFxyXG4gICAgICAgICAgICBtaW5XaWR0aD1cIjIwMHB4XCJcclxuICAgICAgICAgICAgc3R5bGU9e3sgYm9yZGVyOiAnMnB4IHNvbGlkICM0MjY4RjYnIH19XHJcbiAgICAgICAgICA+XHJcbiAgICAgICAgICAgIDxUZXh0IGNvbG9yPVwicHJpbWFyeVwiIGZvbnRTaXplPVwic21cIiBtYj1cInNtXCI+VE9UQUwgVVNFUlM8L1RleHQ+XHJcbiAgICAgICAgICAgIDxIMiBjb2xvcj1cInByaW1hcnlcIj57c3RhdHM/LnRvdGFsVXNlcnMgfHwgMH08L0gyPlxyXG4gICAgICAgICAgPC9Cb3g+XHJcblxyXG4gICAgICAgICAgPEJveCBcclxuICAgICAgICAgICAgYmc9XCJzdWNjZXNzMTAwXCIgXHJcbiAgICAgICAgICAgIHBhZGRpbmc9XCJ4bFwiIFxyXG4gICAgICAgICAgICBib3JkZXJSYWRpdXM9XCJsZ1wiIFxyXG4gICAgICAgICAgICBmbGV4PVwiMVwiIFxyXG4gICAgICAgICAgICBtaW5XaWR0aD1cIjIwMHB4XCJcclxuICAgICAgICAgICAgc3R5bGU9e3sgYm9yZGVyOiAnMnB4IHNvbGlkICM0MkM4OEEnIH19XHJcbiAgICAgICAgICA+XHJcbiAgICAgICAgICAgIDxUZXh0IGNvbG9yPVwic3VjY2Vzc1wiIGZvbnRTaXplPVwic21cIiBtYj1cInNtXCI+VE9UQUwgT1JERVJTPC9UZXh0PlxyXG4gICAgICAgICAgICA8SDIgY29sb3I9XCJzdWNjZXNzXCI+e3N0YXRzPy50b3RhbE9yZGVycyB8fCAwfTwvSDI+XHJcbiAgICAgICAgICA8L0JveD5cclxuXHJcbiAgICAgICAgICA8Qm94IFxyXG4gICAgICAgICAgICBiZz1cImluZm8xMDBcIiBcclxuICAgICAgICAgICAgcGFkZGluZz1cInhsXCIgXHJcbiAgICAgICAgICAgIGJvcmRlclJhZGl1cz1cImxnXCIgXHJcbiAgICAgICAgICAgIGZsZXg9XCIxXCIgXHJcbiAgICAgICAgICAgIG1pbldpZHRoPVwiMjAwcHhcIlxyXG4gICAgICAgICAgICBzdHlsZT17eyBib3JkZXI6ICcycHggc29saWQgIzNFQUFGNScgfX1cclxuICAgICAgICAgID5cclxuICAgICAgICAgICAgPFRleHQgY29sb3I9XCJpbmZvXCIgZm9udFNpemU9XCJzbVwiIG1iPVwic21cIj5UT1RBTCBQUk9EVUNUUzwvVGV4dD5cclxuICAgICAgICAgICAgPEgyIGNvbG9yPVwiaW5mb1wiPntzdGF0cz8udG90YWxQcm9kdWN0cyB8fCAwfTwvSDI+XHJcbiAgICAgICAgICA8L0JveD5cclxuXHJcbiAgICAgICAgICA8Qm94IFxyXG4gICAgICAgICAgICBiZz1cIndhcm5pbmcxMDBcIiBcclxuICAgICAgICAgICAgcGFkZGluZz1cInhsXCIgXHJcbiAgICAgICAgICAgIGJvcmRlclJhZGl1cz1cImxnXCIgXHJcbiAgICAgICAgICAgIGZsZXg9XCIxXCIgXHJcbiAgICAgICAgICAgIG1pbldpZHRoPVwiMjAwcHhcIlxyXG4gICAgICAgICAgICBzdHlsZT17eyBib3JkZXI6ICcycHggc29saWQgI0ZGQTUwMCcgfX1cclxuICAgICAgICAgID5cclxuICAgICAgICAgICAgPFRleHQgY29sb3I9XCJ3YXJuaW5nXCIgZm9udFNpemU9XCJzbVwiIG1iPVwic21cIj5UT1RBTCBSRVZFTlVFPC9UZXh0PlxyXG4gICAgICAgICAgICA8SDIgY29sb3I9XCJ3YXJuaW5nXCI+JHtzdGF0cz8udG90YWxSZXZlbnVlPy50b0ZpeGVkKDIpIHx8ICcwLjAwJ308L0gyPlxyXG4gICAgICAgICAgPC9Cb3g+XHJcbiAgICAgICAgPC9Cb3g+XHJcblxyXG4gICAgICAgIDxCb3ggYmc9XCJ3aGl0ZVwiIHBhZGRpbmc9XCJ4bFwiIGJvcmRlclJhZGl1cz1cImxnXCIgc3R5bGU9e3sgYm9yZGVyOiAnMXB4IHNvbGlkICNlOGU4ZTgnIH19PlxyXG4gICAgICAgICAgPEg1IG1iPVwibGdcIj5TeXN0ZW0gT3ZlcnZpZXc8L0g1PlxyXG4gICAgICAgICAgPFRhYmxlPlxyXG4gICAgICAgICAgICA8VGFibGVIZWFkPlxyXG4gICAgICAgICAgICAgIDxUYWJsZVJvdz5cclxuICAgICAgICAgICAgICAgIDxUYWJsZUNlbGw+TWV0cmljPC9UYWJsZUNlbGw+XHJcbiAgICAgICAgICAgICAgICA8VGFibGVDZWxsPkNvdW50PC9UYWJsZUNlbGw+XHJcbiAgICAgICAgICAgICAgICA8VGFibGVDZWxsPlN0YXR1czwvVGFibGVDZWxsPlxyXG4gICAgICAgICAgICAgIDwvVGFibGVSb3c+XHJcbiAgICAgICAgICAgIDwvVGFibGVIZWFkPlxyXG4gICAgICAgICAgICA8VGFibGVCb2R5PlxyXG4gICAgICAgICAgICAgIDxUYWJsZVJvdz5cclxuICAgICAgICAgICAgICAgIDxUYWJsZUNlbGw+UmVnaXN0ZXJlZCBVc2VyczwvVGFibGVDZWxsPlxyXG4gICAgICAgICAgICAgICAgPFRhYmxlQ2VsbD57c3RhdHM/LnRvdGFsVXNlcnMgfHwgMH08L1RhYmxlQ2VsbD5cclxuICAgICAgICAgICAgICAgIDxUYWJsZUNlbGw+XHJcbiAgICAgICAgICAgICAgICAgIDxCYWRnZSB2YXJpYW50PVwic3VjY2Vzc1wiPkFjdGl2ZTwvQmFkZ2U+XHJcbiAgICAgICAgICAgICAgICA8L1RhYmxlQ2VsbD5cclxuICAgICAgICAgICAgICA8L1RhYmxlUm93PlxyXG4gICAgICAgICAgICAgIDxUYWJsZVJvdz5cclxuICAgICAgICAgICAgICAgIDxUYWJsZUNlbGw+UHJvZHVjdCBDYXRlZ29yaWVzPC9UYWJsZUNlbGw+XHJcbiAgICAgICAgICAgICAgICA8VGFibGVDZWxsPntzdGF0cz8udG90YWxDYXRlZ29yaWVzIHx8IDB9PC9UYWJsZUNlbGw+XHJcbiAgICAgICAgICAgICAgICA8VGFibGVDZWxsPlxyXG4gICAgICAgICAgICAgICAgICA8QmFkZ2UgdmFyaWFudD1cImluZm9cIj5Db25maWd1cmVkPC9CYWRnZT5cclxuICAgICAgICAgICAgICAgIDwvVGFibGVDZWxsPlxyXG4gICAgICAgICAgICAgIDwvVGFibGVSb3c+XHJcbiAgICAgICAgICAgICAgPFRhYmxlUm93PlxyXG4gICAgICAgICAgICAgICAgPFRhYmxlQ2VsbD5BdmFpbGFibGUgUHJvZHVjdHM8L1RhYmxlQ2VsbD5cclxuICAgICAgICAgICAgICAgIDxUYWJsZUNlbGw+e3N0YXRzPy50b3RhbFByb2R1Y3RzIHx8IDB9PC9UYWJsZUNlbGw+XHJcbiAgICAgICAgICAgICAgICA8VGFibGVDZWxsPlxyXG4gICAgICAgICAgICAgICAgICA8QmFkZ2UgdmFyaWFudD1cInByaW1hcnlcIj5JbiBTdG9jazwvQmFkZ2U+XHJcbiAgICAgICAgICAgICAgICA8L1RhYmxlQ2VsbD5cclxuICAgICAgICAgICAgICA8L1RhYmxlUm93PlxyXG4gICAgICAgICAgICAgIDxUYWJsZVJvdz5cclxuICAgICAgICAgICAgICAgIDxUYWJsZUNlbGw+VG90YWwgT3JkZXJzPC9UYWJsZUNlbGw+XHJcbiAgICAgICAgICAgICAgICA8VGFibGVDZWxsPntzdGF0cz8udG90YWxPcmRlcnMgfHwgMH08L1RhYmxlQ2VsbD5cclxuICAgICAgICAgICAgICAgIDxUYWJsZUNlbGw+XHJcbiAgICAgICAgICAgICAgICAgIDxCYWRnZSB2YXJpYW50PVwic3VjY2Vzc1wiPlByb2Nlc3Npbmc8L0JhZGdlPlxyXG4gICAgICAgICAgICAgICAgPC9UYWJsZUNlbGw+XHJcbiAgICAgICAgICAgICAgPC9UYWJsZVJvdz5cclxuICAgICAgICAgICAgPC9UYWJsZUJvZHk+XHJcbiAgICAgICAgICA8L1RhYmxlPlxyXG4gICAgICAgIDwvQm94PlxyXG4gICAgICA8L0JveD5cclxuICAgICk7XHJcbiAgfSBlbHNlIHtcclxuICAgIC8vIFJFR1VMQVIgVVNFUiBEQVNIQk9BUkQgLSBQZXJzb25hbCBJbmZvcm1hdGlvblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgPEJveCBwYWRkaW5nPVwieHhsXCI+XHJcbiAgICAgICAgPEJveCBtYj1cInhsXCI+XHJcbiAgICAgICAgICA8SDI+TXkgRGFzaGJvYXJkPC9IMj5cclxuICAgICAgICAgIDxUZXh0IGNvbG9yPVwiZ3JleTYwXCI+V2VsY29tZSwge3VzZXIubmFtZX0hPC9UZXh0PlxyXG4gICAgICAgICAgPEJhZGdlIHZhcmlhbnQ9XCJpbmZvXCIgbXQ9XCJzbVwiPlVzZXI8L0JhZGdlPlxyXG4gICAgICAgIDwvQm94PlxyXG5cclxuICAgICAgICA8Qm94IGRpc3BsYXk9XCJmbGV4XCIgZ2FwPVwibGdcIiBtYj1cInhsXCIgZmxleFdyYXA9XCJ3cmFwXCI+XHJcbiAgICAgICAgICA8Qm94IFxyXG4gICAgICAgICAgICBiZz1cInByaW1hcnkxMDBcIiBcclxuICAgICAgICAgICAgcGFkZGluZz1cInhsXCIgXHJcbiAgICAgICAgICAgIGJvcmRlclJhZGl1cz1cImxnXCIgXHJcbiAgICAgICAgICAgIGZsZXg9XCIxXCJcclxuICAgICAgICAgICAgbWluV2lkdGg9XCIyNTBweFwiXHJcbiAgICAgICAgICAgIHN0eWxlPXt7IGJvcmRlcjogJzJweCBzb2xpZCAjNDI2OEY2JyB9fVxyXG4gICAgICAgICAgPlxyXG4gICAgICAgICAgICA8VGV4dCBjb2xvcj1cInByaW1hcnlcIiBmb250U2l6ZT1cInNtXCIgbWI9XCJzbVwiPllPVVIgRU1BSUw8L1RleHQ+XHJcbiAgICAgICAgICAgIDxUZXh0IGZvbnRTaXplPVwibGdcIiBmb250V2VpZ2h0PVwiYm9sZFwiPnt1c2VyLmVtYWlsfTwvVGV4dD5cclxuICAgICAgICAgIDwvQm94PlxyXG5cclxuICAgICAgICAgIDxCb3ggXHJcbiAgICAgICAgICAgIGJnPVwic3VjY2VzczEwMFwiIFxyXG4gICAgICAgICAgICBwYWRkaW5nPVwieGxcIiBcclxuICAgICAgICAgICAgYm9yZGVyUmFkaXVzPVwibGdcIiBcclxuICAgICAgICAgICAgZmxleD1cIjFcIlxyXG4gICAgICAgICAgICBtaW5XaWR0aD1cIjI1MHB4XCJcclxuICAgICAgICAgICAgc3R5bGU9e3sgYm9yZGVyOiAnMnB4IHNvbGlkICM0MkM4OEEnIH19XHJcbiAgICAgICAgICA+XHJcbiAgICAgICAgICAgIDxUZXh0IGNvbG9yPVwic3VjY2Vzc1wiIGZvbnRTaXplPVwic21cIiBtYj1cInNtXCI+QUNDT1VOVCBUWVBFPC9UZXh0PlxyXG4gICAgICAgICAgICA8VGV4dCBmb250U2l6ZT1cImxnXCIgZm9udFdlaWdodD1cImJvbGRcIiBzdHlsZT17eyB0ZXh0VHJhbnNmb3JtOiAnY2FwaXRhbGl6ZScgfX0+XHJcbiAgICAgICAgICAgICAge3VzZXIucm9sZX1cclxuICAgICAgICAgICAgPC9UZXh0PlxyXG4gICAgICAgICAgPC9Cb3g+XHJcbiAgICAgICAgPC9Cb3g+XHJcblxyXG4gICAgICAgIHtyZWNlbnRPcmRlcnMgJiYgcmVjZW50T3JkZXJzLmxlbmd0aCA+IDAgJiYgKFxyXG4gICAgICAgICAgPEJveCBiZz1cIndoaXRlXCIgcGFkZGluZz1cInhsXCIgYm9yZGVyUmFkaXVzPVwibGdcIiBzdHlsZT17eyBib3JkZXI6ICcxcHggc29saWQgI2U4ZThlOCcgfX0+XHJcbiAgICAgICAgICAgIDxINSBtYj1cImxnXCI+WW91ciBSZWNlbnQgT3JkZXJzPC9INT5cclxuICAgICAgICAgICAgPFRhYmxlPlxyXG4gICAgICAgICAgICAgIDxUYWJsZUhlYWQ+XHJcbiAgICAgICAgICAgICAgICA8VGFibGVSb3c+XHJcbiAgICAgICAgICAgICAgICAgIDxUYWJsZUNlbGw+T3JkZXIgSUQ8L1RhYmxlQ2VsbD5cclxuICAgICAgICAgICAgICAgICAgPFRhYmxlQ2VsbD5Ub3RhbCBBbW91bnQ8L1RhYmxlQ2VsbD5cclxuICAgICAgICAgICAgICAgICAgPFRhYmxlQ2VsbD5TdGF0dXM8L1RhYmxlQ2VsbD5cclxuICAgICAgICAgICAgICAgICAgPFRhYmxlQ2VsbD5EYXRlPC9UYWJsZUNlbGw+XHJcbiAgICAgICAgICAgICAgICA8L1RhYmxlUm93PlxyXG4gICAgICAgICAgICAgIDwvVGFibGVIZWFkPlxyXG4gICAgICAgICAgICAgIDxUYWJsZUJvZHk+XHJcbiAgICAgICAgICAgICAgICB7cmVjZW50T3JkZXJzLm1hcCgob3JkZXIpID0+IChcclxuICAgICAgICAgICAgICAgICAgPFRhYmxlUm93IGtleT17b3JkZXIuaWR9PlxyXG4gICAgICAgICAgICAgICAgICAgIDxUYWJsZUNlbGw+I3tvcmRlci5pZH08L1RhYmxlQ2VsbD5cclxuICAgICAgICAgICAgICAgICAgICA8VGFibGVDZWxsPiR7b3JkZXIudG90YWxBbW91bnQ/LnRvRml4ZWQoMil9PC9UYWJsZUNlbGw+XHJcbiAgICAgICAgICAgICAgICAgICAgPFRhYmxlQ2VsbD5cclxuICAgICAgICAgICAgICAgICAgICAgIDxCYWRnZSBcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyaWFudD17XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgb3JkZXIuc3RhdHVzID09PSAnY29tcGxldGVkJyA/ICdzdWNjZXNzJyA6IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9yZGVyLnN0YXR1cyA9PT0gJ3BlbmRpbmcnID8gJ3dhcm5pbmcnIDogXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgJ2luZm8nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICAgICAge29yZGVyLnN0YXR1c31cclxuICAgICAgICAgICAgICAgICAgICAgIDwvQmFkZ2U+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9UYWJsZUNlbGw+XHJcbiAgICAgICAgICAgICAgICAgICAgPFRhYmxlQ2VsbD5cclxuICAgICAgICAgICAgICAgICAgICAgIHtuZXcgRGF0ZShvcmRlci5jcmVhdGVkQXQpLnRvTG9jYWxlRGF0ZVN0cmluZygpfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvVGFibGVDZWxsPlxyXG4gICAgICAgICAgICAgICAgICA8L1RhYmxlUm93PlxyXG4gICAgICAgICAgICAgICAgKSl9XHJcbiAgICAgICAgICAgICAgPC9UYWJsZUJvZHk+XHJcbiAgICAgICAgICAgIDwvVGFibGU+XHJcbiAgICAgICAgICA8L0JveD5cclxuICAgICAgICApfVxyXG5cclxuICAgICAgICB7KCFyZWNlbnRPcmRlcnMgfHwgcmVjZW50T3JkZXJzLmxlbmd0aCA9PT0gMCkgJiYgKFxyXG4gICAgICAgICAgPEJveCBcclxuICAgICAgICAgICAgYmc9XCJncmV5MjBcIiBcclxuICAgICAgICAgICAgcGFkZGluZz1cInhsXCIgXHJcbiAgICAgICAgICAgIGJvcmRlclJhZGl1cz1cImxnXCIgXHJcbiAgICAgICAgICAgIHRleHRBbGlnbj1cImNlbnRlclwiXHJcbiAgICAgICAgICA+XHJcbiAgICAgICAgICAgIDxUZXh0IGNvbG9yPVwiZ3JleTYwXCI+WW91IGhhdmVuJ3QgcGxhY2VkIGFueSBvcmRlcnMgeWV0LjwvVGV4dD5cclxuICAgICAgICAgIDwvQm94PlxyXG4gICAgICAgICl9XHJcbiAgICAgIDwvQm94PlxyXG4gICAgKTtcclxuICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBEYXNoYm9hcmQ7XHJcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IEJveCwgSDIsIEg1LCBUZXh0LCBUYWJsZSwgVGFibGVIZWFkLCBUYWJsZVJvdywgVGFibGVDZWxsLCBUYWJsZUJvZHksIEJhZGdlLCBCdXR0b24gfSBmcm9tICdAYWRtaW5qcy9kZXNpZ24tc3lzdGVtJztcclxuXHJcbmNvbnN0IFNldHRpbmdzID0gKHByb3BzKSA9PiB7XHJcbiAgY29uc3QgeyBzZXR0aW5ncywgdXNlciB9ID0gcHJvcHM7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8Qm94IHBhZGRpbmc9XCJ4eGxcIj5cclxuICAgICAgPEJveCBtYj1cInhsXCI+XHJcbiAgICAgICAgPEgyPlN5c3RlbSBTZXR0aW5nczwvSDI+XHJcbiAgICAgICAgPFRleHQgY29sb3I9XCJncmV5NjBcIj5Db25maWd1cmUgeW91ciBlQ29tbWVyY2UgcGxhdGZvcm08L1RleHQ+XHJcbiAgICAgICAgPEJhZGdlIHZhcmlhbnQ9XCJwcmltYXJ5XCIgbXQ9XCJzbVwiPkFkbWluIE9ubHk8L0JhZGdlPlxyXG4gICAgICA8L0JveD5cclxuXHJcbiAgICAgIDxCb3ggYmc9XCJ3aGl0ZVwiIHBhZGRpbmc9XCJ4bFwiIGJvcmRlclJhZGl1cz1cImxnXCIgc3R5bGU9e3sgYm9yZGVyOiAnMXB4IHNvbGlkICNlOGU4ZTgnIH19IG1iPVwibGdcIj5cclxuICAgICAgICA8Qm94IGRpc3BsYXk9XCJmbGV4XCIganVzdGlmeUNvbnRlbnQ9XCJzcGFjZS1iZXR3ZWVuXCIgYWxpZ25JdGVtcz1cImNlbnRlclwiIG1iPVwibGdcIj5cclxuICAgICAgICAgIDxINT5Db25maWd1cmF0aW9uIFNldHRpbmdzPC9INT5cclxuICAgICAgICAgIDxUZXh0IGNvbG9yPVwiZ3JleTYwXCIgZm9udFNpemU9XCJzbVwiPkxhc3QgdXBkYXRlZDoge25ldyBEYXRlKCkudG9Mb2NhbGVEYXRlU3RyaW5nKCl9PC9UZXh0PlxyXG4gICAgICAgIDwvQm94PlxyXG5cclxuICAgICAgICB7c2V0dGluZ3MgJiYgc2V0dGluZ3MubGVuZ3RoID4gMCA/IChcclxuICAgICAgICAgIDxUYWJsZT5cclxuICAgICAgICAgICAgPFRhYmxlSGVhZD5cclxuICAgICAgICAgICAgICA8VGFibGVSb3c+XHJcbiAgICAgICAgICAgICAgICA8VGFibGVDZWxsIHN0eWxlPXt7IGZvbnRXZWlnaHQ6ICdib2xkJyB9fT5TZXR0aW5nIEtleTwvVGFibGVDZWxsPlxyXG4gICAgICAgICAgICAgICAgPFRhYmxlQ2VsbCBzdHlsZT17eyBmb250V2VpZ2h0OiAnYm9sZCcgfX0+VmFsdWU8L1RhYmxlQ2VsbD5cclxuICAgICAgICAgICAgICAgIDxUYWJsZUNlbGwgc3R5bGU9e3sgZm9udFdlaWdodDogJ2JvbGQnIH19PlN0YXR1czwvVGFibGVDZWxsPlxyXG4gICAgICAgICAgICAgIDwvVGFibGVSb3c+XHJcbiAgICAgICAgICAgIDwvVGFibGVIZWFkPlxyXG4gICAgICAgICAgICA8VGFibGVCb2R5PlxyXG4gICAgICAgICAgICAgIHtzZXR0aW5ncy5tYXAoKHNldHRpbmcpID0+IChcclxuICAgICAgICAgICAgICAgIDxUYWJsZVJvdyBrZXk9e3NldHRpbmcuaWR9PlxyXG4gICAgICAgICAgICAgICAgICA8VGFibGVDZWxsPlxyXG4gICAgICAgICAgICAgICAgICAgIDxUZXh0IGZvbnRXZWlnaHQ9XCJib2xkXCI+e3NldHRpbmcua2V5fTwvVGV4dD5cclxuICAgICAgICAgICAgICAgICAgPC9UYWJsZUNlbGw+XHJcbiAgICAgICAgICAgICAgICAgIDxUYWJsZUNlbGw+XHJcbiAgICAgICAgICAgICAgICAgICAgPFRleHQ+e3NldHRpbmcudmFsdWV9PC9UZXh0PlxyXG4gICAgICAgICAgICAgICAgICA8L1RhYmxlQ2VsbD5cclxuICAgICAgICAgICAgICAgICAgPFRhYmxlQ2VsbD5cclxuICAgICAgICAgICAgICAgICAgICA8QmFkZ2UgdmFyaWFudD1cInN1Y2Nlc3NcIj5BY3RpdmU8L0JhZGdlPlxyXG4gICAgICAgICAgICAgICAgICA8L1RhYmxlQ2VsbD5cclxuICAgICAgICAgICAgICAgIDwvVGFibGVSb3c+XHJcbiAgICAgICAgICAgICAgKSl9XHJcbiAgICAgICAgICAgIDwvVGFibGVCb2R5PlxyXG4gICAgICAgICAgPC9UYWJsZT5cclxuICAgICAgICApIDogKFxyXG4gICAgICAgICAgPEJveCBcclxuICAgICAgICAgICAgYmc9XCJncmV5MjBcIiBcclxuICAgICAgICAgICAgcGFkZGluZz1cInhsXCIgXHJcbiAgICAgICAgICAgIGJvcmRlclJhZGl1cz1cImxnXCIgXHJcbiAgICAgICAgICAgIHRleHRBbGlnbj1cImNlbnRlclwiXHJcbiAgICAgICAgICA+XHJcbiAgICAgICAgICAgIDxUZXh0IGNvbG9yPVwiZ3JleTYwXCI+Tm8gc2V0dGluZ3MgY29uZmlndXJlZCB5ZXQuPC9UZXh0PlxyXG4gICAgICAgICAgICA8VGV4dCBjb2xvcj1cImdyZXk2MFwiIGZvbnRTaXplPVwic21cIiBtdD1cInNtXCI+XHJcbiAgICAgICAgICAgICAgVXNlIHRoZSBTZXR0aW5ncyByZXNvdXJjZSB0byBhZGQgY29uZmlndXJhdGlvbiB2YWx1ZXMuXHJcbiAgICAgICAgICAgIDwvVGV4dD5cclxuICAgICAgICAgIDwvQm94PlxyXG4gICAgICAgICl9XHJcbiAgICAgIDwvQm94PlxyXG5cclxuICAgICAgPEJveCBiZz1cImluZm8xMDBcIiBwYWRkaW5nPVwibGdcIiBib3JkZXJSYWRpdXM9XCJsZ1wiIHN0eWxlPXt7IGJvcmRlcjogJzFweCBzb2xpZCAjM0VBQUY1JyB9fT5cclxuICAgICAgICA8SDUgY29sb3I9XCJpbmZvXCIgbWI9XCJzbVwiPvCfkqEgUXVpY2sgVGlwczwvSDU+XHJcbiAgICAgICAgPFRleHQgZm9udFNpemU9XCJzbVwiIG1iPVwieHNcIj7igKIgVXNlIHRoZSBTZXR0aW5ncyByZXNvdXJjZSBpbiB0aGUgc2lkZWJhciB0byBhZGQvZWRpdCBzZXR0aW5nczwvVGV4dD5cclxuICAgICAgICA8VGV4dCBmb250U2l6ZT1cInNtXCIgbWI9XCJ4c1wiPuKAoiBTZXR0aW5ncyBhcmUga2V5LXZhbHVlIHBhaXJzIGZvciBwbGF0Zm9ybSBjb25maWd1cmF0aW9uPC9UZXh0PlxyXG4gICAgICAgIDxUZXh0IGZvbnRTaXplPVwic21cIj7igKIgQ29tbW9uIHNldHRpbmdzOiBzaXRlX25hbWUsIGN1cnJlbmN5LCB0YXhfcmF0ZSwgc2hpcHBpbmdfZmVlLCBldGMuPC9UZXh0PlxyXG4gICAgICA8L0JveD5cclxuICAgIDwvQm94PlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTZXR0aW5ncztcclxuIiwiQWRtaW5KUy5Vc2VyQ29tcG9uZW50cyA9IHt9XG5pbXBvcnQgRGFzaGJvYXJkIGZyb20gJy4uL2NvbXBvbmVudHMvRGFzaGJvYXJkJ1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5EYXNoYm9hcmQgPSBEYXNoYm9hcmRcbmltcG9ydCBTZXR0aW5ncyBmcm9tICcuLi9jb21wb25lbnRzL1NldHRpbmdzJ1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5TZXR0aW5ncyA9IFNldHRpbmdzIl0sIm5hbWVzIjpbIkRhc2hib2FyZCIsInByb3BzIiwic3RhdHMiLCJ1c2VyIiwicmVjZW50T3JkZXJzIiwiaXNBZG1pbiIsIlJlYWN0IiwiY3JlYXRlRWxlbWVudCIsIkJveCIsInBhZGRpbmciLCJUZXh0IiwibWIiLCJIMiIsImNvbG9yIiwibmFtZSIsIkJhZGdlIiwidmFyaWFudCIsIm10IiwiZGlzcGxheSIsImZsZXhXcmFwIiwiZ2FwIiwiYmciLCJib3JkZXJSYWRpdXMiLCJmbGV4IiwibWluV2lkdGgiLCJzdHlsZSIsImJvcmRlciIsImZvbnRTaXplIiwidG90YWxVc2VycyIsInRvdGFsT3JkZXJzIiwidG90YWxQcm9kdWN0cyIsInRvdGFsUmV2ZW51ZSIsInRvRml4ZWQiLCJINSIsIlRhYmxlIiwiVGFibGVIZWFkIiwiVGFibGVSb3ciLCJUYWJsZUNlbGwiLCJUYWJsZUJvZHkiLCJ0b3RhbENhdGVnb3JpZXMiLCJmb250V2VpZ2h0IiwiZW1haWwiLCJ0ZXh0VHJhbnNmb3JtIiwicm9sZSIsImxlbmd0aCIsIm1hcCIsIm9yZGVyIiwia2V5IiwiaWQiLCJ0b3RhbEFtb3VudCIsInN0YXR1cyIsIkRhdGUiLCJjcmVhdGVkQXQiLCJ0b0xvY2FsZURhdGVTdHJpbmciLCJ0ZXh0QWxpZ24iLCJTZXR0aW5ncyIsInNldHRpbmdzIiwianVzdGlmeUNvbnRlbnQiLCJhbGlnbkl0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
