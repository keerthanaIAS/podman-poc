const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const axios = require('axios');

const app = express();
const PORT = 3000;

// KEY PODMAN CONCEPT:
// All containers in the same POD share localhost.
// That's why we can call user-service at localhost:3001
const USER_SERVICE = 'http://localhost:3001';
const PRODUCT_SERVICE = 'http://localhost:3002';

// app.use(express.json());

// Root route — shows gateway info
app.get('/', (req, res) => {
  res.json({
    message: 'API Gateway (running in Podman Pod)',
    pod: true,
    routes: {
      users: '/api/users',
      products: '/api/products',
      healthCheck: '/health/all'
    }
  });
});

// 🔥 Aggregated health check — calls BOTH services
app.get('/health/all', async (req, res) => {
  const results = { gateway: 'UP' };
  try {
    const userHealth = await axios.get(`${USER_SERVICE}/health`);
    results.userService = userHealth.data.status;
  } catch (e) {
    results.userService = 'DOWN';
  }
  try {
    const productHealth = await axios.get(`${PRODUCT_SERVICE}/health`);
    results.productService = productHealth.data.status;
  } catch (e) {
    results.productService = 'DOWN';
  }
  res.json({ pod: 'mern-microservices-pod', services: results });
});

// Reverse proxy: /api/users → user-service:3001/users
app.use('/api/users', createProxyMiddleware({
  target: USER_SERVICE,
  changeOrigin: true,
  pathRewrite: { '^/api/users': '/users' }
}));

// Reverse proxy: /api/products → product-service:3002/products
app.use('/api/products', createProxyMiddleware({
  target: PRODUCT_SERVICE,
  changeOrigin: true,
  pathRewrite: { '^/api/products': '/products' }
}));

app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
  console.log(`Proxying to user-service at ${USER_SERVICE}`);
  console.log(`Proxying to product-service at ${PRODUCT_SERVICE}`);
});