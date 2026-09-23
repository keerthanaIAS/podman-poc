const http = require('http');

const server = http.createServer((req, res) => {
  if (req.url === '/health') {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({
      status: 'UP',
      engine: process.env.CONTAINER_ENGINE || 'unknown',
      hostname: require('os').hostname()
    }));
    return;
  }

  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Docker vs Podman comparison POC\n');
});

server.listen(3000, '0.0.0.0', () => {
  console.log('Server running on port 3000');
});
