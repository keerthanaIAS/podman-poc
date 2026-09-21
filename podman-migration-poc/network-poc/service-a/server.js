const http = require('http');

const options = {
  hostname: 'service-b',
  port: 4000,
  path: '/health',
  method: 'GET'
};

const req = http.request(options, (res) => {
  let data = '';

  res.on('data', chunk => data += chunk);

  res.on('end', () => {
    console.log('Response from Service B:', data);
  });
});

req.on('error', (err) => {
  console.error('Service B communication failed:', err.message);
});

req.end();
