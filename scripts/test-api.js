const axios = require('axios');

const BASE_URL = 'http://localhost:3000';

async function testAPI() {
  console.log('🧪 Testing eCommerce Admin API...\n');
  
  try {
    // Test 1: Check if server is running
    console.log('1. Testing server connection...');
    const healthCheck = await axios.get(`${BASE_URL}/`);
    console.log('✅ Server is running:', healthCheck.data.message);
    
    // Test 2: Register admin user
    console.log('\n2. Registering admin user...');
    const adminSignup = await axios.post(`${BASE_URL}/api/auth/signup`, {
      name: 'Test Admin',
      email: 'admin@test.com',
      password: 'admin123',
      role: 'admin'
    });
    console.log('✅ Admin user created:', adminSignup.data.data.email);
    const adminToken = adminSignup.data.data.token;
    
    // Test 3: Register regular user
    console.log('\n3. Registering regular user...');
    const userSignup = await axios.post(`${BASE_URL}/api/auth/signup`, {
      name: 'Test User',
      email: 'user@test.com',
      password: 'user123',
      role: 'user'
    });
    console.log('✅ Regular user created:', userSignup.data.data.email);
    const userToken = userSignup.data.data.token;
    
    // Test 4: Test admin login
    console.log('\n4. Testing admin login...');
    const adminLogin = await axios.post(`${BASE_URL}/api/auth/login`, {
      email: 'admin@test.com',
      password: 'admin123'
    });
    console.log('✅ Admin login successful:', adminLogin.data.data.email);
    
    // Test 5: Test user login
    console.log('\n5. Testing user login...');
    const userLogin = await axios.post(`${BASE_URL}/api/auth/login`, {
      email: 'user@test.com',
      password: 'user123'
    });
    console.log('✅ User login successful:', userLogin.data.data.email);
    
    // Test 6: Test protected route (get current user)
    console.log('\n6. Testing protected route...');
    const currentUser = await axios.get(`${BASE_URL}/api/auth/me`, {
      headers: {
        'Authorization': `Bearer ${adminToken}`
      }
    });
    console.log('✅ Protected route accessible:', currentUser.data.data.email);
    
    console.log('\n🎉 All tests passed!');
    console.log('\n📋 Next Steps:');
    console.log('1. Open your browser and go to: http://localhost:3000/admin');
    console.log('2. You\'ll need to authenticate using the API first');
    console.log('3. Use the admin token in the Authorization header');
    console.log('\n🔑 Admin Token:', adminToken);
    console.log('🔑 User Token:', userToken);
    console.log('\n💡 To access AdminJS, you need to:');
    console.log('1. Make a request to http://localhost:3000/admin with Authorization header');
    console.log('2. Or use a tool like Postman with the Bearer token');
    
  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
  }
}

// Run tests if this file is executed directly
if (require.main === module) {
  testAPI();
}

module.exports = { testAPI };
